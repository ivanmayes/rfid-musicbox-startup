import logger from '../core/logger/app-logger';
import { linuxExec } from '../core/linux/exec';
const fs = require('fs');

const controller = {};

controller.scan = async (req, res) => {
    try {
        // Write to Javascript
        res.send({
            status: 'success',
            message: 'Wifi saved successfully!'
        });
    }
    catch(err) {
        res.send({
            message: err,
            status: 'error'
        });
    }
}

controller.set = async (req, res) => {
    try {
        let txt = `
            ctrl_interface=DIR=/var/run/wpa_supplicant GROUP=netdev
            update_config=1
            country=GB
            
            network={
                   ssid="${req.body.ssid}"
                   psk="${req.body.password}"
            }
        `;

        fs.writeFile('/etc/wpa_supplicant/wpa_supplicant.conf', txt, (err) => {  
            // throws an error, you could also catch it here
            if (err) throw err;

            // success case, the file was saved
            res.send({
                status: 'success',
                message: 'Wifi saved successfully!'
            });

            exec.reboot();
        });
        
    }
    catch(err) {
        res.send({
            message: err,
            status: 'error'
        });
    }
}

export default controller;