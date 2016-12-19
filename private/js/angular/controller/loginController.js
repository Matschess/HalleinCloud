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

    $scope.input = {}

    $scope.logIn = function (ur, action) {
        $scope.route = routes.setup.restaurant.basicData;
        $('.wrapper').addClass('background');
    }
    $scope.complete = function (src) {
        switch (src) {
            case 'basicData':
                $scope.route = routes.setup.restaurant.address;
                break;
            case 'address':
                $scope.route = routes.setup.restaurant.openingTimes;
                break;
        }
    }
    $scope.back = function (src) {
        switch (src) {
            case 'basicData':
                $scope.route = routes.login;
                break;
            case 'address':
                $scope.route = routes.setup.restaurant.basicData;
                break;
            case 'basicData':
                $scope.route = routes.setup.restaurant.address;
                break;
        }
    }
});