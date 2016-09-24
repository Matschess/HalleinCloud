var myApp = angular.module('myApp', ['ngRoute', 'ngSanitize', 'ngCookies']);

myApp.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'content/dashboard.html',
            name: 'Dashboard',
            controller: 'dashboardController'
        })
        .when('/food', {
            templateUrl: 'content/food.html',
            name: 'Mahlzeiten',
            controller: 'foodController'
        })
        .when('/feedback', {
            templateUrl: 'content/feedback.html',
            name: 'Feedback',
            controller: 'feedbackController'
        })
        .when('/page', {
            templateUrl: 'content/page.html',
            name: 'Restaurantseite',
            controller: 'feedbackController'
        })
        .when('/help', {
            templateUrl: 'content/help.html',
            name: 'Hilfe',
            controller: 'feedbackController'
        })
        .otherwise({
            redirectTo: "/"
        });
});



myApp.controller('dashboardController', function ($scope) {
    $scope.message = 'Look! I am an about page.';
});

myApp.controller('foodController', function ($scope) {
    alert("tet");
});

myApp.controller('feedbackController', function ($scope) {
    $scope.message = 'Contact us! JK. This is just a demo.';
});


myApp.controller('NavigationController', function ($scope, $route, $http, $cookies) {
    $scope.routes = [];
    angular.forEach($route.routes, function (route, path) {
        if (route.name) {
            $scope.routes.push({
                path: path,
                name: route.name
            });
        }
    });
    console.log($scope.routes);

    $scope.popupLinks = [
        {name: 'Passwort ändern', icon: 'lock_outline', url: 'settings/pwChange.html'},
        {name: 'Feedback', icon: 'star', url: 'settings/feedbackSettings.html'}
    ];
    var url;
    if ($cookies.get('view')) {
        url = $cookies.get('view');
    }
    else {
        url = $scope.links[0].url;
    }

    $scope.loggedIn = true;
    $scope.logIn = function (url, action) {
        $scope.loggedIn = true;
    }

    $scope.logOut = function (url, action) {
        $scope.loggedIn = false;
    }

    $http.get('content/' + url)
        .then(function (response) {
            $scope.content = response.data;
        });
    $scope.action;

    $scope.openSettings = function () {
        $scope.popup = true;
    }
    $scope.popupClose = function () {
        $scope.popup = false;
    }
    $scope.load = function (url, action) {
        if (action) {
            $scope.action = true;
        }
        else {
            $scope.action = false;
        }
        $http.get('content/' + url)
            .then(function (response) {
                $scope.content = response.data;
                $cookies.put('view', url);
            });
    }
    $scope.popupLoad = function (url) {
        $http.get('content/' + url)
            .then(function (response) {
                $scope.popupContent = response.data;
            });
    }
});