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

    $scope.logIn = function (ur, action) {
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