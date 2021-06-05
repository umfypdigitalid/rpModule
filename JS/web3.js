const Web3 = require('web3');
const rpcURL = 'http://127.0.0.1:7545' // Your RCkP URL goes here
const web3 = new Web3(rpcURL)
const address = '0x8c5dC8661a61Ba9a17082bf5F6C0faCcc61213D2' // Your account address goes here
console.log(web3.eth.getBalance(address, (err, wei) => { balance = web3.utils.fromWei(wei, 'ether') }))

let instance = await test.deployed()