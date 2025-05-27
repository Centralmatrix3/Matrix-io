/*
 * @name = NoRedirect
 * @desc = NoRedirect
 * @author = app2smile
----------------------------------------
http:
  script:
    - match: ^https:\/\/boxer\.baidu\.com\/scheme\?scheme
      name: No-Redirect
      type: response
      timeout: 120

  mitm:
    - "boxer.baidu.com"

script-providers:
  NoRedirect:
    url: https://raw.githubusercontent.com/Centralmatrix3/Matrix-io/master/Stash/Scripts/NoRedirect.js
    interval: 86400
----------------------------------------
*/

const method = $request.method;
const url = $request.url;
const status = $response.status;
let headers = $response.headers;
const notifiTitle = "百度搜索防跳转AppStore错误";

if (method !== "GET" || status !== 302 || !headers.hasOwnProperty('Location')) {
    console.log(`method:${method},status:${status},url:${url}`);
    $notification.post(notifiTitle, "百度防跳转AppStore", "method/status有误");
} else {
    if (headers.Location.indexOf('.apple.com') !== -1) {
        let tokenData = getUrlParamValue(url, 'tokenData');
        if (tokenData == null) {
            console.log(`未获取到tokenData,url:${url}`);
            $notification.post(notifiTitle, "getUrlParamValue", "未获取到tokenData");
        } else {
            let tokenDataObj = JSON.parse(decodeURIComponent(tokenData));
            headers.Location = tokenDataObj.url;
            console.log('成功');
        }
    } else {
        console.log('无需修改Location');
    }
}
$done({
    headers
});

function getUrlParamValue(url, queryName) {
    return Object.fromEntries(url.substring(url.indexOf("?") + 1)
        .split("&")
        .map(pair => pair.split("="))
    )[queryName];
}