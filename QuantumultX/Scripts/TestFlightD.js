/*
 * @name = TestFlight
 * @desc = TestFlight下载修正
 * @author = NobyDa
----------------------------------------
[rewrite_local]
^https?:\/\/testflight\.apple\.com\/v\d\/accounts\/.+?\/install$ url script-request-body https://raw.githubusercontent.com/Centralmatrix3/Matrix-io/master/QuantumultX/Scripts/TestFlightD.js

[mitm]
hostname = testflight.apple.com
----------------------------------------
*/

let app = JSON.parse($request.body);
app.storefrontId = '143441-19,29';
$done({body:JSON.stringify(app)});