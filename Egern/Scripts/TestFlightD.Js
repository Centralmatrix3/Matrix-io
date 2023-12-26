// @name = TestFlightD.Js
// @author = NobyDa
// @update = 23.12.21

let app = JSON.parse($request.body);
app.storefrontId = '143441-19,29';
$done({body:JSON.stringify(app)});