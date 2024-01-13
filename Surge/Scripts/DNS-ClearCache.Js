/*
 * @name = DNS-ClearCache
 * @author = zZPiglet
 * @author = Rabbit-Spec
----------------------------------------
[Panel]
DNS-ClearCache = script-name=DNS-ClearCache,update-interval=600

[Script]
DNS-ClearCache = type=generic,timeout=10,script-path=https://raw.githubusercontent.com/Centralmatrix3/Matrix-io/master/Surge/Scripts/DNS-ClearCache.Js,argument=title=DNS-ClearCache&icon=cube&color=#afe59a&server=false
----------------------------------------
*/

!(async () => {
    let panel = { title: "Flush DNS" },
        showServer = true,
        dnsCache;
    if (typeof $argument != "undefined") {
        let arg = Object.fromEntries($argument.split("&").map((item) => item.split("=")));
        if (arg.title) panel.title = arg.title;
        if (arg.icon) panel.icon = arg.icon;
        if (arg.color) panel["icon-color"] = arg.color;
        if (arg.server == "false") showServer = false;
    }
    if (showServer) {
        dnsCache = (await httpAPI("/v1/dns", "GET")).dnsCache;
        dnsCache = [...new Set(dnsCache.map((d) => d.server))].toString().replace(/,/g, "\n");
    }
    if ($trigger == "button") await httpAPI("/v1/dns/flush");
    let delay = ((await httpAPI("/v1/test/dns_delay")).delay * 1000).toFixed(0);
    panel.content = `DNS延迟: ${delay}ms${dnsCache ? `\nserver:\n${dnsCache}` : ""}`;
    $done(panel);
})();

function httpAPI(path = "", method = "POST", body = null) {
    return new Promise((resolve) => {
        $httpAPI(method, path, body, (result) => {
            resolve(result);
        });
    });
}