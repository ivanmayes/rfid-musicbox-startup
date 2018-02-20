var exec = require('child_process').exec;

export default {
    reboot: reboot,
    disableDnsmasq: disableDnsmasq
}

function reboot() {
    execute('shutdown -r now', function(callback){
        console.log(callback);
    });
}

function disableDnsmasq() {
    execute('sudo systemctl disable dnsmasq', function(callback) {
        console.log(callback);
    });
}

function execute(command, callback){
    exec(command, function(error, stdout, stderr){ callback(stdout); });
}
