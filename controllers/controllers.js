var URL = 'http://localhost:3000';

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

    $scope.frameSwitch = function (index) {
        $scope.frame.switched = index + 1;
        tooltipstln();
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

    $scope.openSettings = function () {
        $scope.popup = {
            title: 'Einstellungen',
            links: settingsLinks,
            content: 'content/' + settingsLinks[0].url,
            actions: settingsLinks[0].actions
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

myApp.controller('loginController', function ($scope, $route, $routeParams, $http, $cookies) {
    var routes = {
        login: {
            title: 'Hallein App - Verwaltung',
            aboutUs: true,
            content: 'content/login.html'
        },
        setup: {
            restaurant: {
                basicData: {
                    title: 'Einrichtung - Schritt 1',
                    content: 'content/setup/restaurants/basicData.html'
                },
                address: {
                    title: 'Einrichtung - Schritt 2',
                    content: 'content/setup/restaurants/address.html'
                },
                openingTimes: {
                    title: 'Einrichtung - Schritt 3',
                    content: 'content/setup/restaurants/openingTimes.html'
                }
            },
        }
    };
    $scope.route = routes.login;

    $scope.logIn = function (url, action) {
        $scope.route = routes.setup.restaurant.basicData;
    }
    $scope.complete = function (src) {
        switch (src) {
            case 'basicData':
                $scope.route = routes.setup.restaurant.address;
            case 'address':
                $scope.route = routes.setup.restaurant.openingTimes;
        }
    }
});

myApp.controller('dashboardController', function ($scope) {
    $scope.notifications = [
        {type: 'alert', number: 3, title: 'Fehler', text: 'Dies ist eine Fehler oder Nicht-behoben-Box.'},
        {type: 'success', title: 'Erfolg', text: 'Eine Erfolgsmeldung.'},
        {type: 'warning', title: 'Warnung', text: 'So sieht eine Warnung aus.'}
    ]
});

myApp.controller('foodController', function ($scope) {
    $scope.type = 'mainCourse';
    $scope.setType = function (data) {
        $scope.type = data;
    }
    $scope.menus = [
        {name: 'Bunter Blattsalat', type: 'appetizer'},
        {name: 'Putenstreifen-Salat', type: 'appetizer'},
        {name: 'Steirischer Backhendl-Salat', type: 'mainCourse'},
        {name: 'Putenfilet-Sandwich', type: 'mainCourse'},
        {name: 'Hamburger mit Pommes', type: 'mainCourse'},
        {name: 'Cordon Bleu', type: 'mainCourse'},
        {name: 'Chickenburger ganiert mit Pommes', type: 'mainCourse'},
        {name: 'Wiener Schnitzel', type: 'mainCourse'},
        {name: 'Spare Ribs', type: 'mainCourse'},
        {name: 'Schoko Pudding', type: 'dessert'}
    ];
    $scope.days = [
        {name: 'Montag', menu: {appetizer: 1, mainCourse: 3, dessert: 7}},
        {name: 'Dienstag'},
        {name: 'Mittwoch'},
        {name: 'Donnerstag'},
        {name: 'Freitag'},
        {name: 'Samstag'},
        {name: 'Sonntag'}
    ];
    $scope.assignMenu = function (index, data) {
        if (!$scope.days[index].menu) {
            $scope.days[index].menu = {};
        }
        switch ($scope.menus[data].type) {
            case 'appetizer':
                $scope.days[index].menu.appetizer = data + 1; // Because a 0 would be a bug
                return;
            case 'mainCourse':
                $scope.days[index].menu.mainCourse = data + 1;
                return;
            case 'dessert':
                $scope.days[index].menu.dessert = data + 1;
                return;
        }
        tooltipstln();
    }
    $scope.removeMenu = function (type, index) {
        switch (type) {
            case 'appetizer':
                delete $scope.days[index].menu.appetizer;
                return;
            case 'mainCourse':
                delete $scope.days[index].menu.mainCourse;
                return;
            case 'dessert':
                delete $scope.days[index].menu.dessert;
                return;
        }
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

myApp.controller('feedbackController', function ($scope, $http) {
    $http.get(URL + '/feedback')
        .then(function (response) {
            $scope.newFeedbacks = response.data
        })

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

myApp.controller('usersController', function ($scope, $http) {
    $http.get(URL + '/users')
        .then(function (response) {
            $scope.users = response.data
        });

    $scope.sort = function (property) {
        $scope.users.sort(dynamicSort(property));
    }

    function dynamicSort(property) {
        return function (a, b) {
            var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
            return result;
        }
    }

    $scope.deleteUser = function (id, index) {
        var params = "?id=" + id;
        $http.delete(URL + '/users' + params)
            .success(function () {
                $scope.users.splice(index, 1);
            });
    }

    params = {
        username: 'Matthias',
        group: 0,
        email: 'matthias@gmail.com',
        password: 'test'
    }
    $http.post(URL + '/users?', params)
        .then(function (response) {
            if (response.data == 'done') {
                alert("done");
            }
        });
});

myApp.controller('userAddController', function ($scope) {
    $scope.group = {
        selected: 'restaurants',
        options: [
            {name: 'Restaurant', value: 'restaurants'},
            {name: 'Administrator', value: 'admins'}]
    }

    generateRandom(10);

    $scope.generatePassword = function () {
        generateRandom(10);
    }

    function generateRandom(length) {
        var password = '';
        var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

        for (var i = 0; i < length; i++)
            password += possible.charAt(Math.floor(Math.random() * possible.length));

        $scope.pwNew = password;
    }
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