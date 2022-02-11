const config = {
    isTestNet: true,
    baseUrl: "http://127.0.0.1:8080",
    ethProvider: 'https://rinkeby.arbitrum.io/rpc',
    etherscanApiKey: 'D3PZWYNWARKN73MCVWFGX1QZ6EWMJE7J45',
    xClaimVerifierContract: 'blockchain/contracts/xClaimVerifier',
    xClaimVerifierAddress: '0xE97f1b359Fcd64A0c7B5b9006C08E0056a5384dF',
    defaultGasPrice: 20000000000,
    defaultGasValue: 250000,
    controller: "http://localhost/rpModule/scripts/controller.php",
    requestHandler: "http://localhost/rpModule/scripts/request.php",
    name: "Dummy Website",
    refreshTimer: 30,
    maximumLoop: 3
};

export {config};