myApp.controller('loginController', function ($scope, $route, $http, loginHandler) {
    loginHandler.buildNavbar();

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
                },
                options: {
                    title: 'Einrichtung - Schritt 4',
                    content: 'content/setup/restaurants/options.html'
                },
                payments: {
                    title: 'Einrichtung - Schritt 5',
                    content: 'content/setup/restaurants/payments.html'
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
            $scope.route = routes.setup.restaurant.basicData;
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
        }
    }
    $scope.back = function (src) {
        switch (src) {
            case 'basicData':
                $scope.route = routes.login;
                $('document').ready(function () {
                    $('.username').focus();
                });
                $('.wrapper').removeClass('background');
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