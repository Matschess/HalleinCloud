var myApp = angular.module('myApp', ['ngRoute', 'ngCookies', 'ngDraggable']);

//var URL = 'http://46.38.236.5:3000';
var URL = 'http://localhost:3000';
var user = 57;
var restaurant = 57;

myApp.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'templates/empty.html',
            controller: 'dashboardController',
            icon: 'dashboard.png',
            name: 'Dashboard'
        })
        .when('/food', {
            templateUrl: 'templates/window.html',
            controller: 'foodController',
            name: 'Mahlzeiten'
        })
        .when('/food-add', {
            templateUrl: 'templates/window.html',
            controller: 'foodAddController'
        })
        .when('/feedback', {
            templateUrl: 'templates/switch.html',
            controller: 'feedbackController',
            icon: 'feedback.png',
            name: 'Feedback'
        })
        .when('/page', {
            templateUrl: 'templates/window.html',
            controller: 'pagesController',
            name: 'Restaurantseite'
        })
        .when('/users', {
            templateUrl: 'templates/window.html',
            controller: 'usersController',
            name: 'Benutzer'
        })
        .when('/user-add', {
            templateUrl: 'templates/window.html',
            controller: 'userAddController'
        })
        .when('/help', {
            templateUrl: 'templates/window.html',
            controller: 'helpController',
            icon: 'help.png',
            name: 'Hilfe'
        })
        .otherwise({
            redirectTo: "/"
        });
});