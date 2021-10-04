import "../node_modules/@truffle/contract/dist/truffle-contract.min.js";
import "../node_modules/web3/dist/web3.min.js";
import {config} from "./config.js";
import {CVC} from "../contract/CVC.js";
var web3;

web3 = new Web3(new Web3.providers.HttpProvider(config.ethProvider));
// if (typeof web3 !== 'undefined') {
//     web3 = new Web3(web3.currentProvider);
// } else {

const cvc = new web3.eth.Contract(CVC.abi, CVC.address);
//const signed = web3.eth.sign("test", "0x8c5dC8661a61Ba9a17082bf5F6C0faCcc61213D2").then(console.log);
// 0x8c5dC8661a61Ba9a17082bf5F6C0faCcc61213D2
// 0x6c1d8d177a48859237c9435dc26ccdcc2507875f769480c6d3490ce028c7a18d4d5f20e330cb7a83998c83b224a7fe82522c9ed0b3860d4dc4e291cd83853caa00
// web3.eth.accounts.recover("test", "0x6c1d8d177a48859237c9435dc26ccdcc2507875f769480c6d3490ce028c7a18d4d5f20e330cb7a83998c83b224a7fe82522c9ed0b3860d4dc4e291cd83853caa00").then(console.log);
const signed = web3.eth.accounts.sign("test", "0xf25f8b60640f48510f8ff06cb1233ca35e73f4f9a3b77075a433fe9cf6f8a634");
console.log(signed);
console.log(web3.eth.accounts.recover(signed));

async function addClaim() {
  var cvc = new web3.eth.Contract(CVC.abi, CVC.address);
  cvc.methods.addClaim(config.address, 1, 2, config.address, "abc", "123", function(err, result){
    if(!err){
      console.log(result);
    }
  });
  // address holder, uint256 _topic, uint256 _scheme, address _issuer, bytes memory _data, string memory _uri
}

async function getClaim() {

}

async function get(deployedContractAbi, deployedContractAddress){
  const contractInstance = new web3.eth.Contract(deployedContractAbi, deployedContractAddress);
  const res = await contractInstance.methods.get().call();
  console.log("Obtained value at deployed contract is: "+ res);
  return res
}

async function set(accountAddress, value, deployedContractAbi, deployedContractAddress){
  const contractInstance = new web3.eth.Contract(deployedContractAbi, deployedContractAddress);
  const res = await contractInstance.methods.set(value).send({from: accountAddress, gasPrice: "0xFF", gasLimit: "0x24A22"});
  return res
}

function receiveToken(){
  // Receive claim token from user
  // Connect blockchain run getClaim()
}

function writeQR(){
  
}

async function verifier(val){
  await cvc.methods.verifier(val).call().then(
    function(value){
      console.log(hex_to_ascii(value));
      var result = hex_to_ascii(value);
      return result;
    }
  );
}

function sign(){
  var signature = web3.eth.sign(config.issuerAddress, "");
}

function hex_to_ascii(str1){
  var hex = str1. toString();
  var str = '';
  for (var n = 0; n < hex. length; n += 2) {
    str += String. fromCharCode(parseInt(hex. substr(n, 2), 16));
  }
  return str;
}

function callContractFunction(web3, contract, address, functionName, args, callback) {
  var solidityFunction = new SolidityFunction(web3.Eth, functionAbi, address);
  function proxy(retries) {
      const web3 = new Web3();
      const data = contract[functionName].getData.apply(null, args);
      var url = getProxyUrlForCall(address, data);
      networkUtility.get(url, {}, function(err, body) {
          if (!err) {
              try {
                  var result = JSON.parse(body);
                  var functionAbi = contract.abi.find(function(element, index, array) {return element.name === functionName});
                  var solidityFunction = new SolidityFunction(web3.Eth, functionAbi, address);
                  var resultUnpacked = solidityFunction.unpackOutput(result.result);
                  callback(undefined, resultUnpacked);
              } catch (errJson) {
                  if (retries > 0) {
                      setTimeout(function() {
                          proxy(retries - 1);
                      }, 1000);
                  } else {
                      callback(errJson, undefined);
                  }
              }
          } else {
              callback(err, undefined);
          }
      });
  }
  try {
      if (web3.currentProvider) {
          var data = contract[functionName].getData.apply(null, args);
          web3.eth.call({to: address, data: data}, function(callError, result) {
              if (!callError) {
                  var functionAbi = contract.abi.find(function(element, index, array) {
                      return element.name === functionName
                  });
                  var solidityFunction = new SolidityFunction(web3.Eth, functionAbi, address);
                  try {
                      var output = solidityFunction.unpackOutput(result);
                      callback(undefined, output);
                  } catch (resultError) {
                      callback(resultError, undefined);
                  }
              } else {
                  callback(callError, undefined);
              }
          });
      } else {
          proxy(1);
      }
  } catch(contractError) {
      callback(contractError, undefined);
  }
}
//address holder, uint256 _topic, uint256 _scheme, address _issuer, bytes memory _data, string memory _uri
addClaim();
console.log(getClaim());
export {verifier};
