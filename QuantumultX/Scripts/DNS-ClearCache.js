/*
 * @name = DNS-ClearCache
 * @desc = DNS-ClearCache
 * @author = crossutility
----------------------------------------
[task_local]
0 0 * * * https://raw.githubusercontent.com/Centralmatrix3/Matrix-io/master/QuantumultX/Scripts/DNS-ClearCache.js, tag=清除DNS缓存, img-url=trash.circle.system, enabled=true
----------------------------------------
*/

const message = {
    action: "dns_clear_cache"
};

$configuration.sendMessage(message).then(resolve => {
    if (resolve.ret) {
        console.log("dnsCache Cleared!");
    } else {
        console.log(resolve.error);
    }
    $done();
}, reject => {
    $done();
});