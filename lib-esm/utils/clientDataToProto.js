import { getAmountToUNI, getCommissionToUNI } from "./math";
import { pubKeyValidatorTypeUrl } from "./encoderDecoder";
const encoder = new TextEncoder();
import txTypesNew from "../txTypesNew";
export function sendCoinData(data, wallet) {
    return {
        sender: wallet.address,
        recipient: data.to,
        coin: {
            amount: getAmountToUNI(data.amount),
            denom: data.coin.toLowerCase(),
        },
    };
}
export function updateCoinData(data, wallet) {
    return {
        sender: wallet.address,
        denom: data.ticker,
        limitVolume: getAmountToUNI(data.maxSupply),
        identity: data.identity,
    };
}
export function createCoinData(data, wallet) {
    return {
        sender: wallet.address,
        title: data.title,
        denom: data.ticker.toLowerCase(),
        crr: Number(data.crr),
        initialVolume: getAmountToUNI(data.initSupply),
        initialReserve: getAmountToUNI(data.reserve),
        limitVolume: getAmountToUNI(data.maxSupply),
        identity: data.identity,
    };
}
export function multiSendCoinData(data, wallet) {
    const obj = {
        sender: wallet.address,
        sends: [],
    };
    data.forEach((item) => {
        obj.sends.push({
            recipient: item.to,
            coin: {
                amount: getAmountToUNI(item.amount),
                denom: item.coin.toLowerCase(),
            },
        });
    });
    return obj;
}
export function createWalletData(data, wallet) {
    return {
        sender: wallet.address,
        owners: data.owners,
        weights: data.weights.map((el) => Number(el)),
        threshold: Number(data.threshold),
    };
}
export function mintNftData(data, wallet) {
    return {
        sender: wallet.address,
        denom: data.denom,
        tokenId: data.id,
        recipient: data.recipient ? data.recipient : wallet.address,
        quantity: Number(data.quantity),
        reserve: {
            denom: data.reserve.denom,
            amount: getAmountToUNI(data.reserve.amount),
        },
        tokenUri: data.token_uri,
        allowMint: data.allow_mint,
    };
}
export function transferNftData(data, wallet) {
    return {
        tokenId: data.id,
        sender: wallet.address,
        recipient: data.recipient,
        subTokenIds: data.sub_token_ids.map((el) => Number(el)),
    };
}
export function burnNftData(data, wallet) {
    return {
        sender: wallet.address,
        tokenId: data.id,
        subTokenIds: data.sub_token_ids.map((el) => Number(el)),
    };
}
export function buyCoinData(data, wallet) {
    const maxSpendLimit = data.maxSpendLimit
        ? getAmountToUNI(data.maxSpendLimit)
        : getAmountToUNI("100000000000");
    return {
        sender: wallet.address,
        coinToBuy: {
            amount: getAmountToUNI(data.amount),
            denom: data.buyCoin.toLowerCase(),
        },
        maxCoinToSell: {
            amount: maxSpendLimit,
            denom: data.spendCoin.toLowerCase(),
        },
    };
}
export function sellCoinData(data, wallet) {
    const minBuyLimit = data.minBuyLimit ? getAmountToUNI(data.minBuyLimit) : "1";
    return {
        sender: wallet.address,
        coinToSell: {
            amount: getAmountToUNI(data.amount),
            denom: data.sellCoin.toLowerCase(),
        },
        minCoinToBuy: {
            amount: minBuyLimit,
            denom: data.getCoin.toLowerCase(),
        },
    };
}
export function sellAllCoinData(data, wallet) {
    const minBuyLimit = data.minBuyLimit ? getAmountToUNI(data.minBuyLimit) : "1";
    return {
        sender: wallet.address,
        coinDenomToSell: data.sellCoin.toLowerCase(),
        minCoinToBuy: {
            amount: minBuyLimit,
            denom: data.getCoin.toLowerCase(),
        },
    };
}
export function burnCoinData(data, wallet) {
    return {
        sender: wallet.address,
        coin: {
            amount: getAmountToUNI(data.amount),
            denom: data.coin.toLowerCase(),
        },
    };
}
export function multisigSignTxData(data, wallet) {
    return {
        sender: wallet.address,
        id: data.txId,
    };
}
export function nftUpdateReserveData(data, wallet) {
    return {
        sender: wallet.address,
        tokenId: data.id,
        subTokenIds: data.sub_token_ids.map((el) => Number(el)),
        reserve: {
            denom: data.denom,
            amount: getAmountToUNI(data.reserve),
        },
    };
}
export function nftEditMetadata(data, wallet) {
    return {
        sender: wallet.address,
        tokenId: data.id,
        tokenUri: data.token_uri,
    };
}
export function swapInitData(data, wallet) {
    return {
        sender: wallet.address,
        recipient: data.recipient,
        amount: getAmountToUNI(data.amount),
        tokenSymbol: data.tokenSymbol,
        transactionNumber: Date.now().toString(),
        fromChain: 1,
        destChain: Number(data.destChain),
    };
}
export function swapRedeemData(data, wallet) {
    return {
        sender: wallet.address,
        from: data.from,
        recipient: data.recipient,
        amount: data.amount,
        tokenSymbol: data.tokenSymbol,
        transactionNumber: data.transactionNumber,
        fromChain: Number(data.fromChain),
        destChain: 1,
        v: parseInt(data.v, 16),
        r: data.r.slice(2),
        s: data.s.slice(2),
    };
}
export function delegateData(data, wallet) {
    return {
        delegator: wallet.address,
        validator: data.validatorAddress,
        coin: {
            denom: data.coin.toLowerCase(),
            amount: getAmountToUNI(data.stake),
        },
    };
}
export function unbondData(data, wallet) {
    return {
        delegator: wallet.address,
        validator: data.validatorAddress,
        coin: {
            denom: data.coin.toLowerCase(),
            amount: getAmountToUNI(data.stake),
        },
    };
}
export function cancelUnbondingData(data, wallet) {
    return {
        delegator: wallet.address,
        validator: data.validatorAddress,
        creationHeight: Number(data.creationHeight),
        coin: {
            denom: data.coin.toLowerCase(),
            amount: getAmountToUNI(data.stake),
        },
    };
}
export function redelegateData(data, wallet) {
    return {
        delegator: wallet.address,
        validatorSrc: data.validatorFrom,
        validatorDst: data.validatorTo,
        coin: {
            denom: data.coin.toLowerCase(),
            amount: getAmountToUNI(data.stake),
        },
    };
}
export function cancelRedelegationData(data, wallet) {
    return {
        delegator: wallet.address,
        validatorSrc: data.validatorFrom,
        validatorDst: data.validatorTo,
        creationHeight: Number(data.creationHeight),
        coin: {
            denom: data.coin.toLowerCase(),
            amount: getAmountToUNI(data.stake),
        },
    };
}
export function nftDelegateData(data, wallet) {
    return {
        delegator: wallet.address,
        validator: data.validatorAddress,
        tokenId: data.nftId,
        subTokenIds: data.subTokenIds.map((el) => Number(el)),
    };
}
export function nftUnbondData(data, wallet) {
    return {
        delegator: wallet.address,
        validator: data.validatorAddress,
        tokenId: data.nftId,
        subTokenIds: data.subTokenIds.map((el) => Number(el)),
    };
}
export function cancelNftUnbondingData(data, wallet) {
    return {
        delegator: wallet.address,
        validator: data.validatorAddress,
        tokenId: data.nftId,
        creationHeight: Number(data.creationHeight),
        subTokenIds: data.subTokenIds.map((el) => Number(el)),
    };
}
export function nftRedelegateData(data, wallet) {
    return {
        delegator: wallet.address,
        validatorSrc: data.validatorFrom,
        validatorDst: data.validatorTo,
        tokenId: data.nftId,
        subTokenIds: data.subTokenIds.map((el) => Number(el)),
    };
}
export function nftCancelRedelegationData(data, wallet) {
    return {
        delegator: wallet.address,
        validatorSrc: data.validatorFrom,
        validatorDst: data.validatorTo,
        tokenId: data.nftId,
        creationHeight: Number(data.creationHeight),
        subTokenIds: data.subTokenIds.map((el) => Number(el)),
    };
}
export function createValidatorData(data, wallet) {
    return {
        commission: getCommissionToUNI(data.commission),
        operatorAddress: wallet.validatorAddress,
        rewardAddress: data.rewardAddress,
        consensusPubkey: {
            typeUrl: pubKeyValidatorTypeUrl,
            value: Uint8Array.from(Buffer.from(data.pubKey, "base64")),
        },
        stake: {
            denom: data.coin.toLowerCase(),
            amount: getAmountToUNI(data.stake),
        },
        description: {
            moniker: data.description.moniker,
            identity: data.description.identity,
            website: data.description.website,
            securityContact: data.description.securityContact,
            details: data.description.details,
        },
    };
}
export function editValidatorData(data, wallet) {
    return {
        operatorAddress: wallet.validatorAddress,
        rewardAddress: data.rewardAddress,
        description: {
            moniker: data.description.moniker,
            identity: data.description.identity,
            website: data.description.website,
            securityContact: data.description.securityContact,
            details: data.description.details,
        },
    };
}
export function setOnlineData(data) {
    return {
        validator: data.validator,
    };
}
export function setOfflineData(data) {
    return {
        validator: data.validator,
    };
}
export function returnLegacyData(data, wallet) {
    return {
        sender: wallet.address,
        publicKey: Uint8Array.from(Buffer.from(data.pubKey, "base64")),
    };
}
export const dataToProto = {
    [txTypesNew.COIN_SEND]: sendCoinData,
    [txTypesNew.COIN_UPDATE]: updateCoinData,
    [txTypesNew.COIN_CREATE]: createCoinData,
    [txTypesNew.COIN_MULTISEND]: multiSendCoinData,
    [txTypesNew.MULTISIG_CREATE_WALLET]: createWalletData,
    [txTypesNew.NFT_MINT]: mintNftData,
    [txTypesNew.NFT_TRANSFER]: transferNftData,
    [txTypesNew.NFT_BURN]: burnNftData,
    [txTypesNew.COIN_BUY]: buyCoinData,
    [txTypesNew.COIN_SELL]: sellCoinData,
    [txTypesNew.COIN_SELL_ALL]: sellAllCoinData,
    [txTypesNew.COIN_BURN]: burnCoinData,
    [txTypesNew.MULTISIG_CREATE_TX]: multisigSignTxData,
    [txTypesNew.NFT_UPDATE_RESERVE]: nftUpdateReserveData,
    [txTypesNew.NFT_EDIT_METADATA]: nftEditMetadata,
    [txTypesNew.SWAP_INIT]: swapInitData,
    [txTypesNew.SWAP_REDEEM]: swapRedeemData,
    [txTypesNew.NFT_DELEGATE]: delegateData,
    [txTypesNew.NFT_UNBOND]: unbondData,
    [txTypesNew.VALIDATOR_CANCEL_UNDELEGATE]: cancelUnbondingData,
    [txTypesNew.VALIDATOR_REDELEGATE]: redelegateData,
    [txTypesNew.VALIDATOR_CANCEL_REDELEGATE]: cancelRedelegationData,
    [txTypesNew.NFT_DELEGATE]: nftDelegateData,
    [txTypesNew.NFT_UNBOND]: nftUnbondData,
    [txTypesNew.NFT_CANCEL_UNDELEGATE]: cancelNftUnbondingData,
    [txTypesNew.NFT_REDELEGATE]: nftRedelegateData,
    [txTypesNew.NFT_CANCEL_REDELEGATE]: nftCancelRedelegationData,
    [txTypesNew.VALIDATOR_CANDIDATE]: createValidatorData,
    [txTypesNew.VALIDATOR_CANDIDATE_EDIT]: editValidatorData,
    [txTypesNew.VALIDATOR_SET_ONLINE]: setOnlineData,
    [txTypesNew.VALIDATOR_SET_OFFLINE]: setOfflineData,
};
//# sourceMappingURL=clientDataToProto.js.map