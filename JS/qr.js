$(document).ready(function(){
    jQuery('#qrcodeCanvas').qrcode({
        class: "tableformat",
        text: generate()
    });
})
var timeleft = 10;
var downloadTimer = setInterval(function(){
  if(timeleft <= 0){
    document.getElementById("countdown").innerHTML = "Finished";
    reset();
    timeleft = 10;
  } else {
    document.getElementById("countdown").innerHTML = timeleft + " seconds remaining";
    timeleft -= 1;
  }
}, 1000);

function reset() {
    var div = document.getElementById('qr');
    div.removeChild(document.getElementById('qrcodeCanvas'));
    var qrcanvas = document.createElement("div");
    div.append(qrcanvas);
    qrcanvas.id = "qrcodeCanvas";
    jQuery('#qrcodeCanvas').qrcode({
        class: "tableformat",
        text: generate()
    });
}

function generate() {
    let today = new Date();
    let miliss = String(today.getMilliseconds()).padStart(2, '0');
    let ss = String(today.getSeconds()).padStart(2, '0');
    let min = String(today.getMinutes()).padStart(2, '0');
    let hh = String(today.getHours()).padStart(2, '0');
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0');
    let yyyy = today.getFullYear();
    today = mm + '/' + dd + '/' + yyyy + ' ' + hh + ':' + mm + ':' + ss + ':' + miliss;
    let str = '{'+today+'}';
    return str;
}
