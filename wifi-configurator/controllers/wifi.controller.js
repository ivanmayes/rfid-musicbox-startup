import logger from '../core/logger/app-logger';
import linuxExec from '../core/linux/exec';
import wifiscanner from 'node-wifiscanner';
import _ from 'lodash';
const fs = require('fs');

const controller = {};

controller.scan = async (req, res) => {
    try {
        // Write to Javascript
        wifiscanner.scan((err, data) => {
            if (err) {
                res.send({
                    message: err,
                    status: 'error'
                });
                return;
            }

            res.send({
                data: data.filter(uniqFilterAccordingToProp('ssid')),
                status: 'success'
            });
        })
        
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

            setTimeout(() => linuxExec.reboot(), 5000);
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

const uniqFilterAccordingToProp = function (prop) {
    if (prop)
        return (ele, i, arr) => arr.map(ele => ele[prop]).indexOf(ele[prop]) === i
    else
        return (ele, i, arr) => arr.indexOf(ele) === i
}