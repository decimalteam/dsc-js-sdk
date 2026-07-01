# NFT Delegation — новый путь (`delegation-nft`)

Справочник по методам SDK `dsc-js-sdk` для стейкинга NFT через **новый** контракт `delegation-nft`.
Документ предназначен для интеграции в приложение-потребитель SDK.

> Все методы вызываются на экземпляре `decimalEVM` (класс `DecimalEVM`), после `await decimalEVM.connect()`.
> Обёртки multisig — на `decimalEVM.multisig.*`.

---

## 1. Контекст: старый и новый путь

Делегация NFT в SDK раздвоена на **два разных контракта** — это важно понимать при интеграции:

| | Старый путь | **Новый путь (этот документ)** |
|---|---|---|
| Контракт | `delegation` | `delegation-nft` |
| Делегирование | `delegateNFT`, `delegateNFT1155` | `delegateDRC721`, `delegateDRC1155` |
| Вывод/трансфер | `withdrawNFT`, `transferNFTStake` | `withdrawStakeNFT`, `transferStakeNFT`, … |

**Для новых интеграций используйте новый путь.** Методы нового пути названы через `...StakeNFT` / `stakeNFT...` / `...DRC721/1155` (не `withdrawDRC`).

### Адреса контракта `delegation-nft`

| Сеть | Адрес (proxy) |
|---|---|
| MAINNET | `0xe45adfcc739a0d10ce9462b58866c9a1a06035e2` |
| TESTNET | `0x07e2ad4dfc91412de09e33e4650254948b21a20c` |

Получить программно: `await decimalEVM.getDecimalContractAddress('delegation-nft')`.

---

## 2. Двухшаговый flow вывода и трансфера ⚠️

**Ключевое отличие от старого пути:** `withdrawStakeNFT` и `transferStakeNFT` **не мгновенные**. Они создают «замороженный» стейк (frozen stake) с freeze-периодом. По его истечении нужно вызвать `completeStakeNFT([indexes])` для финализации.

```
withdrawStakeNFT() / transferStakeNFT()
        │  создаёт frozen stake (WithdrawRequest / TransferRequest)
        ▼
   freeze-период  ── длительность: getFreezeTimeNFT()
        │
        ▼
completeStakeNFT([index])  ── финализация после разморозки
```

Найти готовые к финализации замороженные стейки: `getFrozenStakesQueueNFT()` → отфильтровать по `delegator` и `unfreezeTimestamp <= block.timestamp` → взять индексы → `completeStakeNFT(indexes)`. Пример в разделе 7.

---

## 3. Общие соглашения

- **Типы аргументов:** `tokenId`, `amount` — `string | number | bigint`. Таймстампы (`holdTimestamp`, `newHoldTimestamp`) — `number` (unix seconds). Адреса — `string`.
- **`estimateGas?: boolean`** (последний аргумент большинства write-методов): если `true` — метод возвращает оценку газа (`BigNumber`), а не выполняет транзакцию.
- **Транзакция:** write-методы (кроме `completeStakeNFT`) возвращают `TransactionReceipt` (результат `tx.wait()`).
- **Только для DRC721/DRC1155:** методы внутри проверяют тип NFT и бросают `Error('Only for DRC721 and DRC1155')` для чужих коллекций.

---

## 4. Делегирование (delegate)

Перед делегированием нужно дать разрешение контракту `delegation-nft` — либо `approve`/`setApprovalForAll`, либо permit-подпись (см. раздел 6).

```ts
delegateDRC721(validator: string, nftAddress: string, tokenId: string|number|bigint, sign?: ethers.Signature, estimateGas?: boolean)
delegateDRC1155(validator: string, nftAddress: string, tokenId: string|number|bigint, amount: string|number|bigint, sign?: ethers.Signature, estimateGas?: boolean)

// с hold (стейк с заморозкой до holdTimestamp)
delegateDRC721Hold(validator: string, nftAddress: string, tokenId: string|number|bigint, holdTimestamp: number, sign?: ethers.Signature, estimateGas?: boolean)
delegateDRC1155Hold(validator: string, nftAddress: string, tokenId: string|number|bigint, amount: string|number|bigint, holdTimestamp: number, sign?: ethers.Signature, estimateGas?: boolean)
```

- `validator` — адрес валидатора, которому делегируется NFT.
- `sign` — опциональная permit-подпись; если передана, используется `...ByPermit`-вариант (без предварительного on-chain `approve`).

---

## 5. Операции со стейком

### 5.1. Вывод (withdraw / unbond)

```ts
withdrawStakeNFT(validator: string, nftAddress: string, tokenId: string|number|bigint, amount: string|number|bigint, estimateGas?: boolean)
withdrawStakeNFTHold(validator: string, nftAddress: string, tokenId: string|number|bigint, amount: string|number|bigint, holdTimestamp: number, estimateGas?: boolean)
withdrawNFTWithReset(validator: string, nftAddress: string, tokenId: string|number|bigint, amount: string|number|bigint, holdTimestampsToReset: number[], estimateGas?: boolean)
```

