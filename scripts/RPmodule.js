import { xClaimVerifier } from "../contract/xClaimVerifier.js";
import { config } from "../nodeScript/config.js";
import "../node_modules/web3/dist/web3.min.js";

if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
    //web3 = new Web3(new Web3.providers.WebsocketProvider('wss://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161'))
} else {
    //web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:9545")); //original
    web3 = new Web3(new Web3.providers.HttpProvider(config.ethProvider));
}

// var web3 = new Web3(new Web3.providers.WebsocketProvider(config.ethProvider));
// Verify claim by type 2

async function verifyClaim(identity, claimType) {
    if (!isAddress(identity)){
        throw "Claim Holder contract address invalid!";
    }
    if (claimType != 1 && claimType != 2) {
        throw "Invalid claim type";
    }
    var claimVerifier = new web3.eth.Contract(xClaimVerifier.abi, xClaimVerifier.address);

    var validity = await claimVerifier.methods.checkClaim(identity, claimType).call(function (err, result) {
        if (!err) {
            console.log(result);
        } else {
            console.error(err);
        }
    });
    return validity;
}

//Verify claim by type 1
async function verifyClaimByData(identity, claimType, data) {
    if (!isAddress(identity)){
        throw identity+" is invalid claim holder contract address";
    }
    var claimVerifier = new web3.eth.Contract(xClaimVerifier.abi, xClaimVerifier.address);
    var validity = await claimVerifier.methods.verifyClaimData(identity, claimType, convertData(data)).call(function (err, result) {
        if (!err) {
            console.log(result);
        } else {
            console.error(err);
        }
    });
    return validity;
}

console.log("Address: "+convertData("No 1522 BDC Lorong E1 Taman Satria Jaya Jalan Stutong Stampin 93350 Kuching Sarawak"));
//Convert a data (stringify) into hex
function convertData(data) {
    if (typeof data !== String) {
        data = String(data);
    } 
    return web3.utils.asciiToHex(data);
}

function isAddress(addr) {
    return web3.utils.isAddress(addr);
}


export { verifyClaim, verifyClaimByData};
