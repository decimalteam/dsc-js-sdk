# ТЗ: перевод website-console на dsc-js-sdk 3.0.0

Документ для агента, который интегрирует новую версию SDK в `website-console` (Nuxt 4, pnpm, Node 26).
Сейчас там `"dsc-js-sdk": "2.1.2"` и собственный `"ethers": "5.8.0"`.

Полный список изменений SDK — `CHANGELOG.md` в пакете (`node_modules/dsc-js-sdk/CHANGELOG.md`).
Ниже — только то, что затрагивает website-console, с конкретными местами в коде (пути от корня
website-console, номера строк на ветке `feature/nuxt4-migration` на 2026-11-12, могут сдвинуться).

---

## 0. Что изменилось в SDK (коротко)

1. **ethers v5 → v6.** Все числа из SDK — нативный `bigint` (не `ethers.BigNumber`): `parseEther`,
   `getBalance`, `balanceOfToken`, `allowanceToken`, `calculate*`, результаты `estimateGas = true`,
   `getFeeData()`, `multisig.getNonce()`, поля `SafeTransaction` из `getCurrent/ExpiredApproveTransactions`.
   `formatEther` по-прежнему возвращает строку.
2. **Квитанции транзакций — ethers v6 `TransactionReceipt`:** хеш в поле **`hash`**, поля
   `transactionHash` и `events` **больше нет**. `status`, `logs`, `blockNumber`, `gasUsed` (bigint) — есть.
   Методы, возвращающие `{ tx, ... }` (`createToken`, `createCollection*`, `mint*`, `createChecks*`,
   `multisig.create`, `multisig.approveHash`), кладут ту же v6-квитанцию в `tx`.
3. **`decimalEVM.provider`** — `ethers.JsonRpcProvider` v6, **`decimalEVM.account`** — `ethers.HDNodeWallet` v6.
4. **Ошибки** контрактных вызовов — исходные ошибки ethers v6 (`code: 'CALL_EXCEPTION'`,
   `shortMessage`, `reason`, `revert`, `receipt` с `receipt.hash`), без обёртки `new Error(String(err))`.
   Кода `UNPREDICTABLE_GAS_LIMIT` в v6 нет (вместо него `CALL_EXCEPTION`).
5. **Удалено** (в website-console не используется — проверить, что ничего не сломалось при сборке):
   контракт `delegation-nft` и все его методы (`delegateDRC721`, `withdrawStakeNFT`, ...), Cosmos-часть
   (`Decimal`, `Transaction`, ...), `setTokenURINFT`, `stakeTokenResetHoldDEL`,
   `getTokenStakesByMember`, `getFrozenStakesQueueToken`, `applyPenalt*ToStakeToken`,
   из `Wallet` — `getPrivateKey/getPublicKey/...String`, `setNodeDirectMode`, `availableProposalSubmit`, nonce-поля.
   `Wallet`, его адреса и производные аккаунты не изменились (сверено побайтно с 2.1.2).
6. **`connect()` больше не падает на тестнете** (раньше — "delegation-nft not found in thegraph").
7. **NFT-коллекции:** поле `allowMint` удалено из `NFTCollection` (контракт его не принимает —
   структура `creator, symbol, name, contractURI, refundable, burnable`). `refundable` для reserveless
   необязателен (по умолчанию `false`). Лишние поля в payload SDK теперь игнорирует.
8. `getNftType()` сразу после создания коллекции работает (фолбэк на контракт, пока сабграф не проиндексировал).
9. `updateTokenIdentity()` раньше вызывал несуществующий метод контракта — теперь работает.

---

## 1. Подключение пакета

Локальная сборка лежит в соседнем репозитории:

```bash
pnpm add ../dsc-js-sdk/dsc-js-sdk-3.0.0.tgz
```

(или `"dsc-js-sdk": "file:../dsc-js-sdk/dsc-js-sdk-3.0.0.tgz"` в `package.json`). Зависимости пакета —
только `ethers@^6.17` и `bech32@^2`.

## 2. Перевести собственный ethers website-console на v6

Свой `ethers` используется в двух файлах, держать в бандле две мажорные версии не нужно:

```bash
pnpm add ethers@^6.17.0
```

- `app/components/main-screens/MasterNodeScreen/index.vue:375` — `ethers.utils.getAddress(...)` → `ethers.getAddress(...)`
  (или `decimalEvm.value.getAddress(...)` из SDK).
