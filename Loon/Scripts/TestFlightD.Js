/*
 * @name = TestFlightD
 * @desc = TestFlightD
 * @author = Nobyda
----------------------------------------
[Script]
http-request ^https?:\/\/testflight\.apple\.com\/v\d\/accounts\/.+?\/install$ script-path=https://raw.githubusercontent.com/Centralmatrix3/Matrix-io/master/Loon/Scripts/TestFlightD.Js, requires-body=true, timeout=120, tag=TF下载修正

[MITM]
hostname = testflight.apple.com
----------------------------------------
*/

let app = JSON.parse($request.body);
app.storefrontId = '143441-19,29';
$done({body:JSON.stringify(app)});
