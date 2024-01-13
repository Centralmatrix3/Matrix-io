/*
 * @name = Redirect
 * @desc = Redirect
 * @author = DivineEngine
----------------------------------------
http:
  script:
    - match: ^https?:\/\/app\.biliintl\.com\/(intl\/gateway\/v\d\/app\/data\/report\/heartbeat\/mobile|x\/(history|reply)/v\d/add)
      name: Redirect
      type: request
      require-body: true
      timeout: 60

    - match: ^https?:\/\/passport\.biliintl\.com\/x\/intl\/passport-login\/(sms\/send|reg\/sms|oauth2\/access_token|login\/sms)
      name: Redirect
      type: request
      require-body: true
      timeout: 60

  mitm:
    - "app.biliintl.com"
    - "passport.biliintl.com"

script-providers:
  Redirect:
    url: https://raw.githubusercontent.com/Centralmatrix3/Matrix-io/master/Stash/Scripts/Redirect.Js
    interval: 86400
----------------------------------------
*/

let body = $request.body;

body = body.replace(/&sim_code=\d+/,"&sim_code=51503");
body = body.replace(/&locale=zh_CN/,"&locale=zh_PH");
body = body.replace(/&s_locale=zh-Hans_[A-Z]{2}/,"&s_locale=zh-Hans_PH");

console.log(body)

$done({body});