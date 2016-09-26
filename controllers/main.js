var myApp = angular.module('myApp', ['ngRoute', 'ngCookies']);

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
            actions: [
                {title: 'Hinzufügen', icon: 'add', route: '/food-add'}
            ],
            controller: 'foodController'
        })
        .when('/food-add', {
            templateUrl: 'content/food-add.html',
            actions: [
                {title: 'Speichern', icon: 'done', route: '/food'},
                {title: 'Löschen', icon: 'delete', bottom: true, route: '/food'}
            ],
            controller: 'foodAddController'
        })
        .when('/feedback', {
            templateUrl: 'content/feedback.html',
            name: 'Feedback'
        })
        .when('/page', {
            templateUrl: 'content/page.html',
            actions: [
                {title: 'Speichern', icon: 'done'},
                {title: 'Löschen', icon: 'delete', bottom: true}
            ],
            name: 'Restaurantseite'
        })
        .when('/help', {
            templateUrl: 'content/help.html',
            name: 'Hilfe'
        })
        .otherwise({
            redirectTo: "/"
        });
});

myApp.controller('mainController', function ($scope, $route, $routeParams, $http, $cookies) {

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
    }

    // Save routes in an array for navigation
    $scope.routes = [];
    angular.forEach($route.routes, function (route, path) {
        if (route.name) {
            $scope.routes.push({
                path: path,
                name: route.name
            });
        }
    });

    // Watches, if actionbar is a param
    $scope.$on('$routeChangeSuccess', function (next, current) {
        if (current.$$route.actions) {
            $scope.action = true;
            $scope.actions = current.$$route.actions;
        }
        else {
            $scope.action = false;
        }
    });

    $scope.popupLinks = [
        {name: 'Passwort ändern', icon: 'lock_outline', url: 'settings/pwChange.html'},
        {name: 'Feedback', icon: 'star', url: 'settings/feedbackSettings.html'}
    ];

    // Popup
    $scope.popupContent = 'content/settings/pwChange.html';
    $scope.openSettings = function () {
        $scope.popup = true;
    }
    $scope.popupClose = function () {
        $scope.popup = false;
    }
    $scope.popupLoad = function (url) {
        $http.get('content/' + url)
            .then(function (response) {
                $scope.popupContent = response.data;
            });
    }
});

