myApp.controller('dashboardController', function ($scope) {
    // Position dashboard-boxes on the right place
    $('.dashboardBox').each(function () {
        if (Cookies.get(this.id + '-box-position')) {
            $(this).css('top', Cookies.getJSON(this.id + '-box-position').top + 'px');
            $(this).css('left', Cookies.getJSON(this.id + '-box-position').left + 'px');
        }
    });
    // Make dashboard-boxes draggable
    $('.dashboardBox').draggable({
        containment: '.container',
        stop: function (event, ui) {
            Cookies.set(this.id + '-box-position', ui.position, {expires: 365});
        }
    });

    $scope.order = function () {
        $('.dashboardBox').each(function () {
            if (Cookies.get(this.id + '-box-position')) {
                $(this).css('top', 'auto');
                $(this).css('left', 'auto');
                Cookies.remove(this.id + '-box-position');
            }
        });
    }
});

myApp.controller('foodController', function ($scope) {
    $('.menuclass').draggable({
        hoverClass: "whiledragged"
    });
    $(".day").droppable({
        hoverClass: "hovered"
    });
});

myApp.controller('foodAddController', function ($scope) {

});

myApp.controller('pwChange', function ($scope) {
    $scope.pwValidate = function () {
        var pwNew = $scope.pwNew.toString();
        $scope.pwSafety = 1;
        if (pwNew.match(".{8}[a-z]")) {
            $scope.pwSafety+=1;
        }
        if (pwNew.match("[0-9]?[A-Z]")) {
            $scope.pwSafety++;
        }
        if (pwNew.match("[!\"§$%&/()=?]")) {
            $scope.pwSafety++;
        }
    }
});

myApp.controller('mailController', function ($scope) {

});