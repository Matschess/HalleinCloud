myApp.controller('mainController', function ($scope, $route, $routeParams, $http, $cookies) {
    $scope.username = 'Benutzername';
    /*$scope.loading = {
        status: '',
        text: ''
    };*/
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
        var frameParams = current.$$route.frame;
        if (frameParams) {
            switch (frameParams.type) {
                case 'fullBox':
                    $scope.frame = {
                        type: 'fullBox',
                        title: frameParams.title,
                        actions: frameParams.actions,
                    }
                    break;
                case 'switchBox':
                    $scope.frame = {
                        type: 'switchBox',
                        title: frameParams.title,
                        switched: 1,
                        switcher: frameParams.switcher
                    }
                    break;
            }
        }
        else {
            $scope.frame = false;
        }

        tooltipstln();
    });

    var settingsLinks = [
        {name: 'Profil', icon: 'person_outline', url: 'settings/profileSettings.html', actions: [{icon: 'done'}]},
        {name: 'Passwort ändern', icon: 'lock_outline', url: 'settings/pwChange.html', actions: [{icon: 'send'}]}
    ];

    var mailerLinks = [
        {name: 'Nachrichten', icon: 'mail_outline', url: 'mailer/mails.html'},
        {name: 'Papierkorb', icon: 'delete', url: 'mailer/dustbin.html'},
        {name: 'Nachricht schreiben', icon: 'add', url: 'mailer/mail-add.html', actions: [{icon: 'send'}]}
    ];

    $scope.openSettings = function () {
        $scope.popup = {
            title: 'Einstellungen',
            links: settingsLinks,
            content: 'content/' + settingsLinks[0].url,
            actions: settingsLinks[0].actions
        }
    }
    $scope.openMailer = function () {
        $scope.popup = {
            title: 'Mailer',
            links: mailerLinks,
            content: 'content/' + mailerLinks[0].url,
            actions: mailerLinks[0].actions
        }
    }
    $scope.popupLoad = function (index) {
        $scope.popup.content = 'content/' + $scope.popup.links[index].url;
        $scope.popup.action = $scope.popup.links[index].actions;
        console.log($scope.popup);
    }
    $scope.popupClose = function () {
        $scope.popup = false;
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


    $scope.notifications = [
        {type: 'alert', number: 3, title: 'Fehler', text: 'Dies ist eine Fehler oder Nicht-behoben-Box.'},
        {type: 'success', title: 'Erfolg', text: 'Eine Erfolgsmeldung.'},
        {type: 'warning', title: 'Warnung', text: 'So sieht eine Warnung aus.'}
    ]
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
    $scope.menus = [
        {name: 'Bunter Blattsalat'},
        {name: 'Putenstreifen-Salat'},
        {name: 'Steirischer Backhendl-Salat'},
        {name: 'Putenfilet-Sandwich'},
        {name: 'Hamburger mit Pommes'},
        {name: 'Cordon Bleu'},
        {name: 'Chickenburger paniert mit Pommes'},
        {name: 'Wiener Schnitzel'},
        {name: 'Spare Ribs'}
    ];
    $scope.days = [
        {name: 'Montag', menu: 1},
        {name: 'Dienstag'},
        {name: 'Mittwoch'},
        {name: 'Donnerstag'},
        {name: 'Freitag'},
        {name: 'Samstag'},
        {name: 'Sonntag'}
    ];
    $scope.assignMenu = function (index, data) {
        $scope.days[index].menu = data + 1; // Because a 0 would be a bug
        tooltipstln();
    }
    $scope.removeMenu = function (index) {
        delete $scope.days[index].menu;
        console.log($scope.days);
    }
    /*
     $('.content').ready(function () {
     $('.menu').draggable({
     cursorAt: {left: 5},
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
     */
});

myApp.controller('feedbackController', function ($scope) {
    $scope.newFeedbacks = [
        {id: 1, subject: "Super Essen!", rating: 5, text: "War ein super Essen!!"},
        {id: 1, subject: "Zu salzig!", rating: 4, text: "Die Suppe war etwas zu salzig, sonst sehr lecker."},
        {id: 1, subject: "Nicht gut", rating: 1, text: "Hab schon lange nicht mehr so schlecht gegessen."}
    ];
    $scope.acceptedFeedbacks = [];
    $scope.declinedFeedbacks = [
        {id: 1, subject: "Schlecht", rating: 1, text: "Schlecht schlecht"}
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
    $scope.tags = [
        {name: 'putenstreifensalat', class: 'red'},
        {name: 'salat', class: 'yellow'},
        {name: 'geflügel', class: 'orange'},
    ];
    $scope.removeTag = function (index) {
        $scope.tags.splice(index, 1);
    }
});

myApp.controller('usersController', function ($scope) {
    $scope.users = [
        {name: 'Superuser', username: 'superuser', group: 'superuser'},
        {name: 'Admin', username: 'admin', group: 'administrators'},
        {name: 'Cleitzlers', username: 'cleitzler', group: 'restaurants', lastLogin: '12.10.2016'},
        {name: 'Pizzeria Bella Palma', username: 'bella-palma', group: 'restaurants'},
        {name: 'Gasthof Hager', username: 'hager', group: 'restaurants'},
        {name: 'Koi', username: 'koi', group: 'restaurants'}
    ]
    $scope.deleteUser = function(index) {
        $scope.users.splice(index, 1);
    }
});

myApp.controller('userAddController', function ($scope) {
    $scope.groups = ['restaurants', 'administratoren'];
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
        {fromDate: '22.10.2016', toDate: '22.10.2016'},
        {fromDate: '24.10.2016', toDate: '25.11.2016'},
        {fromDate: '20.10.2016', toDate: '22.10.2016'}
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
        {id: 2, subject: 'Anweisung', from: 'Rainer', date: '27.09.2016'}
    ];
    $scope.mailRead = function (id) {
        alert(id);
    }
});

function tooltipstln() {
    $('.content').ready(function () {
        $('select').select2({
            width: '180px',
            minimumResultsForSearch: Infinity
        }); // For select boxes

        $('select.search').select2({
            width: '180px'
        }); // For select boxes

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