- `withdrawStakeNFT` — запрос вывода из обычного стейка. Создаёт frozen stake → затем `completeStakeNFT`.
- `withdrawStakeNFTHold` — вывод из hold-стейка с конкретным `holdTimestamp`.
- `withdrawNFTWithReset` — вывод + сброс перечисленных hold'ов (`holdTimestampsToReset`) одной транзакцией.

### 5.2. Трансфер / перестейк (передача стейка другому валидатору)

```ts
transferStakeNFT(validator: string, nftAddress: string, tokenId: string|number|bigint, amount: string|number|bigint, newValidator: string, estimateGas?: boolean)
transferStakeNFTHold(validator: string, nftAddress: string, tokenId: string|number|bigint, amount: string|number|bigint, holdTimestamp: number, newValidator: string, estimateGas?: boolean)
transferNFTWithReset(oldValidator: string, nftAddress: string, tokenId: string|number|bigint, amount: string|number|bigint, newValidator: string, holdTimestampsToReset: number[], estimateGas?: boolean)
```

- Переносит стейк с `validator`/`oldValidator` на `newValidator`. Тоже проходит через freeze-период → `completeStakeNFT`.

### 5.3. Заморозка (hold) и сброс hold

```ts
stakeNFTToHold(validator: string, nftAddress: string, tokenId: string|number|bigint, amount: string|number|bigint, oldHoldTimestamp: number, newHoldTimestamp: number, estimateGas?: boolean)
holdNFTWithReset(validator: string, nftAddress: string, tokenId: string|number|bigint, amountToHold: string|number|bigint, newHoldTimestamp: number, holdTimestampsToReset: number[], estimateGas?: boolean)
stakeNFTResetHold(validator: string, delegator: string, nftAddress: string, tokenId: string|number|bigint, holdTimestamp: number, estimateGas?: boolean)
stakeNFTResetHolds(validator: string, delegator: string, nftAddress: string, tokenId: string|number|bigint, holdTimestamps: number[], estimateGas?: boolean)
```

- `stakeNFTToHold` — перевод части/всего стейка в hold до `newHoldTimestamp` (`oldHoldTimestamp = 0` для обычного стейка).
- `holdNFTWithReset` — hold + сброс старых hold'ов.
- `stakeNFTResetHold` / `stakeNFTResetHolds` — сброс одного / нескольких hold'ов (по `holdTimestamp(s)`).

### 5.4. Финализация

```ts
completeStakeNFT(indexes: string[]|number[], estimateGas?: boolean)
```

⚠️ **Отличается по возвращаемому значению.** Возвращает объект:

```ts
{ tx: TransactionReceipt | null, error: string | null }
```

- `error == null` → успех, `tx` содержит receipt.
- `error != null` → строка с именем revert-причины (транзакция не прошла, исключение НЕ бросается).
- `indexes` — индексы замороженных стейков из очереди `getFrozenStakesQueueNFT()`.

---

## 6. Permit-подписи (для делегирования без on-chain approve)

```ts
getSignPermitDRC721(address: string, spender: string, tokenId: string|number|bigint): Promise<ethers.Signature>
getSignPermitDRC1155(address: string, spender: string): Promise<ethers.Signature>
```

- `address` — адрес NFT-коллекции; `spender` — адрес `delegation-nft`.
- Результат передаётся в `delegateDRC721/1155(..., sign)`.

---

## 7. Геттеры (view, чтение)

```ts
getStakeNFT(validator: string, delegator: string, nftAddress: string, tokenId: string|number|bigint)          // данные стейка
getStakeIdNFT(validator: string, delegator: string, nftAddress: string, tokenId: string|number|bigint)         // bytes32 id стейка
getHoldStakeNFT(validator: string, delegator: string, nftAddress: string, tokenId: string|number|bigint, holdTimestamp: number)  // hold-стейк
getFrozenStakeNFT(index: string|number|bigint)                 // один замороженный стейк по индексу
getFrozenStakesNFT(indexes: string[]|number[])                 // список замороженных стейков
getFrozenStakesQueueNFT()                                      // вся очередь заморозки
getFreezeTimeNFT()                                             // { Withdraw: bigint, Transfer: bigint } — длительность freeze-периодов
getNFTStakesByMember(account: string)                          // все стейки делегатора
getNFTStakesPageByMember(account: string, size: string|number|bigint, offset: string|number|bigint)  // постранично
```

Элемент из `getNFTStakesByMember` содержит поля: `validator`, `token` (адрес NFT), `tokenId`, `amount`, `tokenType` (`DRC721`/`DRC1155`, см. `decimalEVM.getTokenTypes()`).

---

## 8. Multisig (Safe) — построение транзакций

Каждый билдер возвращает `SafeTransaction` для дальнейшего подписания/исполнения через Safe. Все бьют в контракт `delegation-nft`. Опциональный последний аргумент `nonce?: BigNumberish` (если не передан — берётся из Safe on-chain).

