/*
 * @name = Redirect
 * @desc = Redirect
 * @author = DivineEngine
----------------------------------------
[Script]
Redirect = type=http-request,pattern=^https?:\/\/app\.biliintl\.com\/(intl\/gateway\/v\d\/app\/data\/report\/heartbeat\/mobile|x\/(history|reply)/v\d/add),script-path=https://raw.githubusercontent.com/Centralmatrix3/Matrix-io/master/Shadowrocket/Scripts/Redirect.Js,requires-body=true,timeout=60

Redirect = type=http-request,pattern=^https?:\/\/passport\.biliintl\.com\/x\/intl\/passport-login\/(sms\/send|reg\/sms|oauth2\/access_token|login\/sms),script-path=https://raw.githubusercontent.com/Centralmatrix3/Matrix-io/master/Shadowrocket/Scripts/Redirect.Js,requires-body=true,timeout=60

[MITM]
hostname = %APPEND% app.biliintl.com, passport.biliintl.com
----------------------------------------
*/

let body = $request.body;

body = body.replace(/&sim_code=\d+/,"&sim_code=51503");
body = body.replace(/&locale=zh_CN/,"&locale=zh_PH");
body = body.replace(/&s_locale=zh-Hans_[A-Z]{2}/,"&s_locale=zh-Hans_PH");

console.log(body)

$done({body});