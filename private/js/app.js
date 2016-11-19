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

function globalNotification(type, text){
    $('.globalNotification').addClass('visible');
    $('.globalNotification').removeClass('success warning error');
    switch(type){
        case 'success':
            $('.globalNotification').addClass('success');
            break;
        case 'warning':
            $('.globalNotification').addClass('warning');
            break;
        case 'error':
            $('.globalNotification').addClass('error');
            if(!text) text = 'Fehler';
            break;
    }
    $('.globalNotification').html(text);
    var width = $('.globalNotification').outerWidth();
    $('.globalNotification').css('left', 'calc(50% - ' + width / 2 + 'px)');
    $('.globalNotification').click(function() {
        $('.globalNotification').removeClass('visible');
    })
    setTimeout(function(){
        $('.globalNotification').removeClass('visible');
    }, 3000);
}

function prepareUpload(data){
    var result = {};
    var value;
    for(var propertyName in data) {
        value = data[propertyName];
        if(!value) value = ' ';
        result[propertyName] = value;
    }
    return result;
}