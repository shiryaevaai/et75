// на этот адрес перейдём
var newUrl,
// время показа страницы
pageTime,
progressTime,
// содердит SetTimeOut
timeOutID,
//,,,,
pr,
progr,
// приостановлено ли время
pause = false;

$(document).ready(function () {
    // ссылки на страницы
    $('a').click(function (event) {
        StopProgress();
        //alert("pageTime  "+pageTime);
        //alert("progressTime  " + progressTime);
        //alert("timeOutID  " + timeOutID);

        // получили новый адрес
        var url = $(this).attr('href');
        var cont = $('#content').innerHTML;
        // alert(cont);

        $.ajax({
            url: url + '?ajax=1',
            success: function (data) {
                //alert($('#content').html(data));
                $('#content').html(data) = cont;

            }
        });

        // А вот так просто меняется ссылка
        if (url != window.location) {
            window.history.pushState(null, null, url);
        }

        // alert("it works");
        // Предотвращаем дефолтное поведение
        return false;
    });
    
    //function pb() {
    //    if (!Modernizr.meter) {
    //        alert('Sorry your brower does not support HTML5 progress bar');
    //    }
    //    else {
    //        alert('progress bar');
    //        var progressbar = $('#progressbar'),
    //        max = progressbar.attr('max'),
    //        progressTime = (1000 / max) * 5,
    //        value = progressbar.val();

    //        var loading = function () {
    //            value += 1;
    //            addValue = progressbar.val(value);

    //            if (value == max) {
    //                clearInterval(animate);
    //            }
    //        };

    //        var animate = setInterval(function () {
    //            loading();
    //        }, progressTime);
    //    };
    //};
});

function isHhistoryApiAvailable() {
    return !!(window.history && history.pushState);
}

//$(window).bind('popstate', function () {
//    $.ajax({
//        url: location.pathname + '?ajax=1',
//        success: function (data) {
//            StopProgress();
//            $('#content').html(data);
//        }
//    });
//});

$(window).bind('popstate', function () {
    StopProgress();
    $.ajax({
        url: location.pathname + '?ajax=1',
        success: function (data) {

            $('#content').html(data);            
        }
    });

});

function NextPage(url) {
    StopProgress();
    // location.assign(address);
    // получили новый адрес
    var cont = $('#content').innerHTML;
    //alert(cont);

    $.ajax({
        url: url + '?ajax=1',
        success: function (data) {
            //alert($('#content').html(data));
            $('#content').html(data) = cont;

        }
    });

    // А вот так просто меняется ссылка
    if (url != window.location) {
        window.history.pushState(null, null, url);
    }

    //pageTime = undefined;
    //progressTime = undefined;
    // alert("it works");
    // Предотвращаем дефолтное поведение
    return false;
}

function Pause(addr) {
    if (!pause) {
       // alert("pause" + pause);

        pause = true;
        clearTimeout(timeOutID);
        
        $('#pause').html('Продолжить');
    }
    else {
        //alert("pause" + pause);

        pause = false;
        $('#pause').html('Остановить');
        Progress(addr, pageTime);
    }
}

function Progress(addr, time) {
    var leftTime,    
        progressbar = $('#progressbar'),
        maxValue = progressbar.attr('max'),
        //progressTime = 1000 ,
        value = progressbar.val();
    
    addr = "" + addr;
    //alert('maxValue' + maxValue);

    if (/(.+\.html)/.test(addr)) {
        newUrl = "" + addr;        
    }

    time = +time;
    if (pageTime == undefined) {
        pageTime = +time;
    }

    if (typeof(progressTime) != "number") {
        // progressTime = (1000 / +maxValue) * 5;
        progressTime = +200 ;
    }
  
    //alert('progressTime= ' + progressTime);

    value += 1;
    progressbar.val(value);

    if (value == maxValue) {
        clearInterval(animate);
        progressTime = undefined;
    }

    var animate = setInterval(function () {
        loading();
    }, progressTime);
   // alert('progressTime= ' + progressTime);

    leftTime = document.getElementById("LeftTime");
    leftTime.innerHTML = pageTime;
    pageTime--;

    if (pageTime > 0) {
        timeOutID = setTimeout(Progress, 1000);
    }
    else {
        NextPage(newUrl);
    }
}

function StopProgress() {
    clearTimeout(timeOutID);
    pageTime = undefined;
    progressTime = undefined;
    timeOutID = undefined;
    //$('#progressbar').val = 0;
    $('#progressbar').val(0);        
}

