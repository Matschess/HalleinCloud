var myApp = angular.module('myApp', ['ngRoute', 'ngCookies', 'ngDraggable', 'ngResource', 'ngSanitize']);

//var URL = 'http://46.38.236.5:443';
var URL = 'http://46.38.236.5:443';
var user;
var userType;
var restaurant = 2;

myApp.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'templates/empty.html',
            controller: 'dashboardController',
            icon: 'dashboard',
            name: 'Dashboard'
        })
        .when('/food', {
            templateUrl: 'templates/window.html',
            controller: 'foodController',
            icon: 'local_dining',
            name: 'Mahlzeiten',
            grant: [3],
            resolve: {
                'authenticate': function ($location) {
                    if (userType != 3) {
                        $location.path('/');
                    }
                }
            }
        })
        .when('/food-add', {
            templateUrl: 'templates/window.html',
            controller: 'foodAddController',
            resolve: {
                'authenticate': function ($location) {
                    if (userType != 3) {
                        $location.path('/');
                    }
                }
            }
        })
        .when('/feedback', {
            templateUrl: 'templates/switch.html',
            controller: 'feedbackController',
            icon: 'thumbs_up_down',
            name: 'Feedback',
            grant: [3],
            resolve: {
                'authenticate': function ($location) {
                    if (userType != 3) {
                        $location.path('/');
                    }
                }
            }
        })
        .when('/page', {
            templateUrl: 'templates/window.html',
            controller: 'pagesController',
            icon: 'home',
            name: 'Restaurantseite',
            grant: [3],
            resolve: {
                'authenticate': function ($location) {
                    if (userType != 3) {
                        $location.path('/');
                    }
                }
            }
        })
        .when('/app-control', {
            templateUrl: 'templates/window.html',
            controller: 'appControlController',
            icon: 'phonelink_setup',
            name: 'App-Wartung',
            grant: [1, 2],
            resolve: {
                'authenticate': function ($location) {
                    if (!(userType <= 2)) {
                        $location.path('/');
                    }
                }
            }
        })
        .when('/users', {
            templateUrl: 'templates/window.html',
            controller: 'usersController',
            icon: 'person_outline',
            name: 'Benutzer',
            grant: [1, 2],
            resolve: {
                'authenticate': function ($location) {
                    if (!(userType <= 2)) {
                        $location.path('/');
                    }
                }
            }
        })
        .when('/user-add', {
            templateUrl: 'templates/window.html',
            controller: 'userAddController',
            resolve: {
                'authenticate': function ($location) {
                    if (!(userType <= 2)) {
                        $location.path('/');
                    }
                }
            }
        })
        .when('/user-edit/:id', {
            templateUrl: 'templates/window.html',
            controller: 'userEditController',
            resolve: {
                'authenticate': function ($location) {
                    if (!(userType <= 2)) {
                        $location.path('/');
                    }
                }
            }
        })
        .when('/support', {
            templateUrl: 'templates/window.html',
            controller: 'supportController',
            icon: 'phone',
            name: 'Support',
            grant: [1],
            resolve: {
                'authenticate': function ($location) {
                    if (!(userType == 1)) {
                        $location.path('/');
                    }
                }
            }
        })
        .when('/support-add', {
            templateUrl: 'templates/window.html',
            controller: 'supportAddController',
            resolve: {
                'authenticate': function ($location) {
                    if (!(userType == 1)) {
                        $location.path('/');
                    }
                }
            }
        })
        .when('/support-edit/:id', {
            templateUrl: 'templates/window.html',
            controller: 'supportEditController',
            resolve: {
                'authenticate': function ($location) {
                    if (!(userType == 1)) {
                        $location.path('/');
                    }
                }
            }
        })
        .when('/support/bug/:id', {
            templateUrl: 'templates/window.html',
            controller: 'bugReportDetailsController',
            resolve: {
                'authenticate': function ($location) {
                    if (!(userType == 1)) {
                        $location.path('/');
                    }
                }
            }
        })
        .when('/help', {
            templateUrl: 'templates/window.html',
            controller: 'helpController',
            icon: 'help_outline',
            name: 'Hilfe',
            grant: [2, 3],
            resolve: {
                'authenticate': function ($location) {
                    if (!(userType <= 3 && userType >= 2)) {
                        $location.path('/');
                    }
                }
            }
        })
        .when('/help-add', {
            templateUrl: 'templates/window.html',
            controller: 'helpAddController',
            resolve: {
                'authenticate': function ($location) {
                    if (!(userType <= 3 && userType >= 2)) {
                        $location.path('/');
                    }
                }
            }
        })
        .when('/help-feedback-add', {
            templateUrl: 'templates/window.html',
            controller: 'helpFeedbackAddController',
            resolve: {
                'authenticate': function ($location) {
                    if (!(userType <= 3 && userType >= 2)) {
                        $location.path('/');
                    }
                }
            }
        })
        .when('/bugreport', {
            templateUrl: 'templates/window.html',
            controller: 'bugReportController',
            resolve: {
                'authenticate': function ($location) {
                    if (!(userType <= 3 && userType >= 2)) {
                        $location.path('/');
                    }
                }
            }
        })
        .otherwise({
            redirectTo: "/"
        });
});

