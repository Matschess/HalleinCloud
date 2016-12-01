var myApp = angular.module('myApp', ['ngRoute', 'ngCookies', 'ngDraggable', 'ngResource']);

//var URL = 'http://46.38.236.5:3000';
var URL = 'http://46.38.236.5:3000';
var user = 2;
var restaurant = 2;

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

myApp.service('LoadingInterceptor',
    ['$q', '$rootScope', '$log',
        function($q, $rootScope, $log) {
            'use strict';

            return {
                request: function(config) {
                    $rootScope.loading = true;
                    return config;
                },
                requestError: function(rejection) {
                    $rootScope.loading = false;
                    $log.error('Request error:', rejection);
                    return $q.reject(rejection);
                },
                response: function(response) {
                    $rootScope.loading = false;
                    return response;
                },
                responseError: function(rejection) {
                    $rootScope.loading = false;
                    $log.error('Response error:', rejection);
                    return $q.reject(rejection);
                }
            };
        }]);
myApp.config(['$httpProvider', function($httpProvider) {
    $httpProvider.interceptors.push('LoadingInterceptor');
}]);