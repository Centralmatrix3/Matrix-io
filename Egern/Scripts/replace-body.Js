/*
 * @name = replace-body
 * @desc = replace-body
 * @author = mieqq
----------------------------------------
实现QuantumultX的(request-body)重写类型
实现QuantumultX的(response-body)重写类型

如QuantumultX:
https:\/\/service\.ilovepdf\.com\/v1\/user url response-body false response-body true

可改写为 Egern:
scriptings:
  - http_response:
      name: 测试
      match: https:\/\/service\.ilovepdf\.com\/v1\/user
      script_url: https://raw.githubusercontent.com/Centralmatrix3/Matrix-io/master/Egern/Scripts/replace-body.Js
      timeout: 60
      body_required: true
      arguments:
        _compat.$argument: false->true

mitm:
  hostnames:
    - service.ilovepdf.com

argument=要匹配值=作为替换的值
支持正则:如argument=\w+->test
支持正则修饰符:如argument=/\w+/g->test
支持多参数:argument=匹配值1->替换值1&匹配值2->替换值2

支持改写响应体和请求体体(type=http-response)或(http-request)必须打开需要body(body_required: true)

修改json格式的键值:
argument=("key")\s?:\s?"(.+?)"->$1: "new_value"

s修饰符可以让.匹配换行符如:argument=/.+/s->hello
----------------------------------------
*/

function getRegexp(re_str) {
	let regParts = re_str.match(/^\/(.*?)\/([gims]*)$/);
	if (regParts) {
		return new RegExp(regParts[1], regParts[2]);
	} else {
		return new RegExp(re_str);
	}
}

let body;
if (typeof $argument == "undefined") {
	console.log("requires $argument");
} else {
	if ($script.type === "http-response") {
		body = $response.body;
	} else if ($script.type === "http-request") {
		body = $request.body;
	} else {
		console.log("script type error");
	}
}

if (body) {
	$argument.split("&").forEach((item) => {
		let [match, replace] = item.split("->");
		let re = getRegexp(match);
		body = body.replace(re, replace);
	});
	$done({ body });
} else {
	console.log("Not Modify");
	$done({});
}
