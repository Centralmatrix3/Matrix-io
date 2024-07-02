/*
 * @name = TestFlightD
 * @desc = TestFlightD
 * @author = NobyDa
----------------------------------------
[General]
skip-proxy = %APPEND% iosapps.itunes.apple.com

[Script]
TF下载修正 = type=http-request,pattern=^https?:\/\/testflight\.apple\.com\/v\d\/accounts\/.+?\/install$,script-path=https://raw.githubusercontent.com/Centralmatrix3/Matrix-io/master/Surge/Scripts/TestFlightD.Js,requires-body=true,timeout=120

[MITM]
hostname = %APPEND% testflight.apple.com
----------------------------------------
*/

let app = JSON.parse($request.body);
app.storefrontId = '143441-19,29';
$done({body:JSON.stringify(app)});
