import {config} from "../nodeScript/config.js";
import {verifyClaim, verifyClaimByData} from "./RPmodule.js";
import {getRetries, getSessionID, getTimeLeft} from "./qr.js";
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
    const time = jdata.time;
    if (!validateAuthentication(session_id, jdata.time, retries)){
      throw "Authentication takes too long time to proceed, please try again";
    } else {
      if (jdata.type == 1) {
        for (var key in jdata.data) {
          if (jdata.data[key] !== ""){
            verifyClaimByData(contract_addr, resource.CLAIM_TYPE[key], jdata.data[key]).then(result => {
              if (result) {
              } else {
                // Failed
                window.location.href = "http://localhost/rpModule/unverified.php";
              }
            });
          }
        }
        window.location.href="http://localhost/rpModule/verified.php";
        // Success
        // console.log("Success");
      } else if (jdata.type == 2) {
        verifyClaim(contract_addr, 1).then(result => {
          if (result) {
            //Success
            window.location.href="http://localhost/rpModule/verified.php";
          } else {
            console.error("Identity is not verified");
            // Failed;
            window.location.href="http://localhost/rpModule/unverified.php";
          }
        });
      }
    }
    // window.location.href = "index.php";
  };

  window.addEventListener('unload', function (e) {
    e.returnValue = '';
    serv.close();
  });

//Any authentication after 2 seconds will be invalid
function validateAuthentication(uid, time, retries) {
  if (uid === getSessionID()) {
    if (retries == getRetries()) {
      if (time - getTimeLeft() <= 2){
        return true;
      }
    }
    else if (retries - getRetries() == 1) {
      if ((time - getTimeLeft())%30 <= 2) {
        return true;
      }
    } else {
      return false;
    }
  } else {
    return false;
  }
}
  
} else {
  console.log("N/A");
}

