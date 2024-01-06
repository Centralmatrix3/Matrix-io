// @name = DNS-ClearCache
// @desc = DNS-ClearCache
// @author = crossutility

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
