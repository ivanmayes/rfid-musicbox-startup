export default {
    reboot: reboot
}

function reboot() {
    execute('shutdown -r now', function(callback){
        console.log(callback);
    });
}

function execute(command, callback){
    exec(command, function(error, stdout, stderr){ callback(stdout); });
}
