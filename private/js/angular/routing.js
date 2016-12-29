var myApp = angular.module('myApp', ['ngRoute', 'ngCookies', 'ngDraggable', 'ngResource']);

//var URL = 'http://46.38.236.5:443';
var URL = 'http://46.38.236.5:443';
var user = 2;
var userType = 3;
var restaurant = 2;

switch(userType){
    case 1:
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
                .when('/app-control', {
                    templateUrl: 'templates/window.html',
                    controller: 'appControlController',
                    name: 'App-Wartung'
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
                .when('/user-edit/:id', {
                    templateUrl: 'templates/window.html',
                    controller: 'userEditController'
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
        break;
    case 2:
        myApp.config(function ($routeProvider) {
            $routeProvider
                .when('/', {
                    templateUrl: 'templates/empty.html',
                    controller: 'dashboardController',
                    icon: 'dashboard.png',
                    name: 'Dashboard'
                })
                .when('/app-control', {
                    templateUrl: 'templates/window.html',
                    controller: 'appControlController',
                    name: 'App-Wartung'
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
                .when('/user-edit/:id', {
                    templateUrl: 'templates/window.html',
                    controller: 'userEditController'
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
        break;
    case 3:
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
        break;
}

var serverLost;
myApp.service('LoadingInterceptor',
    ['$q', '$rootScope', '$log',
        function ($q, $rootScope, $log) {
            'use strict';

            return {
                request: function (config) {
                    $rootScope.loading = true;
                    return config;
                },
                requestError: function (rejection) {
                    $rootScope.loading = false;
                    $log.error('Request error:', rejection);
                    return $q.reject(rejection);
                },
                response: function (response) {
                    $rootScope.loading = false;
                    return response;
                },
                responseError: function (rejection) {
                    $rootScope.loading = false;
                    serverConnection('disconnected');
                    serverConnection('check');
                    $log.error('Response error:', rejection);
                    return $q.reject(rejection);
                }
            };
        }]);

myApp.config(['$httpProvider', function ($httpProvider) {
    $httpProvider.interceptors.push('LoadingInterceptor');
}]);

function serverConnection(job) {
    if (job == 'check') check();
    switch (job) {
        case 'check':
            check();
            break;
        case 'offline':
            $('.serverConnected').removeClass('active');
            $('.serverLost').addClass('active');
            $('.serverLost').html('Die Verbindung zum Internet ist unterbrochen');
            break;
        case 'disconnected':
            $('.serverConnected').removeClass('active');
            $('.serverLost').addClass('active');
            $('.serverLost').html('Die Verbindung zum Server wurde abgebrochen');
            setInterval(function () {
                $('.serverLost').html('Verbindungsversuch');
            }, 8000);
            setTimeout(function () {
                setInterval(function () {
                    $('.serverLost').html('Die Verbindung zum Server wurde abgebrochen');
                }, 8000);
            }, 4000);
            break;
        case 'connected':
            $('.serverLost').removeClass('active');
            $('.serverConnected').addClass('active');
            setTimeout(function () {
                $('.serverConnected').removeClass('active');
            }, 4000);
            var username = $('.user .username').html();
            if(!username){
                $.get(URL + '/users?get=firstname&id=' + user, function (data) {
                    username = data[0].firstname;
                    $('.user .username').html(username);
                });
            }
            break;
    }
    function check() {
        $.get(URL + '/', function (data) {
        }).fail(function () {
            setTimeout(check(), 10000);
        }).done(function () {
            serverConnection('connected');
        })
    }
}

// Check internet connection
window.addEventListener("offline", function (e) {
    serverConnection('offline');
});

window.addEventListener("online", function (e) {
    serverConnection('connected');
});