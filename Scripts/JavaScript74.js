var newUrl,
pageTime,
timeOutID,
pr,
progr,
pause = false;

$(document).ready(function () {
    // StartLinks
    $('a').click(function (event) {
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
    
    function pb() {
        if (!Modernizr.meter) {
            alert('Sorry your brower does not support HTML5 progress bar');
        }
        else {
            alert('progress bar');
            var progressbar = $('#progressbar'),
            max = progressbar.attr('max'),
            progressTime = (1000 / max) * 5,
            value = progressbar.val();

            var loading = function () {
                value += 1;
                addValue = progressbar.val(value);

                if (value == max) {
                    clearInterval(animate);
                }
            };

            var animate = setInterval(function () {
                loading();
            }, progressTime);
        };
    };
});

function isHhistoryApiAvailable() {
    return !!(window.history && history.pushState);
}

$(window).bind('popstate', function () {
    $.ajax({
        url: location.pathname + '?ajax=1',
        success: function (data) {
            StopProgress();
            $('#content').html(data);
        }
    });
});

function NextPage(url) {
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

    pageTime = undefined;
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
    var ad = "" + addr,
        b,
        bar,    
        progressbar = $('#progressbar'),
        max = progressbar.attr('max'),
        progressTime = (1000 / max) * 5,
        value = progressbar.val();

   // alert('progress bar');
    //alert("newUrl  " + newUrl);
    //alert("ad  "+ad);
    if (/(.+\.html)/.test(ad)) {
        newUrl = "" + ad;
    }
  
    value += 1;
    addValue = progressbar.val(value);

    if (value == max) {
        clearInterval(animate);
    }

    var animate = setInterval(function () {
        loading();
    }, progressTime);

     b = +time;
    if (pageTime == undefined) {
        pageTime = +b;
    }

    bar = document.getElementById("LeftTime");
    bar.innerHTML = pageTime;
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
    $('#progressbar').val = 0;
        
}

