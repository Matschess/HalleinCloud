tooltipstln();

function tooltipstln() {
    $('.content').ready(function () {
        $('.tooltip').tooltipster({
            theme: ['tooltipster-noir', 'tooltipster-noir-customized'],
            side: 'left',
            arrow: false,
            delay: 100,
            animationDuration: 200
        });
        $('.tooltipTop').tooltipster({
            theme: ['tooltipster-noir', 'tooltipster-noir-customized'],
            side: 'top',
            arrow: false,
            delay: 100,
            animationDuration: 200
        });
        $('.tooltipRight').tooltipster({
            theme: ['tooltipster-noir', 'tooltipster-noir-customized'],
            side: 'right',
            arrow: false,
            delay: 100,
            animationDuration: 200
        });
        $('.tooltipBottom').tooltipster({
            theme: ['tooltipster-noir', 'tooltipster-noir-customized'],
            side: 'bottom',
            arrow: false,
            delay: 100,
            animationDuration: 200
        });
        $('.tooltipLight').tooltipster({
            theme: ['tooltipster-light', 'tooltipster-light-customized'],
            side: 'right',
            arrow: false,
            delay: 100,
            animationDuration: 200
        });
    });
}

function stringToDate(date) {
    var day = date.substr(0, 2);
    var month = date.substr(3, 2);
    var year = date.substr(6);
    date = new Date(year,month-1,day);
    return date;
}

function dateToString(date) {
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    date = year + '-' + month + '-' + day
    return date;
}

function datepicker() {
    $('.content').ready(function () {
        $('.datepicker').datepicker({
                prevText: 'Zurück', prevStatus: '',
                prevJumpText: '&#x3c;&#x3c;', prevJumpStatus: '',
                nextText: 'Vor', nextStatus: '',
                nextJumpText: '&#x3e;&#x3e;', nextJumpStatus: '',
                currentText: 'heute', currentStatus: '',
                todayText: 'heute', todayStatus: '',
                clearText: '-', clearStatus: '',
                closeText: 'schließen', closeStatus: '',
                monthNames: ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni',
                    'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'],
                monthNamesShort: ['Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun',
                    'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'],
                dayNames: ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'],
                dayNamesShort: ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'],
                dayNamesMin: ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'],
                weekHeader: 'KW',
                minDate: 0,
                showWeek: true,
                firstDay: 1,
                dateFormat: 'dd.mm.yy',
                altField: "#venue_date",
                altFormat: "yy-mm-dd",
            }
        );
    });
}

function selectln() {
    $('.content').ready(function () {
        $('select').select2({
            width: '180px',
            minimumResultsForSearch: Infinity
        }); // For select boxes

        $('select.search').select2({
            width: '180px'
        }); // For select boxes
    });
}

var globalNotificationsTimeout;
function globalNotification(type, text) {
    clearTimeout(globalNotificationsTimeout);
    $('.globalNotification').addClass('visible');
    $('.globalNotification').removeClass('success warning error');
    switch (type) {
        case 'success':
            $('.globalNotification').addClass('success');
            break;
        case 'warning':
            $('.globalNotification').addClass('warning');
            break;
        case 'error':
            $('.globalNotification').addClass('error');
            if (!text) text = 'Fehler';
            break;
    }
    $('.globalNotification').html(text);
    var width = $('.globalNotification').outerWidth();
    $('.globalNotification').css('left', 'calc(50% - ' + width / 2 + 'px)');
    $('.globalNotification').click(function () {
        $('.globalNotification').removeClass('visible');
    })
    globalNotificationsTimeout = setTimeout(function () {
        $('.globalNotification').removeClass('visible');
    }, 3000);
}

function prepareUpload(data) {
    var result = {};
    var value;
    for (var propertyName in data) {
        value = data[propertyName];
        if (!value) value = ' ';
        result[propertyName] = value;
    }
    return result;
}

$('.content').ready(function () {
$('.topbar .burgericon').click(function(){
    $('.navbar').toggleClass('visible');
});
    $('.navbar ul a').click(function(){
        $('.navbar').removeClass('visible');
    });
});