```ts
// делегирование
decimalEVM.multisig.buildTxDelegateDRC721(safeAddress, validator, nftAddress, tokenId, nonce?)
decimalEVM.multisig.buildTxDelegateDRC1155(safeAddress, validator, nftAddress, tokenId, amount, nonce?)

// трансфер / вывод (базовые — уже существовали)
decimalEVM.multisig.buildTxTransferStakeNFT(safeAddress, validator, nftAddress, tokenId, amount, newValidator, nonce?)
decimalEVM.multisig.buildTxWithdrawStakeNFT(safeAddress, validator, nftAddress, tokenId, amount, nonce?)

// hold / reset / withReset / complete
decimalEVM.multisig.buildTxTransferStakeNFTHold(safeAddress, validator, nftAddress, tokenId, amount, holdTimestamp, newValidator, nonce?)
decimalEVM.multisig.buildTxWithdrawStakeNFTHold(safeAddress, validator, nftAddress, tokenId, amount, holdTimestamp, nonce?)
decimalEVM.multisig.buildTxStakeNFTToHold(safeAddress, validator, nftAddress, tokenId, amount, oldHoldTimestamp, newHoldTimestamp, nonce?)
decimalEVM.multisig.buildTxWithdrawNFTWithReset(safeAddress, validator, nftAddress, tokenId, amount, holdTimestampsToReset, nonce?)
decimalEVM.multisig.buildTxTransferNFTWithReset(safeAddress, oldValidator, nftAddress, tokenId, amount, newValidator, holdTimestampsToReset, nonce?)
decimalEVM.multisig.buildTxHoldNFTWithReset(safeAddress, validator, nftAddress, tokenId, amountToHold, newHoldTimestamp, holdTimestampsToReset, nonce?)
decimalEVM.multisig.buildTxStakeNFTResetHold(safeAddress, validator, delegator, nftAddress, tokenId, holdTimestamp, nonce?)
decimalEVM.multisig.buildTxStakeNFTResetHolds(safeAddress, validator, delegator, nftAddress, tokenId, holdTimestamps, nonce?)
decimalEVM.multisig.buildTxCompleteStakeNFT(safeAddress, indexes, nonce?)
```

---

## 9. Примеры

### Делегирование (с approve)

```ts
const delegationNftAddress = await decimalEVM.getDecimalContractAddress('delegation-nft')

// DRC721
await decimalEVM.approveNFT721(nftAddress, delegationNftAddress, tokenId)
await decimalEVM.delegateDRC721(validator, nftAddress, tokenId)

// DRC1155
await decimalEVM.approveForAllNFT(nftAddress, delegationNftAddress, true)
await decimalEVM.delegateDRC1155(validator, nftAddress, tokenId, amount)
```

### Вывод и финализация (полный двухшаговый flow)

```ts
// 1) запрос вывода
const owner = decimalWallet.evmAddress!
const stakes = await decimalEVM.getNFTStakesByMember(owner)
const s = stakes[0]
await decimalEVM.withdrawStakeNFT(s.validator, s.token, s.tokenId, s.amount)

// 2) позже, после freeze-периода — найти готовые к финализации и завершить
const queue = await decimalEVM.getFrozenStakesQueueNFT()
const block = await decimalEVM.getLatestBlock()
const ready = queue
  .map((f: any, index: number) => ({
    index,
    delegator: f[0][1],
    unfreezeTimestamp: f[2],
  }))
  .filter((f: any) => f.delegator == decimalEVM.getAddress(owner) && f.unfreezeTimestamp <= block.timestamp)

if (ready.length > 0) {
  const res = await decimalEVM.completeStakeNFT([ready[0].index])
  if (res.error == null) {
    // успех
  } else {
    console.log('revert:', res.error)
  }
}
```

### Перестейк на другого валидатора

```ts
await decimalEVM.transferStakeNFT(s.validator, s.token, s.tokenId, s.amount, newValidator)
// затем аналогично — completeStakeNFT после freeze-периода
```

---

## 10. Важные замечания

1. **Двухшаговость.** UI должен показывать статус «замороженные» стейки и давать кнопку «завершить» (`completeStakeNFT`) после разморозки. Длительность — `getFreezeTimeNFT()`.
2. **`completeStakeNFT` не бросает исключение** при revert — проверяйте поле `error`.
3. **Approve/permit обязателен** перед первым делегированием NFT в `delegation-nft`.
4. **Субграф (индексация):** на момент написания субграф `contract-center` индексирует NFT-стейки только со старого контракта `delegation`. Стейки нового пути (`delegation-nft`) могут не отображаться в данных субграфа до его обновления — при необходимости читайте состояние напрямую через геттеры раздела 7, а не через субграф.
5. Список токен-типов: `decimalEVM.getTokenTypes()` → `{ DRC721, DRC1155, ... }`.
