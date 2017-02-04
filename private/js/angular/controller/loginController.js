myApp.controller('loginController', function ($scope, $route, $http, loginHandler) {
    loginHandler.buildNavbar();

    var routes = {
        login: {
            title: 'Hallein App - Verwaltung',
            subtitle: 'Anmelden',
            aboutUs: true,
            content: 'content/login.html'
        },
        setup: {
            everyone: {
                password: {
                    title: 'Einrichtung',
                    subtitle: 'Sicherheit',
                    content: 'content/setup/password.html'
                },
            },
            restaurant: {
                basicData: {
                    title: 'Einrichtung',
                    subtitle: 'Allgemein',
                    content: 'content/setup/restaurants/basicData.html'
                },
                address: {
                    title: 'Einrichtung',
                    subtitle: 'Adress- & Kontaktdaten',
                    content: 'content/setup/restaurants/address.html'
                },
                openingTimes: {
                    title: 'Einrichtung',
                    subtitle: 'Öffnungszeiten',
                    content: 'content/setup/restaurants/openingTimes.html'
                },
                options: {
                    title: 'Einrichtung',
                    subtitle: 'Weiteres',
                    content: 'content/setup/restaurants/options.html'
                },
                payments: {
                    title: 'Einrichtung',
                    subtitle: 'Zahlungsmethoden',
                    content: 'content/setup/restaurants/payments.html'
                },
                completed: {
                    title: "We're ready!",
                    content: 'content/setup/restaurants/completed.html'
                }
            },

        }
    };

    $scope.route = routes.login;

    $scope.input = {}

    $scope.login = function () {
        $('.loginwrapper').removeClass('shake');
        /*
         $scope.route = routes.setup.restaurant.basicData;
         $('.wrapper').addClass('background');
         */
        if (!$scope.input.username || $scope.input.username == 'bellapalma') {
            $scope.route = routes.setup.everyone.password;
            $('.wrapper').addClass('background');
        }
        else {
            var data = {
                username: $scope.input.username,
                password: $scope.input.password
            }
            data = prepareUpload(data);
            $http({
                url: URL + '/authenticate',
                method: 'GET',
                params: data
            }).then(function (response) {
                loginHandler.login(response.data);
            }, function () {
                $('.loginwrapper').addClass('animated shake');
            });
        }
    }
    $scope.complete = function (src) {
        switch (src) {
            case 'password':
                $scope.route = routes.setup.restaurant.basicData;
                break;
            case 'basicData':
                $scope.route = routes.setup.restaurant.address;
                break;
            case 'address':
                $scope.route = routes.setup.restaurant.openingTimes;
                break;
            case 'openingTimes':
                $scope.route = routes.setup.restaurant.options;
                break;
            case 'options':
                $scope.route = routes.setup.restaurant.payments;
                break;
            case 'payments':
                $scope.route = routes.setup.restaurant.completed;
                break;
        }
    }
    $scope.back = function (src) {
        switch (src) {
            case 'password':
                $scope.route = routes.login;
                $('document').ready(function () {
                    $('.username').focus();
                });
                $('.wrapper').removeClass('background');
                break;
            case 'basicData':
                $scope.route = routes.setup.everyone.password;
                break;
            case 'address':
                $scope.route = routes.setup.restaurant.basicData;
                break;
            case 'openingTimes':
                $scope.route = routes.setup.restaurant.address;
                break;
            case 'options':
                $scope.route = routes.setup.restaurant.openingTimes;
                break;
            case 'payments':
                $scope.route = routes.setup.restaurant.options;
                break;

        }
    }

    $scope.days = [
        {id: 1, shorthand: 'Mo'},
        {id: 2, shorthand: 'Di'},
        {id: 3, shorthand: 'Mi'},
        {id: 4, shorthand: 'Do'},
        {id: 5, shorthand: 'Fr'},
        {id: 6, shorthand: 'Sa'},
        {id: 7, shorthand: 'So'}
    ]

    $scope.sleep = function (index) {
        $scope.days[index].sleep = !$scope.days[index].sleep;
    }
});