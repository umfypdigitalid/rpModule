// import { verifyClaim, verifyClaimByData } from "./RPmodule";
import { config } from "../nodeScript/config.js";
import "./webSocket.js";

const refreshTimer = config.refreshTimer;
var loop = 0;
var timeleft = refreshTimer;
var type;
var selection;
var session_id;
var retries = 0;
var flag = false;

$(document).ready(function(){
    //start();
    function isASCII(str) {
        return /^[\x00-\x7F]*$/.test(str);
    }
    $.ajax({
        type: "GET",
        url: 'scripts/request.php?session_id=1',
        success: function(data){
            session_id = data;
            start(1, "11111");
        },
        error: function(data) {
            session_id = -1;
            console.error("error: "+data);
        }
    });
});

$(function () {
    $('#refresh').click(function () {
        loop = 0;
        reset(type, selection);
        flag = false;
        countDown();
    });
});


function start(_type, _selection) {
    type = _type;
    selection = _selection;
    jQuery('#qrcodeCanvas').qrcode({
        class: "tableformat",
        text: QRTextGenerator(retries, session_id, type, selection)
    });
    countDown();
}

function countDown() {
    $('#refresh').hide();
    var downloadTimer = setInterval(function () {
        if (timeleft <= 0) {
            document.getElementById("countdown").innerHTML = "Finished";
            reset(type, selection);
            timeleft = refreshTimer;
            loop += 1;
        } else {
            document.getElementById("countdown").innerHTML = timeleft + " seconds remaining";
            timeleft -= 1;
        }
        if (loop == config.maximumLoop) {
            flag = true;
            clearInterval(downloadTimer);
            $('#refresh').show();
        }
    }, 1000);
}

function reset(type, selection) {
    retries++;
    var div = document.getElementById('qr');
    div.removeChild(document.getElementById('qrcodeCanvas'));
    var qrcanvas = document.createElement("div");
    div.append(qrcanvas);
    qrcanvas.id = "qrcodeCanvas";
    // var uid = requestUID();
    var uid = session_id;
    jQuery('#qrcodeCanvas').qrcode({
        class: "tableformat",
        text: QRTextGenerator(retries, uid, type, selection)
    });
}

/*
uid in string
type in int (1, 2)
selection in int (1 - 15)
*/
 /*
    Required param
    1. UID of session
    2. Type of QR code
        a. Authentication
        b. Verification
    2. ClaimType:
        1. IC
        2. Name
        3. DOB
        4. Address
    */
    // UID=123456789&attribute=base64()&type=permission
function QRTextGenerator(retries, uid, type, selection) {
    if (type !== 1 && type!== 2) throw "Invalid type";
    if (typeof selection == "string") {
        console.log("length: "+selection.length);
        if (selection.length === 5){
            for (let i = 0; i < selection.length; i++) {
                if (selection.charAt(i)!=="0" && selection.charAt(i)!=="1")
                    throw "Invalid selection";
            }
        } else {
            throw "Invalid selection";
        }
    } else if (typeof selection !== "undefined" && type === 2) {
        throw "Invalid parameter";
    } else if (typeof selection == "undefined" && type === 1){
        throw "Invalid selection";
    }
    var json = {};
    json.retry = retries;
    json.uid = uid;
    json.type = type;
    if (type == 1){
        if (selection === undefined) 
            console.error('No attribute selected');
        else {
            json.selection = selection;
        }
    }
    json.name = config.name;
    json.reply = config.requestHandler;
    console.log("JSON: "+JSON.stringify(json));
    return JSON.stringify(json);
}

function toJSON(string) {
    const codeUnits = new Uint16Array(string.length);
    for (let i = 0; i < codeUnits.length; i++) {
        codeUnits[i] = string.charCodeAt(i);
    }
    return btoa(String.fromCharCode(...new Uint8Array(codeUnits.buffer)));
}

function getRetries(){
    return retries;
}

function getSessionID() {
    return session_id;
}

function getSelection() {
    return selection;
}

function getType() {
    return type;
}

function getFlag() {
    return flag;
}

export {start, getRetries, getSessionID, getSelection, getType, getFlag};