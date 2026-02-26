/*
 * @name = TestFlight
 * @desc = TestFlight下载修正
 * @author = NobyDa
----------------------------------------
http:
  script:
    - match: ^https?:\/\/testflight\.apple\.com\/v\d\/accounts\/.+?\/install$
      name: TF下载修正
      type: request
      require-body: true
      timeout: 120

  mitm:
    - "testflight.apple.com"

script-providers:
  TF下载修正:
    url: https://raw.githubusercontent.com/Centralmatrix3/Matrix-io/master/Stash/Scripts/TestFlightD.js
    interval: 86400
----------------------------------------
*/

let app = JSON.parse($request.body);
app.storefrontId = '143441-19,29';
$done({body:JSON.stringify(app)});