console.log('hello');

var monitor_id = 0;
var interval = null;
var speed = 20;

$(document).ready(function () {
    //get monitors
    $.get(`/monitors`, function (data, status) {
        if (data) {
            for (var i = 0; i < data.length; i++) {
                $('#monitors').append(`<option value="${i}">
                ${data[i].name}
            </option>`);
            }
        }
    });

    //event on monitor changed
    $('#monitors').on('change', function (e) {
        var optionSelected = $(this).find("option:selected");
        var valueSelected = optionSelected.val();
        // console.log(optionSelected, valueSelected)
    
        monitor_id = Number(valueSelected);
    
        clearInterval(interval);
        interval_id = setInterval(screenShot, speed);
    
    });
    

    //get screenshot
    interval_id = setInterval(screenShot, speed);
});

function screenShot() {
    $.get(`/screenshot/${monitor_id}`, function (data, status) {
        $('#screen-img').attr("src", data.screenshot);
    });
}