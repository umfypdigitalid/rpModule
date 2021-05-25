var QRCode = require('qrcode');
var canvas = document.getElementById('canvas');

QRCode.toCanvas(canvas, 'Hello World', function (error) {
    if (error) consile.error(error)
        console.log('success!');
})