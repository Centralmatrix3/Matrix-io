/*
 * @name = 清理DNS缓存
 * @desc = 清理DNS缓存
 * @author = crossutility
----------------------------------------
[task_local]
0 0 * * * https://raw.githubusercontent.com/Centralmatrix3/Matrix-io/master/QuantumultX/Scripts/DNS-Clear-Cache.js, tag=清理DNS缓存, img-url=trash.circle.system, enabled=true
----------------------------------------
*/

const message = {
    action: "dns_clear_cache"
};

$configuration.sendMessage(message).then(resolve => {
    if (resolve.ret) {
        console.log("DNS Cache Cleared!");
    } else {
        console.log(resolve.error);
    }
    $done();
}, reject => {
    $done();
});