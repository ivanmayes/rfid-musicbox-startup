$(document).ready(() => {
    
    $('.submit').click((ev) => {
        ev.preventDefault();

        let ssid = $('.ssid').val();
        let password = $('.password').val();

        let wifi = {
            ssid: ssid,
            password: password
        };

        console.log('POSTING', wifi);

        $.post('/wifi/set', wifi)
            .done((data) => {
                console.log('Success!', data);
            })
            .fail((err) => {
                console.log('Failed', err);
            });

    });
    
});