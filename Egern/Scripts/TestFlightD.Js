// @name = TestFlight
// @desc = TestFlight下载修正
// @author = NobyDa

let app = JSON.parse($request.body);
app.storefrontId = '143441-19,29';
$done({body:JSON.stringify(app)});