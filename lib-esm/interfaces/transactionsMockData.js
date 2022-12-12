export const sendCoin = {
    to: "dx1fatzsagt96pfglxlq245th252mv3neckvkmf68",
    coin: "del",
    amount: "10000",
};
export const updateCoin = {
    maxSupply: "2000000000",
    identity: "",
    ticker: "televizor",
};
export const createCoin = {
    crr: "45",
    identity: "e16110ab10b1ee33caffe726411eb796",
    initSupply: "2000",
    maxSupply: "100000",
    reserve: "1000",
    ticker: "loltestaaa",
    title: "testingasdd",
};
export const multiSendCoin = [
    {
        to: "dx1fatzsagt96pfglxlq245th252mv3neckvkmf68",
        coin: "DEL",
        amount: "1",
    },
    {
        to: "dx15cv03c4e2dvnc8cg72eaec4fv08pxzgkmr255d",
        coin: "DEL",
        amount: "1",
    },
];
export const createWallet = {
    owners: [
        "dx1xwdggeug0yyeqesa7nflh7skj3dr3yuwf7ljf2",
        "dx15cv03c4e2dvnc8cg72eaec4fv08pxzgkmr255d",
    ],
    weights: ["1", "2"],
    threshold: "2",
};
export const nftMint = {
    id: "e0eedcc5e9dd0247c700a4812a7fe5370267b6e6",
    denom: "test",
    quantity: "1",
    reserve: {
        amount: "1",
        denom: "del",
    },
    token_uri: "https://devnet-nft.decimalchain.com/api/nfts/ZOmGepIA6YWSkrTFaXXb5klr38Mv40Kv",
    allow_mint: true,
};
export const nftTransfer = {
    id: "724e19a3c3b179aeb90ec58313f5548dd36a6b3b",
    recipient: "dx16zqw4kx7eerpgytgaz6ap6x8a2lu9v2c20u0h8",
    sub_token_ids: ["2"],
};
export const nftBurn = {
    denom: "another",
    id: "937cba6a053c58d5d0f34e18df337a432e85f400",
    sub_token_ids: ["3", "4"],
};
// export const multisigCreateTx: clientMultisigCreateTx = {
//   from: "dx1k0qe403twyeeeaqxxpvu9u39mxytyef5hx93vg",
//   to: "dx1fatzsagt96pfglxlq245th252mv3neckvkmf68",
//   coin: "DEL",
//   amount: "1",
// };
export const buyCoins = {
    buyCoin: "INITIALD",
    amount: "1",
    spendCoin: "DEL",
};
export const sellCoins = {
    sellCoin: "DEL",
    amount: "1",
    getCoin: "INITIALD",
};
export const sellAllCoins = {
    sellCoin: "DEL",
    getCoin: "INITIALD",
};
export const checkIssue = {
    amount: "150",
    coin: "DEL",
    dueBlock: "99999999",
    nonce: "1",
    password: "admin",
};
export const checkRedeem = {
    check: "gyb5J3YXBhUP3EQyTLSMTB1Ce6f9znkXrZbd4NnHoDKrDRq959yn5ELKaudA5pYfygSi9GZwb3fuqYdTZh7WRs9zrPL9esjdZPYnydH9S71cnRvb6gnx9tzKFtqa2Mw9foB2g2LR6XrxjybVFXe6XxTYerUZrgK4BHTkHFkJySYreAtoLpgjkJZLbadqU6DdzAYafLmwR9fkLPUdBCknrjV9M6JdrdGPgFAYTk2QvK7jpYuB2NMPpXmaBs",
    password: "admin",
};
export const txOptions = {
    feeCoin: "TTTC",
    message: "sdas",
    txBroadcastMode: "sync",
    accountInfoMode: "blockchain-with-mempool",
    sendTxDirectly: true,
};
//# sourceMappingURL=transactionsMockData.js.map