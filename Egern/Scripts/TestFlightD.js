/*
 * @name = TestFlight
 * @desc = TestFlight下载修正
 * @author = Nobyda
----------------------------------------
scriptings:
  - http_request:
      name: TF下载修正
      match: ^https?:\/\/testflight\.apple\.com\/v\d\/accounts\/.+?\/install$
      script_url: https://raw.githubusercontent.com/Centralmatrix3/Matrix-io/master/Egern/Scripts/TestFlightD.js
      timeout: 120
      body_required: true

mitm:
  hostnames:
    includes:
      - testflight.apple.com
----------------------------------------
*/

let app = JSON.parse($request.body);
app.storefrontId = '143441-19,29';
$done({body:JSON.stringify(app)});