- `app/stores/sdk.ts` — см. п. 3.
- `nuxt.config.ts:83` — комментарий про `ethers 5 → bn.js` в `optimizeDeps` устарел; `ethers` в `include`
  можно оставить. Полифилы `nodePolyfills` самому SDK больше не нужны (он использует глобальные
  `fetch/FormData/Blob`, без `buffer/crypto/stream`), но **не удалять** их без проверки остального кода
  приложения — это отдельная оптимизация.

## 3. `app/stores/sdk.ts` — патчи DecimalEVM

1. **+5% к gas limit** (строка ~32): `raw.mul(105).div(100)` → `(raw * 105n) / 100n`
   (`provider.estimateGas` в v6 возвращает `bigint`). Сам приём (переопределение метода на экземпляре
   провайдера) в v6 работает: `HDNodeWallet.estimateGas`/`populateTransaction` вызывают `provider.estimateGas`.
2. **Legacy-цена на тестнете** (строки ~45–70):
   - `ethers.BigNumber.from(transaction.value)` удалить — v6 принимает `value` как `bigint`/строку/число.
   - Важно: в ethers v6 транзакция только с `gasPrice` в EIP-1559-сети **не становится legacy** —
     `populateTransaction` превращает её в type 2 с `maxFeePerGas = maxPriorityFeePerGas = gasPrice`.
     Списывается при этом `min(maxFee, baseFee + priority) = gasPrice`, резерв `gasLimit × gasPrice` —
     т.е. экономически то же, что legacy. Если нужен именно legacy-тип (как в v5), добавить `type: 0`:
     `transaction = { ...transaction, type: 0, gasPrice: feeData.gasPrice }`.
     Так же ведёт себя и SDK: его `txOptions` на тестнете задаёт только `gasPrice` (+1 wei).
   - Обновить комментарии, ссылающиеся на поведение v5.
3. **`decimalEVM.connect()`** — комментарий про падение на тестнете устарел; fire-and-forget можно оставить.
4. Ретраи IPFS (`uploadNFTFormToIPFS`/`uploadTokenFormToIPFS`) — без изменений, сигнатуры те же (`FormData`).

## 4. Хеш транзакции: `transactionHash` → `hash` (критично)

Сейчас успешные операции определяются по `result?.transactionHash` — с v3 это поле `undefined`,
т.е. **success-модалки/тосты молча перестанут показываться**, а `parseMemo` получит `undefined`.
Заменить на `result?.hash` (для `{ tx }`-ответов — `response.tx?.hash`). Лучше завести один хелпер,
например `getTxHash(r) => r?.hash ?? r?.tx?.hash ?? r?.transactionHash ?? r?.tx?.transactionHash`,
и использовать его везде.

Места:

| Файл | Строки |
|---|---|
| `app/composables/useActionHelpers.ts` | 32–34 (ошибка: брать `error?.receipt?.hash ?? error?.hash`), 47 |
| `app/composables/useDelegationActions.ts` | 70–71, 93–94, 322 |
| `app/composables/useMasterNodeActions.ts` | 79 |
| `app/components/main-screens/MasterNodeScreen/index.vue` | 405, 417 (`error?.receipt?.transactionHash` → `error?.receipt?.hash`) |
| `app/components/main-components/CheckRedeem/index.vue` | 203–204 |
| `app/components/main-components/DelegationCoin/index.vue` | 628 |
| `app/components/main-components/DelegationHoldCoin/index.vue` | 311 |
| `app/components/main-components/MoveCoin/index.vue` | 350 |
| `app/components/main-components/UnbondCoin/index.vue` | 322 |
| `app/components/modals/delegation/DelegateModal.vue` | 222 |
| `app/components/modals/delegation/HoldModal.vue` | 257 |
| `app/components/modals/delegation/TransferModal.vue` | 261 |
| `app/components/modals/delegation/UnbondModal.vue` | 226 |
| `app/components/pages/convert/ConvertForm.vue` | 502 |
| `app/components/pages/multisig/create/MultisigCreate.vue` | 279 (`tx.transactionHash` → `tx.hash`) |
| `app/components/pages/multisig/delegation/MultisigDelegation.vue` | 883 |
| `app/components/pages/multisig/MultisigSend.vue` | 406, 531 |
| `app/components/pages/multisig/voting-cards/MultisigVotingCards.vue` | 549–550, 693–694, 802–803 |
| `app/components/pages/nfts/delegation/DelegationContent.vue` | 404 |
| `app/components/pages/nfts/nft/NftActions.vue` | 173, 304 |
| `app/components/pages/nfts/release/ReleaseCollection.vue` | 297 |
| `app/components/pages/nfts/release/ReleaseContent.vue` | 459 |
| `app/components/pages/wallet/WalletSend.vue` | 508, 810, 814 |

