const config = {
    socketServer: "ws://127.0.0.1:10100",
    isTestNet: true,
    networkName: "kovan",
    baseUrl: "http://127.0.0.1:8080",
    managementAddress: "0x8c5dC8661a61Ba9a17082bf5F6C0faCcc61213D2",
    issuerAddress: "0x546161a8C909C0AA99A69b40a245c4F4C851d0b9",
    // baseUrl: "https://digital-identity-app.herokuapp.com",
    // identityRouterUrl: "https://identity-router.herokuapp.com", //centralized "router" for the demo that maps unique QR guid -> address. should switch back to smart contract
    // ipfsWriteUrl: "https://ipfs.infura.io:5001",
    // ipfsFetchUrl: "https://ipfs.io/ipfs",
    // ipfsIpAddress: "ipfs.infura.io",
    // ipfsPort: "5001",
    // ipfsProtocol: "https",
    ethProvider: 'https://rinkeby.arbitrum.io/rpc',
    etherscanApiKey: 'D3PZWYNWARKN73MCVWFGX1QZ6EWMJE7J45',
    personaRegistryContract: 'contracts/PersonaRegistry',
    personaRegistryAddress: '0x6d94fd7e0f422a42a23c026467b9d00d436bf4e6',
    defaultGasPrice: 20000000000,
    defaultGasValue: 250000,
    controller: "http://localhost/rpModule/scripts/controller.php",
    name: "Dummy Website",
    refreshTimer: 30
};

export {config};