console.log('hello');

var monitors = []
var monitor_id = 0;
var interval = null;
var speed = 100;

$(document).ready(function () {
    //get monitors
    $.get(`/monitors`, function (data, status) {
        if (data) {
            monitors = data;
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
    
        if(interval){
            clearInterval(interval);
            interval = setInterval(screenShot, speed);
        }
    });
    
    //
    $("#btn-start").click(function(){
        //get screenshot
        if(!interval){
            // console.log('Start')
            interval = setInterval(screenShot, speed);
            $(this).text("Stop");
        }else{
            // console.log('Stop')
            clearInterval(interval);
            interval = null;
            $(this).text("Start");
        }
        
    });


    // event on screen
    // left click
    $("#screen-img").click(function(event){
        console.log(event)
        var monitor = monitors[monitor_id]
        console.log('width', $("#screen-img").width())
        var x = monitor.width*event.offsetX/$("#screen-img").width();
        var y = monitor.height*event.offsetY/$("#screen-img").height();

        $.get(`/mouse/click?x=${Math.round(x)}&y=${Math.round(y)}`, function (data, status) {
            console.log(data);
        });

    })

    // right click
    $("#screen-img").contextmenu(function(event){
        console.log(event)
        var monitor = monitors[monitor_id]
        console.log('width', $("#screen-img").width())
        var x = monitor.width*event.offsetX/$("#screen-img").width();
        var y = monitor.height*event.offsetY/$("#screen-img").height();

        $.get(`/mouse/rightclick?x=${Math.round(x)}&y=${Math.round(y)}`, function (data, status) {
            console.log(data);
        });

        event.preventDefault();
    })

    // common key
    $(document).keypress(function(e) {
        console.log(e, e.keyCode)
        var key = e.keyCode ? e.keyCode : e.which;

        $.get(`/keyboard/keypress?key=${key}`, function (data, status) {
            console.log(data);
        });
    });

    // function key
    $(document).keyup(function(e){
        console.log(e, e.keyCode)
        var key = e.keyCode ? e.keyCode : e.which;
        if(key < 65){
            $.get(`/keyboard/keyup?key=${key}`, function (data, status) {
                console.log(data);
            });
        }
    });
    
});

async function screenShot() {
    $.get(`/screenshot/${monitor_id}`, function (data, status) {
        $('#screen-img').attr("src", data.screenshot);
    });
}