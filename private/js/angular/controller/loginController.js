myApp.controller('loginController', function ($scope, $route, $http, loginHandler) {
    $route.routes['/planer'] = {templateUrl: 'templates/switch.html'};
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

    $scope.login = function () {
        $('.loginwrapper').removeClass('shake');
        /*
         $scope.route = routes.setup.restaurant.basicData;
         $('.wrapper').addClass('background');
         */
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
        }, function(){
            $('.loginwrapper').addClass('animated shake');
        });
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
            case 'openingTimes':
                $scope.route = routes.setup.restaurant.address;
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