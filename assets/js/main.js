$(document).ready(function () {
    $('.tooltip').tooltipster({
        theme: ['tooltipster-noir', 'tooltipster-noir-customized'],
        side: 'left',
        arrow: false,
        delay: 100,
        animationDuration: 200
    });
    // Set position of dashboard-boxes to saved one
    $('.container .dashboardBox').each(function () {
        if (Cookies.get(this.id + '-box-position')) {
            $(this).css('top', Cookies.getJSON(this.id + '-box-position').top + 'px');
            $(this).css('left', Cookies.getJSON(this.id + '-box-position').left + 'px');
        }
    });
    // Make dashboard-boxes draggable and save their positions
    $('.container .dashboardBox').draggable({
        containment: '.container',
        stop: function (event, ui) {
            Cookies.set(this.id + '-box-position', ui.position, {expires: 365});
        }
    });
});