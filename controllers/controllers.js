myApp.controller('mainController', function ($scope, $route, $routeParams, $http, $cookies) {

    $scope.checkKey = function ($event) {
        if ($event.keyCode == 27) {
            $scope.popupClose();
        }
    }

    $('.tooltip').tooltipster({
        theme: ['tooltipster-noir', 'tooltipster-noir-customized'],
        side: 'left',
        arrow: false,
        delay: 100,
        animationDuration: 200
    });

    // Login
    $scope.loggedIn = true;
    $scope.logIn = function (url, action) {
        $scope.loggedIn = true;
    }
    $scope.logOut = function (url, action) {
        $scope.loggedIn = false;
        $scope.logout = true;
    }

    // Save routes in an array for navigation
    $scope.routes = [];
    angular.forEach($route.routes, function (route, path) {
        if (!route.icon) {
            route.icon = 'help.png';
        }
        if (route.name) {
            $scope.routes.push({
                path: path,
                icon: route.icon,
                name: route.name
            });
        }
    });

    // Watches, if actionbar is a param
    $scope.$on('$routeChangeSuccess', function (next, current) {
        if (current.$$route.fullBox) {
            $scope.fullBox = {actions: current.$$route.actions, title: current.$$route.title}
        }
        else {
            $scope.fullBox = '';
        }
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
    });

    var settingsLinks = [
        {name: 'Passwort ändern', icon: 'lock_outline', url: 'settings/pwChange.html'},
        {name: 'Profil', icon: 'person_outline', url: 'settings/profileSettings.html'}
    ];

    var mailerLinks = [
        {name: 'Nachrichten', icon: 'mail_outline', url: 'mailer/mails.html'},
        {name: 'Papierkorb', icon: 'delete', url: 'mailer/dustbin.html'},
        {name: 'Nachricht schreiben', icon: 'add', url: 'mailer/mail-add.html'}
    ];

    $scope.openSettings = function () {
        $scope.popup = true;
        $scope.popupTitle = 'Einstellungen';
        $scope.popupLinks = settingsLinks;
        $scope.popupContent = 'content/' + $scope.popupLinks[0].url;
    }
    $scope.openMailer = function () {
        $scope.popup = true;
        $scope.popupTitle = 'Mailer';
        $scope.popupLinks = mailerLinks;
        $scope.popupContent = 'content/' + $scope.popupLinks[0].url;
    }
    $scope.popupClose = function () {
        $scope.popup = false;
    }
    $scope.popupLoad = function (url) {
        $scope.popupContent = 'content/' + url;
    }
});

myApp.controller('dashboardController', function ($scope) {
    // Position dashboard-boxes on the right place
    $('.dashboardBox').each(function () {
        if (Cookies.get(this.id + '-box-position')) {
            $(this).css('top', Cookies.getJSON(this.id + '-box-position').top + 'px');
            $(this).css('left', Cookies.getJSON(this.id + '-box-position').left + 'px');
        }
    });
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
    $('.menu').draggable({
        cursorAt: { left: 5 },
        revert: true,
        revertDuration: 0,
    });
    $(".day").droppable({
        hoverClass: "hovered",
        drop: function (event, ui) {
            $(this).addClass("done");
            $(this).html("<i class='material-icons'>done</i>");
            console.log(event);
        }
    });
});

myApp.controller('feedbackController', function ($scope) {
    $scope.newFeedbacks = [
        {id: 1, subject: "Super Essen!", rating: 5, text: "War ein super Essen!!"},
        {id: 1, subject: "Zu salzig!", rating: 4, text: "Die Suppe war etwas zu salzig, sonst sehr lecker."},
        {id: 1, subject: "Wiederlich", rating: 1, text: "Mehr als ranzig fällt mir dazu nicht ein."}
    ];
    $scope.acceptedFeedbacks = [
        {id: 1, subject: "Super Essen!", rating: 5, text: "War ein super Essen!!"},
        {id: 1, subject: "Zu salzig!", rating: 4, text: "Die Suppe war etwas zu salzig, sonst sehr lecker."},
        {id: 1, subject: "Wiederlich", rating: 1, text: "Mehr als ranzig fällt mir dazu nicht ein."}
    ];
    $scope.declinedFeedbacks = [
        {id: 1, subject: "Arschloch", rating: 1, text: "Arschloch"}
    ];
    $scope.accept = function (index) {
        $scope.acceptedFeedbacks.push($scope.newFeedbacks[index]);
        $scope.newFeedbacks.splice(index, 1);
    }
    $scope.decline = function (index) {
        $scope.declinedFeedbacks.push($scope.newFeedbacks[index]);
        $scope.newFeedbacks.splice(index, 1);
    }
    $scope.reDecline = function (index) {
        $scope.declinedFeedbacks.push($scope.acceptedFeedbacks[index]);
        $scope.acceptedFeedbacks.splice(index, 1);
    }
    $scope.reAccept = function (index) {
        $scope.acceptedFeedbacks.push($scope.declinedFeedbacks[index]);
        $scope.declinedFeedbacks.splice(index, 1);
    }
});

myApp.controller('foodAddController', function ($scope) {

});

myApp.controller('pagesController', function ($scope) {
    $scope.days = [
        {shorthand: 'M', from: '08:00', toHalf: '14:00', fromHalf: '15:00', to: '22:00'},
        {shorthand: 'D'},
        {shorthand: 'M'},
        {shorthand: 'D'},
        {shorthand: 'F'},
        {shorthand: 'S'},
        {shorthand: 'S'}
    ];
    $scope.restDays = [
        {fromDate: '22.10.2016', toDate: '22.10.216'},
        {fromDate: '24.10.2016', toDate: '25.11.216'},
        {fromDate: '20.10.2016', toDate: '22.10.216'}
    ];
    $scope.sleep = function (index) {
        $scope.days[index].sleep = !$scope.days[index].sleep;
    }
    $scope.restDayRemove = function (index) {
        $scope.restDays.splice(index, 1);
    }
});

myApp.controller('pwChange', function ($scope) {
    $scope.pwValidate = function () {
        var pwNew = $scope.pwNew.toString();
        $scope.pwSafety = 1;
        if (pwNew.match(".{8}[a-z]")) {
            $scope.pwSafety += 1;
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
    $scope.mails = [
        {id: 1, subject: 'Willkommen', from: 'System', date: '13.09.2016'},
        {id: 2, subject: 'Anweisung', from: 'Reiner', date: '27.09.2016'}
    ];
    $scope.mailRead = function (id) {
        alert(id);
    }
});