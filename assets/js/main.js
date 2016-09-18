$(document).ready(function () {
    $('.tooltip').tooltipster({
        side: 'left'
    });
    $('.container .dashboardBox').draggable({
        containment: '.container'
    });
});