Проверить поиском, что не осталось: `rg "transactionHash" app`.

## 5. Числа: BigNumber → bigint

`bignumber.js` (основная арифметика в приложении) **принимает `bigint`** (`new BigNumber(10n ** 18n)` —
проверено на 9.3.1), так что `new BigNumber(decimalEvm.parseEther(x))`, `new BigNumber(gasPrice)`,
`estimateGas.toString()`, `feeData.gasPrice?.toString()` продолжают работать. Ломается только вызов
методов ethers-BigNumber на результатах SDK:

- `app/composables/useMasterNodeActions.ts:62-67` — **баг после обновления:**
  `currentAllowance.gte` у `bigint` нет, код уйдёт в ветку `Boolean(currentAllowance)` и посчитает любой
  ненулевой allowance достаточным → `addValidatorWithToken` упадёт. Заменить на
  `const hasAllowance = BigInt(currentAllowance) >= BigInt(stakeAmount)`.
- `app/stores/sdk.ts:32` — см. п. 3.1.
- `multisig.getNonce()` теперь `bigint`. Сравнения через `Number(...)` и `<`/`>` работают, но `===`
  с числом — нет. В `MultisigVotingCards.vue:385-388`, `MultisigDelegation.vue:666`, `MultisigSend.vue:307`
  нормализовать: `currentNonce.value = Number(onChainNonce)`.
- Поля `SafeTransaction` (`value`, `nonce`, `safeTxGas`, `baseGas`, `gasPrice`) из
  `getCurrentApproveTransactions`/`getExpiredApproveTransactions` — `bigint`. `JSON.stringify` на `bigint`
  бросает `TypeError` — если такие объекты где-то сериализуются (стор, логирование, ключи), конвертировать
  в строку. Текущий поиск прямой сериализации не нашёл, но проверить логирование multisig.
- Общая проверка: `rg -n "\.(toNumber|toHexString|isZero|mul|div|sub|add|eq|gt|gte|lt|lte)\(" app` —
  все оставшиеся вызовы должны относиться к `bignumber.js`/`decimal.js`/`Set`, а не к результатам SDK.

## 6. NFT-коллекции

`app/components/pages/nfts/release/ReleaseCollection.vue` (131, 206, 278) и `app/@types/api/nftDetails.ts`
(22, 195): `allowMint` в payload создания коллекции больше не нужен — SDK его игнорирует; можно убрать из
payload (поле в типах ответа API/сабграфа трогать не нужно). Ветка reserveless работает и без `refundable`.

## 7. Ошибки

`app/utils/actionError.ts` уже понимает формат v6 (`code === 'CALL_EXCEPTION'`, `reason`, `message`,
`revert`). `UNPREDICTABLE_GAS_LIMIT` можно оставить для совместимости. Проверить, что отказ в подписи/
недостаток средств по-прежнему распознаются: в v6 `code === 'INSUFFICIENT_FUNDS'`, текст — в `shortMessage`.

## 8. Проверка (definition of done)

1. `pnpm install`, `pnpm typecheck`, `pnpm lint`, `pnpm build` — без ошибок.
2. `rg "transactionHash|ethers\.utils|ethers\.BigNumber|\.gte\(" app` — нет обращений к удалённому API
   (кроме bignumber.js).
3. Ручная проверка на тестнете (у каждой операции должен появиться success-тост с хешем и ссылкой
   на эксплорер):
   - отправка DEL и токена, отправка с memo (`parseMemo`), MAX-отправка (патч +5% gas);
   - выпуск токена, buy/sell/convert;
   - делегирование DEL/токена (обычное и hold), перевод и вывод стейка;
   - NFT: создание коллекции (с резервом и reserveless), минт, перевод, сжигание,
     делегирование DRC721/DRC1155, вывод и перевод NFT-стейка;
   - чеки: выпуск и погашение;
   - multisig: создание, отправка, делегирование, голосование approveHash + исполнение, nonce в очереди;
   - мастерноды: добавление валидатора со стейком в токене (проверка allowance из п. 5).
4. Сравнить комиссии на тестнете с текущей версией (п. 3.2) — резерв и списание не должны вырасти.