myApp.service('loginHandler', function ($route, $rootScope, $location, $http, $cookies) {
    this.checkLogin = function () {
        var userdata = $cookies.get('userdata');
        if (userdata) {
            $('.wrapper').removeClass('slideUp');
            var userdata = JSON.parse(userdata);
            user = userdata.user.id;
            userType = userdata.user.type;
            $http.defaults.headers.common['x-access-token'] = userdata.token;
            $.ajaxSetup({
                headers: {'x-access-token': userdata.token}
            });
            $rootScope.loggedIn = true;
            this.getUsername();
            this.buildNavbar();
        }
    }
    this.login = function (data) {
        $('.wrapper').addClass('animate');
        setTimeout(function () {
            $route.reload();
        }, 500);
        $http.defaults.headers.common['x-access-token'] = data.token;
        $.ajaxSetup({
            headers: {'x-access-token': data.token}
        });
        user = data.user.id;
        userType = data.user.type;
        $cookies.put('userdata', JSON.stringify(data));
        $rootScope.loggedIn = true;
        this.getUsername();
        this.buildNavbar();
    }
    this.logout = function () {
        $('.wrapper').addClass('animate');
        $http.defaults.headers.common['x-access-token'] = '';
        $.ajaxSetup({
            headers: {'x-access-token': ''}
        });
        user = false;
        userType = false;
        $location.path('/');
        $cookies.remove('userdata');
        $rootScope.loggedIn = false;
        setTimeout(function () {
            $route.reload();
        }, 1000);
    }
    this.getUsername = function () {
        $http.get(URL + '/users?get=firstname&id=' + user)
            .then(function (response) {
                $rootScope.username = response.data[0].firstname;
            });
    }
    this.buildNavbar = function () {
        // Save routes in an array for navigation
        $rootScope.routes = [];
        angular.forEach($route.routes, function (route, path) {
            if (route.name) {
                if (route.grant) {
                    for (var i = 0; i < route.grant.length; i++) {
                        if (route.grant[i] == userType) {
                            $rootScope.routes.push({
                                path: path,
                                icon: route.icon,
                                name: route.name
                            });
                        }
                    }
                }
                else {
                    $rootScope.routes.push({
                        path: path,
                        icon: route.icon,
                        name: route.name
                    });
                }
            }
        });
    }
});

var serverLost;
myApp.service('LoadingInterceptor',
    ['$q', '$rootScope', '$log', '$location', '$cookies',
        function ($q, $rootScope, $log, $location, $cookies) {
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
                    console.log(rejection);
                    if (rejection.status.toString().substr(0, 1) != 4) {
                        serverConnection('disconnected');
                        serverConnection('check');
                    }
                    if (rejection.status == 401) {
                        $('.wrapper').addClass('animate');
                        user = false;
                        userType = false;
                        $location.path('/');
                        $cookies.remove('userdata');
                        $rootScope.loggedIn = false;
                        globalNotification('warning', 'Ihre Sitzung ist abgelaufen. Bitte melden Sie sich erneut an.')
                    }
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
            console.log(username);
            if (!username) {
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