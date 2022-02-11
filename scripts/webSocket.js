import {config} from "../nodeScript/config.js";
import {verifyClaim, verifyClaimByData} from "./RPmodule.js";
import {getRetries, getSessionID, getSelection, getType, getFlag} from "./qr.js";
import { resource } from "./resource.js";

if(typeof(EventSource) !== "undefined") {
  var serv = new EventSource(config.controller);

  serv.onopen = function(e) {
    // 
  };
  serv.onmessage = function(e) {
    var jdata = JSON.parse(e.data);
    const session_id = jdata.uid;
    const retries = jdata.retries;
    const contract_addr = jdata.contract_addr;
    const selection = getSelection();
    const type = jdata.type;
    if (!validateAuthentication(session_id, retries)){
      throw "Authentication expired, please try again";
    } else {
      if (jdata.type == 1 && jdata.type === String(getType())) {
        var max = selection.replaceAll("0", "").length;
        let counter = 0;
        for (var key in jdata.data) {
          if (jdata.data[key] !== "" && selection.charAt(resource.CLAIM_TYPE[key]-1) === "1"){
            verifyClaimByData(contract_addr, resource.CLAIM_TYPE[key], jdata.data[key]).then(result => {
              if (result) {
                counter++;
                if (counter === max) // Success
                  window.location.href="http://localhost/rpModule/verified.php";
              } else {
                // Failed
                window.location.href = "http://localhost/rpModule/unverified.php";
              }
            });
          } else if (jdata.data[key] !== "" && selection.charAt(resource.CLAIM_TYPE[key]-1) === "0") {
            throw "Required attribute not matched";
          }
        }
      } else if (jdata.type == 2 && jdata.type === String(getType())) {
        verifyClaim(contract_addr, 1).then(result => {
          if (result) {
            //Success
            window.location.href="http://localhost/rpModule/verified.php";
          } else {
            // Failed;
            window.location.href="http://localhost/rpModule/unverified.php";
          }
        });
      } else {
        throw "Inconsistent type";
      }
    }
    // window.location.href = "index.php";
  };

  window.addEventListener('unload', function (e) {
    e.returnValue = '';
    serv.close();
  });
} else {
  console.error("The browser does not support the software, please use another browser");
}

function validateAuthentication(uid, retries) {
  if (uid === getSessionID() && !getFlag()) {
    if (retries == getRetries()) {
      return true;
    }
  } else {
    return false;
  }
}
