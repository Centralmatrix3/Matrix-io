/*
 * @name = TestFlightD
 * @desc = TestFlightD
 * @author = NobyDa
----------------------------------------
http:
  script:
    - match: ^https?:\/\/testflight\.apple\.com\/v\d\/accounts\/.+?\/install$
      name: TestFlight.D
      type: request
      require-body: true
      timeout: 120

  mitm:
    - "testflight.apple.com"

script-providers:
  TestFlight.D:
    url: https://raw.githubusercontent.com/Centralmatrix3/Matrix-io/master/Stash/Scripts/TestFlightD.Js
    interval: 86400
----------------------------------------
*/

let app = JSON.parse($request.body);
app.storefrontId = '143441-19,29';
$done({body:JSON.stringify(app)});
