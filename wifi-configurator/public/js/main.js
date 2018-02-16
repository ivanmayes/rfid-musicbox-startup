$(document).ready(() => {

    scan();
    
    // Scan for Wifi Networks
    $('.scan').click((ev) => {
        ev.preventDefault();
        scan();
    });

    // Set Wifi
    $('.submit').click((ev) => {
        ev.preventDefault();


        let dropdown = $('.ssiddropdown');
        let ssid = $('.ssid').val();
        let password = $('.password').val();

        let wifi = {
            ssid: dropdown.val(),
            password: password
        };

        if (ssid) {
            wifi.ssid = ssid;
        }

        $.post('/wifi/set', wifi)
            .done((data) => {
                console.log('Success!', data);
            })
            .fail((err) => {
                console.log('Failed', err);
            });

    });
    
});

function scan() {
    $.get('/wifi/scan')
        .done((res) => {
            let html = '<option value="">No Network Selected</option>';
            if (res.data) {
                res.data.forEach(network => html += `<option value="${network.ssid}">${network.ssid}</option>`);
            }

            $('.ssiddropdown').html(html);
        })
        .fail((err) => {
            console.log('Failed', err);
        });
}