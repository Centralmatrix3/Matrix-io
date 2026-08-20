/**
 * @file Replace-Body.js
 * @description Surge脚本实现QuantumultX的response-body和request-body重写类型
 * @author mieqq
 *
 * @example QuantumultX
 * [rewrite_local]
 * ^https://example\.com/v1 url response-body false response-body true
 *         ↓
 * @example Surge
 * [Script]
 * example = type=http-response,pattern=^https://example\.com/v1,script-path=Replace-Body.js,requires-body=1,argument=false->true
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
