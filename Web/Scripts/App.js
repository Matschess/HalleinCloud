var URL = 'http://46.38.236.5:443';
var user;
var userType;
var restaurant;
var halleinApp = angular.module('halleinApp', [
    'ngRoute',
    'pascalprecht.translate',
    'ngCookies',
    'ngDraggable',
    'ngResource',
    'ngSanitize',
    'ngDialog',
    'ngImgCrop',
    'ngFlatDatepicker'
]);
halleinApp.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'Web/Templates/Empty.html',
            controller: 'HomeController',
            icon: 'dashboard',
            name: 'DASHBOARD'
        })
        .when('/meal', {
            templateUrl: 'Web/Templates/Window.html',
            controller: 'MealsController',
            icon: 'local_dining',
            name: 'MEALS',
            grant: [3],
            resolve: {
                'authenticate': function ($location) {
                    if (userType != 3) {
                        $location.path('/');
                    }
                }
            }
        })
        .when('/meal/add/:mealtype', {
            templateUrl: 'Web/Templates/Window.html',
            controller: 'MealsAddController',
            resolve: {
                'authenticate': function ($location) {
                    if (userType != 3) {
                        $location.path('/');
                    }
                }
            }
        })
        .when('/feedback', {
            templateUrl: 'Web/Templates/Switch.html',
            controller: 'FeedbackController',
            icon: 'thumbs_up_down',
            name: 'FEEDBACK',
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
            templateUrl: 'Web/Templates/Tabs.html',
            controller: 'RestaurantController',
            icon: 'home',
            name: 'RESTAURANTPAGE',
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
            templateUrl: 'Web/Templates/Window.html',
            controller: 'AppController',
            icon: 'phonelink_setup',
            name: 'APP-MAINTENANCE',
            grant: [1, 2],
            resolve: {
                'authenticate': function ($location) {
                    if (!(userType <= 2)) {
                        $location.path('/');
                    }
                }
            }
        })
        .when('/user', {
            templateUrl: 'Web/Templates/Window.html',
            controller: 'UsersController',
            icon: 'person_outline',
            name: 'USERS',
            grant: [1, 2],
            resolve: {
                'authenticate': function ($location) {
                    if (!(userType <= 2)) {
                        $location.path('/');
                    }
                }
            }
        })
        .when('/user/add', {
            templateUrl: 'Web/Templates/Window.html',
            controller: 'UsersAddController',
            resolve: {
                'authenticate': function ($location) {
                    if (!(userType <= 2)) {
                        $location.path('/');
                    }
                }
            }
        })
        .when('/user/edit/:id', {
            templateUrl: 'Web/Templates/Window.html',
            controller: 'UsersEditController',
            resolve: {
                'authenticate': function ($location) {
                    if (!(userType <= 2)) {
                        $location.path('/');
                    }
                }
            }
        })
        .when('/support', {
            templateUrl: 'Web/Templates/Window.html',
            controller: 'SupportController',
            icon: 'phone',
            name: 'SUPPORT',
            grant: [1],
            resolve: {
                'authenticate': function ($location) {
                    if (!(userType == 1)) {
                        $location.path('/');
                    }
                }
            }
        })
        .when('/support/add', {
            templateUrl: 'Web/Templates/Window.html',
            controller: 'SupportAddController',
            resolve: {
                'authenticate': function ($location) {
                    if (!(userType == 1)) {
                        $location.path('/');
                    }
                }
            }
        })
        .when('/support/edit/:id', {
            templateUrl: 'Web/Templates/Window.html',
            controller: 'SupportEditController',
            resolve: {
                'authenticate': function ($location) {
                    if (!(userType == 1)) {
                        $location.path('/');
                    }
                }
            }
        })
        .when('/support/bug/:id', {
            templateUrl: 'Web/Templates/Window.html',
            controller: 'SupportBugController',
            resolve: {
                'authenticate': function ($location) {
                    if (!(userType == 1)) {
                        $location.path('/');
                    }
                }
            }
        })
        .when('/help', {
            templateUrl: 'Web/Templates/Window.html',
            controller: 'HelpController',
            icon: 'help_outline',
            name: 'HELP',
            grant: [2, 3],
            resolve: {
                'authenticate': function ($location) {
                    if (!(userType <= 3 && userType >= 2)) {
                        $location.path('/');
                    }
                }
            }
        })
        .when('/help/add', {
            templateUrl: 'Web/Templates/Window.html',
            controller: 'HelpAddController',
            resolve: {
                'authenticate': function ($location) {
                    if (!(userType <= 3 && userType >= 2)) {
                        $location.path('/');
                    }
                }
            }
        })
        .when('/help/feedback', {
            templateUrl: 'Web/Templates/Window.html',
            controller: 'HelpFeedbackController',
            resolve: {
                'authenticate': function ($location) {
                    if (!(userType <= 3 && userType >= 2)) {
                        $location.path('/');
                    }
                }
            }
        })
        .when('/help/bugreport', {
            templateUrl: 'Web/Templates/Window.html',
            controller: 'HelpBugController',
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
halleinApp.service('LoadingInterceptor',
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

halleinApp.config(['$httpProvider', function ($httpProvider) {
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
halleinApp.config(['ngDialogProvider', function (ngDialogProvider) {
    ngDialogProvider.setDefaults({
        template: 'templates/dialog.html',
        className: 'ngdialog-theme-plain',
        appendTo: '.wrapper',
        showClose: false,
        closeByNavigation: true
    });
}]);
halleinApp.service('LoginService', function ($route, $rootScope, $location, $http, $cookies) {
    this.checkLogin = function () {
        var userdata = $cookies.get('userdata');
        if (userdata) {
            $('.wrapper').removeClass('slideUp');
            var userdata = JSON.parse(userdata);
            user = userdata.user.id;
            userType = userdata.user.type;
            if (userType == 3) {
                restaurant = userdata.restaurant.id;
            }
            $http.defaults.headers.common['x-access-token'] = userdata.token;
            $.ajaxSetup({
                headers: {'x-access-token': userdata.token}
            });
            $rootScope.loggedIn = true;
            this.getUsername();
            this.buildNavbar();
        }
        else {
            $('document').ready(function () {
                $('.username').focus();
            });
        }

    }
    this.login = function (data) {
        $('.wrapper').addClass('animate');

        $http.defaults.headers.common['x-access-token'] = data.token;
        $.ajaxSetup({
            headers: {'x-access-token': data.token}
        });
        user = data.user.id;
        userType = data.user.type;
        if (userType == 3) {
            restaurant = data.restaurant.id;
        }
        console.log(restaurant);
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
        restaurant = false;
        $location.path('/');
        $cookies.remove('userdata');
        $rootScope.loggedIn = false;
        $('document').ready(function () {
            $('.username').focus();
        });
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
halleinApp.config(['$translateProvider', function ($translateProvider) {
    $translateProvider.useStaticFilesLoader({
        prefix: 'Web/Languages/',
        suffix: '.json'
    });
    $translateProvider.preferredLanguage('de_AT');
}]);

halleinApp.service('translateService', function ($rootScope, $translate, $cookies) {
    this.translate = function () {
        var id = $cookies.get('lang');
        $translate.use(id);
        if(id) $translate.use(id);
        else {
            $translate.use('de_AT');
            var exp = new Date();
            exp.setDate(exp.getDate() + 1825);
            $cookies.put('lang', 'de_AT', {
                expires: exp
            });
        }
        $rootScope.lang = id;
    }
    this.setLang = function(id) {
        $translate.use(id);
        var exp = new Date();
        exp.setDate(exp.getDate() + 1825);
        $cookies.put('lang', id, {
            expires: exp
        });
        $rootScope.lang = id;
    }
});
tooltipstln();

function isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}
function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}
function tooltipstln() {
    $('.content').ready(function () {
        $('.tooltip').tooltipster({
            theme: ['tooltipster-noir', 'tooltipster-noir-customized'],
            side: 'left',
            arrow: false,
            delay: 100,
            animationDuration: 200,
            debug: false
        });
        $('.tooltipTop').tooltipster({
            theme: ['tooltipster-noir', 'tooltipster-noir-customized'],
            side: 'top',
            arrow: false,
            delay: 100,
            animationDuration: 200,
            debug: false
        });
        $('.tooltipRight').tooltipster({
            theme: ['tooltipster-noir', 'tooltipster-noir-customized'],
            side: 'right',
            arrow: false,
            delay: 100,
            animationDuration: 200,
            debug: false
        });
        $('.tooltipBottom').tooltipster({
            theme: ['tooltipster-noir', 'tooltipster-noir-customized'],
            side: 'bottom',
            arrow: false,
            delay: 100,
            animationDuration: 200,
            debug: false
        });
        $('.tooltipLight').tooltipster({
            theme: ['tooltipster-light', 'tooltipster-light-customized'],
            side: 'top',
            arrow: false,
            delay: 100,
            animationDuration: 200,
            debug: false
        });
    });
}

function stringToDate(date) {
    var day = date.substr(0, 2);
    var month = date.substr(3, 2);
    var year = date.substr(6);
    date = new Date(year, month - 1, day);
    return date;
}

function dateToString(date) {
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    date = year + '-' + month + '-' + day
    return date;
}

function datepicker() {
    $('.content').ready(function () {
        $('.datepicker').datepicker({
                prevText: 'Zurück', prevStatus: '',
                prevJumpText: '&#x3c;&#x3c;', prevJumpStatus: '',
                nextText: 'Vor', nextStatus: '',
                nextJumpText: '&#x3e;&#x3e;', nextJumpStatus: '',
                currentText: 'heute', currentStatus: '',
                todayText: 'heute', todayStatus: '',
                clearText: '-', clearStatus: '',
                closeText: 'schließen', closeStatus: '',
                monthNames: ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni',
                    'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'],
                monthNamesShort: ['Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun',
                    'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'],
                dayNames: ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'],
                dayNamesShort: ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'],
                dayNamesMin: ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'],
                weekHeader: 'KW',
                minDate: 0,
                showWeek: true,
                firstDay: 1,
                dateFormat: 'dd.mm.yy',
                altField: "#venue_date",
                altFormat: "yy-mm-dd",
            }
        );
    });
}

function selectln() {
    $('.content').ready(function () {
        $('select').select2({
            width: '180px',
            minimumResultsForSearch: Infinity
        }); // For select boxes

        $('select.search').select2({
            width: '180px'
        }); // For select boxes
    });
}

var globalNotificationsTimeout;
function globalNotification(type, text) {
    clearTimeout(globalNotificationsTimeout);
    $('.globalNotification').addClass('visible');
    $('.globalNotification').removeClass('success warning error');
    switch (type) {
        case 'success':
            $('.globalNotification').addClass('success');
            break;
        case 'warning':
            $('.globalNotification').addClass('warning');
            break;
        case 'loginWarn':
            $('.globalNotification').addClass('loginWarn');
            break;
        case 'error':
            $('.globalNotification').addClass('error');
            if (!text) text = 'Fehler';
            break;
    }
    $('.globalNotification').html(text);
    var width = $('.globalNotification').outerWidth();
    $('.globalNotification').css('left', 'calc(50% - ' + width / 2 + 'px)');
    $('.globalNotification').click(function () {
        $('.globalNotification').removeClass('visible');
    })
    globalNotificationsTimeout = setTimeout(function () {
        $('.globalNotification').removeClass('visible');
    }, 3000);
}

function prepareUpload(data) {
    var result = {};
    var value;
    for (var propertyName in data) {
        value = String(data[propertyName]).trim();
        if (!value) value = 'null';
        if (value == 'undefined') continue;
        result[propertyName] = value;
    }
    return result;
}

$('.content').ready(function () {
    $('.topbar .hamburger').click(function () {
        $('.hamburger').toggleClass('open');
        $('.navbar').toggleClass('visible');
    });
    $('.navbar ul a li').click(function () {
        $('.hamburger').removeClass('open');
        $('.navbar').removeClass('visible');
    });
});
halleinApp.controller('LoginController', function ($scope, $route, translateService, $http, LoginService) {
    LoginService.buildNavbar();

    var routes = {
        login: {
            title: 'Cloud',
            aboutUs: true,
            content: 'Web/Content/Login.html'
        },
        pwForgot: {
            request: {
                title: 'RESET-PASSWORD',
                subtitle: 'SU-PASSWORD-RESET-REQUEST-SUBTITLE',
                content: 'content/pwForgot/request.html'
            },
            confirm: {
                title: 'RESET-PASSWORD',
                subtitle: 'SU-PASSWORD-RESET-CONFIRM-SUBTITLE',
                content: 'content/pwForgot/confirm.html'
            },
            password: {
                title: 'RESET-PASSWORD',
                subtitle: 'SU-PASSWORD-RESET-PASSWORD-SUBTITLE',
                content: 'content/pwForgot/password.html'
            },
            success: {
                title: 'RESET-PASSWORD',
                subtitle: "SU-PASSWORD-RESET-SUCCESS-SUBTITLE",
                content: 'content/pwForgot/success.html'
            }
        },
        setup: {
            everyone: {
                welcome: {
                    title: 'HELLO',
                    subtitle: 'SU-WELCOME-SUBTITLE',
                    content: 'content/setup/welcome.html'
                },
                password: {
                    title: 'SECURITY',
                    subtitle: 'SU-SECURITY-SUBTITLE',
                    content: 'content/setup/password.html'
                },
            },
            restaurant: {
                basicData: {
                    title: 'RESTAURANTDATA',
                    subtitle: 'SU-RESTAURANTDATA-SUBTITLE',
                    content: 'content/setup/restaurants/basicData.html'
                },
                address: {
                    title: 'ADDRESS-AND-CONTACT',
                    subtitle: 'SU-ADDRESS-AND-CONTACT-SUBTITLE',
                    content: 'content/setup/restaurants/address.html'
                },
                openingTimes: {
                    title: 'OPENINGTIMES',
                    subtitle: 'SU-OPENINGTIMES-SUBTITLE',
                    content: 'content/setup/restaurants/openingTimes.html'
                },
                options: {
                    title: 'OPTIONS',
                    subtitle: 'SU-OPTIONS-SUBTITLE',
                    content: 'content/setup/restaurants/options.html'
                },
                payments: {
                    title: 'Einrichtung',
                    subtitle: 'Zahlungsmethoden',
                    content: 'content/setup/restaurants/payments.html'
                },
                completed: {
                    title: "Fertig!",
                    subtitle: 'Die Einrichtung ist abgeschlossen.',
                    content: 'content/setup/restaurants/completed.html'
                }
            },

        }
    };

    $scope.route = routes.login;

    $scope.input = {}

    $scope.changeLang = function (lang_id) {
        translateService.setLang(lang_id)
    }

    $scope.login = function () {
        $('.loginWrapper').removeClass('shake');
        var username = $scope.input.username;
        var password = $scope.input.password;
        if(username && password) {
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
                var response = response.data;
                if (response.user.initialLogin) {
                    console.log(response);
                    $scope.route = routes.setup.everyone.welcome;
                    // Token
                    $http.defaults.headers.common['x-access-token'] = response.token;
                    $.ajaxSetup({
                        headers: {'x-access-token': response.token}
                    });
                    // User
                    user = response.user.id;
                    userType = response.user.type;
                    // Get restaurants
                    var data = {
                        user: user
                    }
                    $http({
                        url: URL + '/restaurants?get=id,restaurantname',
                        method: 'GET',
                        params: data
                    }).then(function (response) {
                        $scope.setup = {input: response.data[0]};
                        console.log($scope.setup);
                    });
                    $('.wrapper').addClass('background');
                } else {
                    LoginService.login(response);
                }
            }, function () {
                $('.loginWrapper').addClass('animated shake');
            });
        }
        else {
            $('.loginWrapper').addClass('animated shake');
        }
    }

    $scope.complete = function (src) {
        switch (src) {
            case 'pwReset':
                $scope.route = routes.pwForgot.request;
                $scope.pwForgot = {input: {}};
                break;
            case 'pwReset/request':


                var email = $scope.pwForgot.input.email;
                if (email && validateEmail(email)) {
                    $scope.route = routes.pwForgot.confirm;
                    var data = {
                        email: $scope.pwForgot.input.email
                    }
                    $http({
                        url: URL + '/pwforgot',
                        method: 'PUT',
                        params: data
                    }).then();
                }
                else globalNotification('warning', 'Bitte gültige Email eingeben')
                break;
            case 'pwReset/confirm':
                var email = $scope.pwForgot.input.email;
                var pin = $scope.pwForgot.input.pin;
                if (email && pin) {
                    var data = {
                        email: $scope.pwForgot.input.email,
                        pin: pin
                    }
                    $http({
                        url: URL + '/pwforgot',
                        method: 'GET',
                        params: data
                    }).then(function () {
                        $scope.route = routes.pwForgot.password;
                    }, function () {
                        globalNotification('loginWarn', 'Die PIN ist leider nicht gültig')
                    });
                }
                break;
            case 'pwReset/password':
                var email = $scope.pwForgot.input.email;
                var pin = $scope.pwForgot.input.pin;
                var passwordNew = $scope.pwForgot.input.password;
                var passwordRepeat = $scope.pwForgot.input.passwordRepeat;
                if (email && pin && passwordNew) {
                    if (passwordNew == passwordRepeat) {
                        var data = {
                            email: $scope.pwForgot.input.email,
                            pin: pin,
                            passwordNew: passwordNew
                        }
                        $http({
                            url: URL + '/pwchange',
                            method: 'PUT',
                            params: data
                        }).then(function () {
                            $scope.route = routes.pwForgot.success;
                        });
                    }
                    else {
                        globalNotification('loginWarn', 'Die Passwörter stimmen nicht überein')
                    }
                }
                else{
                    globalNotification('loginWarn', 'Bitte vervollständigen Sie Ihre Daten')
                }
                break;
            case 'pwReset/success':
                $scope.route = routes.login;
                break;
            case 'welcome':
                $scope.route = routes.setup.everyone.password;
                break;
            case 'password':
                if (!$scope.setup.input.password) globalNotification('loginWarn', 'Bitte geben Sie ein neues Passwort ein')
                else if ($scope.setup.input.password != $scope.setup.input.passwordRepeat) globalNotification('loginWarn', 'Die Passwörter stimmen nicht überein')
                else $scope.route = routes.setup.restaurant.basicData;
                break;
            case 'basicData':
                if (!$scope.setup.input.restaurantname || !$scope.setup.input.description || !$scope.setup.input.description_en) globalNotification('loginWarn', 'Bitte vervollständigen Sie Ihre Daten')
                    else $scope.route = routes.setup.restaurant.address;
                break;
            case 'address':
                if(!$scope.setup.input.street || !$scope.setup.input.houseNumber || !$scope.setup.input.countryCode || !$scope.setup.input.country || !$scope.setup.input.email || !$scope.setup.input.tel) globalNotification('warning', 'Bitte vervollständigen Sie Ihre Daten')
               else if (!isNumber($scope.setup.input.countryCode))  globalNotification('loginWarn', 'Bitte gültige PLZ eingeben')
                    else if (!validateEmail($scope.setup.input.email)) globalNotification('loginWarn', 'Bitte gültige Email eingeben')

                else $scope.route = routes.setup.restaurant.openingTimes;

                break;
            case 'openingTimes':
                $scope.route = routes.setup.restaurant.options;
                break;
            case 'options':
                $scope.route = routes.setup.restaurant.payments;
                break;
            case 'payments':
                var input = $scope.setup.input;
                if (input) {
                    var data = {
                        id: input.id,
                        restaurantname: input.restaurantname,
                        description: input.description,
                        description_en: input.description_en,
                        street: input.street,
                        houseNumber: input.houseNumber,
                        countryCode: input.countryCode,
                        country: input.country,
                        email: input.email,
                        tel: input.tel,
                        website: input.website
                    }
                    $http({
                        url: URL + '/restaurants',
                        method: 'PUT',
                        params: data
                    }).then(function () {
                        $scope.route = routes.setup.restaurant.completed;
                    });
                }
                break;
            case 'completed':
                $scope.route = routes.login;
                break;
        }
    }
    $scope.back = function (src) {
        switch (src) {
            case 'password':
                $scope.route = routes.setup.everyone.welcome;
                break;
            case 'pwReset/request':
                $scope.route = routes.login;
                $('document').ready(function () {
                    $('.username').focus();
                });
                $('.wrapper').removeClass('background');
                break;
            case 'pwReset/confirm':
                $scope.route = routes.pwForgot.request;
                break;
            case 'pwReset/password':
                $scope.route = routes.pwForgot.confirm;
                break;
            case 'welcome':
                $scope.route = routes.login;
                break;
            case 'basicData':
                $scope.route = routes.setup.everyone.password;
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
halleinApp.controller('MainController', function ($scope, $rootScope, $route, $location, $routeParams, $http, translateService, LoginService) {
    translateService.translate();

    $scope.$on('$viewContentLoaded', function(){
        console.log('loaded');
    });

    // System-Infos
    $scope.system = {
        version: '0.0.0',
        versionName: "Ain't nobody got time for that",
        released: '',
        copyright: '2017 by Matthias Lang, Maximilian Hölzl, Thomas Steiner'
    };

    $scope.checkKey = function ($event) {
        if ($event.keyCode == 27) {
            $scope.popupClose();
        }
    }

    // Check for existing login
    LoginService.checkLogin();
    $scope.logout = function () {
        LoginService.logout();
    }

    // Route-Change
    $scope.$on('$routeChangeStart', function ($rootScope) {
        $rootScope.loading = false;
    });
    $scope.$on('$routeChangeSuccess', function (next, current, $rootScope) {
        var frameParams = current.$$route.frame;
        if (frameParams) {
            switch (frameParams.type) {
                case 'fullBox':
                    $scope.frame = {
                        type: 'fullBox',
                        title: frameParams.title,
                        actions: frameParams.actions,
                    }
                    break;
                case 'switchBox':
                    $scope.frame = {
                        type: 'switchBox',
                        title: frameParams.title,
                        switched: 1,
                        switcher: frameParams.switcher
                    }
                    break;
            }
        }
        else {
            $scope.frame = false;
        }
        $rootScope.loading = false;
    });

    // Active links in navbar
    $scope.isActive = function (location) {
        var active = (location === '/' + $location.path().split('/')[1]);
        return active;
    };

    // Popup
    var settingsLinks = [
        {name: 'PROFILE', icon: 'person_outline', url: 'settings/profileSettings.html'},
        {name: 'CHANGE-PASS', icon: 'lock_outline', url: 'settings/pwChange.html'},
        {name: 'LANGUAGE', icon: 'language', url: 'settings/language.html'}
    ];
    $scope.openSettings = function () {
        $scope.popup = {
            title: 'SETTINGS',
            links: settingsLinks,
            content: 'content/' + settingsLinks[0].url,
            actions: settingsLinks[0].actions
        }
    }
    $scope.popupLoad = function (index) {
        $scope.popup.content = 'content/' + $scope.popup.links[index].url;
    }
    $scope.popupClose = function () {
        $scope.popup = false;
    }
});
halleinApp.controller('LanguageSettingsController', function ($scope, $translate, translateService) {
    $scope.languages = {
        selected: {},
        options: [
            {id: 'de_AT', name: 'GERMAN'},
            {id: 'en_US', name: 'ENGLISH'}
        ]
    }

    $scope.languages.selected = $scope.languages.options.filter(function( obj ) {
        return obj.id == $translate.use();
    })[0];

    $scope.save = function () {
        translateService.setLang($scope.languages.selected.id)
        globalNotification('success', 'SUCC-CHANGED-LANG');
    }
});
halleinApp.controller('ProfileSettingsController', function ($scope, $rootScope, $http) {
    $http.get(URL + '/users?get=firstname,lastname,email&id=' + user)
        .then(function (response) {
            $scope.input = response.data[0];
        });

    $scope.save = function () {
        if ($scope.input.firstname && $scope.input.lastname) {
            var data = {
                id: user,
                firstname: $scope.input.firstname,
                lastname: $scope.input.lastname,
                email: $scope.input.email
            }
            data = prepareUpload(data);
            $http({
                url: URL + '/users',
                method: 'PUT',
                params: data
            }).then(function () {
                    globalNotification('success', 'Die Daten wurden gespeichert.');
                    $rootScope.username = $scope.input.firstname;
                },
                function () {
                    globalNotification('error')
                });
        }
        else {
            globalNotification('warning', 'Bitte geben Sie alle Daten ein.')
        }
    }
});
halleinApp.controller('PasswordSettingsController', function ($scope, $http) {
    $scope.input = {};

    $scope.pwValidate = function (pwNew) {
        var pwNew = pwNew.toString();
        $scope.pwSafety = 0;
        if (pwNew.length) {
            $scope.pwSafety++;
        }
        if (pwNew.match(".{8}[a-z]")) {
            $scope.pwSafety++;
        }
        if (pwNew.match("[0-9]?[A-Z]")) {
            $scope.pwSafety++;
        }
        if (pwNew.match("[!\"§$%&/()=?]")) {
            $scope.pwSafety++;
        }
    }

    $scope.save = function () {
        if ($scope.input.pwOld && $scope.input.pwNew && $scope.input.pwRepeat) {
            if ($scope.input.pwNew == $scope.input.pwRepeat) {
                var data = {
                    id: user,
                    passwordOld: $scope.input.pwOld,
                    passwordNew: $scope.input.pwNew
                }
                data = prepareUpload(data);
                $http({
                    url: URL + '/pwchange',
                    method: 'PUT',
                    params: data
                }).then(function () {
                        globalNotification('success', 'Das Passwort wurde geändert.');
                        $scope.input = {};
                        $scope.pwSafety = 0;
                    },
                    function (response) {
                        if (response.status == 404) {
                            globalNotification('error', 'Das alte Passwort ist nicht korrekt.');
                        }
                        else globalNotification('error');
                    });
            }
            else  globalNotification('warning', 'Die Passwörter stimmen nicht überein.')
        }
        else  globalNotification('warning', 'Bitte geben Sie alle Daten ein.')
    }
});
halleinApp.controller('AppController', function ($scope, $http) {
    $scope.config = {
        title: 'App',
        content: 'Web/Content/App.html'
    }

    $scope.input = {
        appStatus: true
    }

    $scope.activeUsers = 568;
    $scope.downloads = {
        android: 312,
        iOS: 458,
        windows: 50
    }
});
halleinApp.controller('FeedbackController', function ($scope, $location, $http) {
    $scope.config = {
        title: 'Feedback',
        switches: [
            {
                name: 'NEW',
                url: 'new'
            },
            {
                name: 'ACCEPTED',
                url: 'accepted'
            },
            {
                name: 'DECLINED',
                url: 'declined'
            }
        ],
        content: 'Web/Content/Feedback.html'
    }

    switch ($location.hash()) {
        case 'new':
            $scope.config.switched = 1;
            $http.get(URL + '/feedback?get=id,rating,subject,text&status=1&restaurant=' + restaurant)
                .then(function (response) {
                    $scope.newFeedbacks = response.data;
                })
            break;
        case 'accepted':
            $scope.config.switched = 2;
            $http.get(URL + '/feedback?get=id,rating,subject,text&status=2&restaurant=' + restaurant)
                .then(function (response) {
                    $scope.acceptedFeedbacks = response.data;
                })
            break;
        case 'declined':
            $scope.config.switched = 3;
            $http.get(URL + '/feedback?get=id,rating,subject,text&status=3&restaurant=' + restaurant)
                .then(function (response) {
                    $scope.declinedFeedbacks = response.data;
                })
            break;
        default:
            $scope.config.switched = 1;
            $http.get(URL + '/feedback?get=id,rating,subject,text&status=1&restaurant=' + restaurant)
                .then(function (response) {
                    $scope.newFeedbacks = response.data;
                })
    }

    $scope.input = {};

    $http.get(URL + '/restaurants?get=autoAcceptFeedback&id=' + restaurant)
        .then(function (response) {
            var data = response.data[0];
            $scope.input.autoAccept = data.autoAcceptFeedback;
        });

    $scope.accept = function (id, index) {
        $http.put(URL + '/feedback?status=2&id=' + id)
            .then(function () {
                $scope.newFeedbacks.splice(index, 1);
            });
    }
    $scope.decline = function (id, index) {
        $http.put(URL + '/feedback?status=3&id=' + id)
            .then(function () {
                $scope.newFeedbacks.splice(index, 1);
            });
    }
    $scope.reDecline = function (id, index) {
        $http.put(URL + '/feedback?status=3&id=' + id)
            .then(function () {
                $scope.acceptedFeedbacks.splice(index, 1);
            });
    }
    $scope.reAccept = function (id, index) {
        $http.put(URL + '/feedback?status=2&id=' + id)
            .then(function () {
                $scope.declinedFeedbacks.splice(index, 1);
            });
    }

    $scope.changeAutoAccept = function (value) {
        var data = {
            id: restaurant,
            autoAcceptFeedback: value
        }
        $http({
            url: URL + '/restaurants',
            method: 'PUT',
            params: data
        }).then(function (result) {
            },
            function () {
                globalNotification('error')
            });
    }
});
halleinApp.controller('HelpController', function ($scope, $http) {
    $scope.config = {
        title: 'HELP',
        actions: [
            {title: 'REPORT-A-BUG', icon: 'build', route: '/help/bugreport'},
            {title: 'GIVE-FEEDBACK', icon: 'thumbs_up_down', route: '/help/feedback'},
            {title: 'ASK-A-QUESTION', icon: 'edit', route: '/help/add'}
        ],
        content: 'Web/Content/Help.html'
    }

    $scope.faqs = [];

    switch (userType) {
        case 2:
            var categories = [
                {id: 1, name: 'GENERAL'},
                {id: 2, name: 'LOGIN'},
                {id: 6, name: 'USER'}
            ]
            break;
        case 3:
            var categories = [
                {id: 1, name: 'GENERAL'},
                {id: 2, name: 'LOGIN'},
                {id: 3, name: 'MEALS'},
                {id: 4, name: 'FEEDBACK'},
                {id: 5, name: 'RESTAURANTPAGE'},
            ]
            break;
    }

    $scope.categories = categories;

    var data = {
        cateory: categories.map(function (a) {
            return a.id;
        })
    };

    $http({
        url: URL + '/help',
        method: 'GET',
        params: data
    }).then(function (response) {
        $scope.faqs = response.data;
    });
});
halleinApp.controller('HomeController', function ($scope, $http) {
    $scope.config = {
        content: 'Web/Content/Home.html'
    }

    $scope.notifications = [];

    if (userType == 3) {
        $http.get(URL + '/feedback?get=id&status=1&restaurant=' + restaurant)
            .then(function (response) {
                var feedback = response.data;
                if (feedback.length) {
                    $scope.notifications.push({
                        type: 'alert',
                        number: feedback.length,
                        title: 'DB-NEW-FEEDBACK',
                        text: 'DB-NEW-FEEDBACK-TEXT',
                        route: 'feedback'
                    })
                }
                else $scope.notifications.push({
                    type: 'success',
                    title: 'DB-FEEDBACK-DONE',
                    text: 'DB-FEEDBACK-DONE-TEXT',
                    route: 'feedback'
                })
            });

        $http.get(URL + '/openingTimes?get=id&restaurant=' + restaurant)
            .then(function (response) {
                var openingTimes = response.data;
                if (!openingTimes.length) {
                    $scope.notifications.push({
                        type: 'warning',
                        title: 'DB-NO-OPENINGTIMES',
                        text: 'DB-NO-OPENINGTIMES-TEXT',
                        route: 'page#times'
                    })
                }
            });

        // Restdays
        var today = new Date();
        var todayFormatted = dateToString(today);
        $http.get(URL + '/restDays?get=id&date=' + todayFormatted + '&restaurant=' + restaurant)
            .then(function (response) {
                if (response.data[0].id) {
                    $scope.notifications.push({
                        type: 'info',
                        title: 'DB-RESTDAY-TODAY',
                        text: 'DB-RESTDAY-TODAY-TEXT',
                        route: 'page#times'
                    })
                }
            });

        var tomorrow = new Date();
        tomorrow.setDate(today.getDate() + 1);
        var tomorrowFormatted = dateToString(tomorrow);
        $http.get(URL + '/restDays?get=id&date=' + tomorrowFormatted + '&restaurant=' + restaurant)
            .then(function (response) {
                if (response.data[0].id) {
                    $scope.notifications.push({
                        type: 'info',
                        title: 'DB-RESTDAY-TOMORROW',
                        text: 'DB-RESTDAY-TOMORROW-TEXT',
                        route: 'page#times'
                    })
                }
            });

        // Meals
        // Today
        var todayWeekday = today.getDay();
        $http.get(URL + '/openingTimes?get=id&weekday=' + todayWeekday + '&restaurant=' + restaurant)
            .then(function (response) {
                if (response.data) {
                    $http.get(URL + '/restDays?get=id&date=' + todayFormatted + '&restaurant=' + restaurant)
                        .then(function (response) {
                            if (!response.data.length) {
                                $http.get(URL + '/menus?get=id&date=' + todayFormatted + '&restaurant=' + restaurant)
                                    .then(function (response) {
                                        if (!response.data.length) {
                                            $scope.notifications.push({
                                                type: 'warning',
                                                title: 'DB-NO-MENU-TODAY',
                                                text: 'DB-NO-MENU-TODAY-TEXT',
                                                route: 'meal'
                                            })
                                        }
                                    });
                            }
                        });
                }
            });

        // Tomorrow
        var tomorrowWeekday = tomorrow.getDay();
        $http.get(URL + '/openingTimes?get=id&weekday=' + tomorrowWeekday + '&restaurant=' + restaurant)
            .then(function (response) {
                if (response.data) {
                    $http.get(URL + '/restDays?get=id&date=' + tomorrowFormatted + '&restaurant=' + restaurant)
                        .then(function (response) {
                            if (!response.data.length) {
                                $http.get(URL + '/menus?get=id&date=' + tomorrowFormatted + '&restaurant=' + restaurant)
                                    .then(function (response) {
                                        if (!response.data.length) {
                                            $scope.notifications.push({
                                                type: 'warning',
                                                title: 'DB-NO-MENU-TOMORROW',
                                                text: 'DB-NO-MENU-TOMORROW-TEXT',
                                                route: 'meal'
                                            })
                                        }
                                    });
                            }
                        });
                }
            });

        $http.get(URL + '/restaurants?get=description,description_en&id=' + restaurant)
            .then(function (response) {
                var data = response.data[0];
                if (!data.imgs) {
                    $scope.notifications.push({
                        type: 'warning',
                        title: 'DB-NO-IMGS',
                        text: 'DB-NO-IMGS-TEXT',
                        route: 'page#design'
                    })
                }
                if (data.imgs && !data.mainImg) {
                    $scope.notifications.push({
                        type: 'warning',
                        title: 'DB-NO-MAINIMG',
                        text: 'DB-NO-MAINIMG-TEXT',
                        route: 'page#design'
                    })
                }
                if (data.description && !data.description_en) {
                    $scope.notifications.push({
                        type: 'warning',
                        title: 'DB-NO-TRANSLATIONS',
                        text: 'DB-NO-TRANSLATIONS-TEXT',
                        route: 'page'
                    })
                }
            });
    }
    else if (userType == 1 || userType == 2) {
        $scope.notifications.push({
            type: 'success',
            title: 'DB-APP-ONLINE',
            text: 'DB-APP-ONLINE-TEXT',
            route: 'app-control'
        })
        /*
         $scope.notifications.push({
         type: 'alert',
         number: 1,
         title: 'App offline',
         text: 'Die App ist heruntergefahren. Klicken für Behebung.',
         route: 'app-control'
         })
         */
    }
    if (userType == 2 || userType == 3) {
        /*
         $scope.notifications.push({
         type: 'info',
         title: 'Wir wollen Feedback',
         text: "Gefällt Ihnen das Dashboard oder gibt's Probleme? Geben Sie uns gerne Ihr Feedback.",
         route: 'help-feedback-add'
         })

         $scope.notifications.push({
         type: 'version',
         number: '0.0.0',
         title: 'Neue Version',
         text: 'Eine aktualisierte Version des Hallein App Dashboards wurde veröffentlicht. Sehen Sie sich hier die Änderungen an.',
         route: 'help-feedback-add'
         })
         */
    }
    if (userType == 1) {
        $http.get(URL + '/help?get=id&answer=false')
            .then(function (response) {
                var help = response.data;
                if (help.length) {
                    if (help.length == 1) {
                        $scope.notifications.push({
                            type: 'alert',
                            number: help.length,
                            title: 'DB-NEW-SUPPORT-ENQUIRY',
                            text: 'DB-NEW-SUPPORT-ENQUIRY-TEXT',
                            route: 'support'
                        })
                    }
                    else {
                        $scope.notifications.push({
                            type: 'alert',
                            number: help.length,
                            title: 'Neue Supportanfragen',
                            text: 'Sie haben neue Supportanfragen.',
                            route: 'support'
                        })
                    }
                }
            });
        $http.get(URL + '/bugreport?get=id')
            .then(function (response) {
                var bugs = response.data;
                if (bugs.length) {
                    if (bugs.length == 1) {
                        $scope.notifications.push({
                            type: 'alert',
                            number: bugs.length,
                            title: 'Bug gemeldet',
                            text: 'Es wurde ein Bug gemeldet.',
                            route: 'support'
                        })
                    }
                    else {
                        $scope.notifications.push({
                            type: 'alert',
                            number: bugs.length,
                            title: 'Bugs gemeldet',
                            text: 'Es wurden Bugs gemeldet.',
                            route: 'support'
                        })
                    }
                }
            });
    }
});
halleinApp.controller('MealsController', function ($scope, $location, $http) {
        $scope.config = {
            title: 'MEALS',
            content: 'Web/Content/Meals.html'
        }

        switch ($location.hash()) {
            case 'daily':
                $scope.config.activeTab = '0'
                break;
            case 'constant':
                $scope.config.activeTab = '1'
                break;
            default:
                $scope.config.activeTab = '0'
        }

        $scope.escSearchbox = function ($event) {
            if ($event.keyCode == 27) {
                $scope.appetizer.searchbox = false;
            }
        }

        var date = new Date();
        date.setDate(date.getDate() - 1);

        // So that time is 0 when comparing with menu dates
        date.setHours(0);
        date.setMinutes(0);
        date.setSeconds(0);

        $scope.days = [];

        var weekdays = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];


    $scope.input = {};
    var constantMenus = false;
    $http.get(URL + '/restaurants?get=constantMenus&id=' + restaurant)
        .then(function (response) {
            var response = response.data[0];
            $scope.input.constantMenus = response.constantMenus;
            if(response.constantMenus == true){
                constantMenus = true;
            }
        $http.get(URL + '/openingTimes?get=id,weekday,opens:noSeconds,closesHalf:noSeconds,opensHalf:noSeconds,closes:noSeconds&restaurant=' + restaurant)
            .then(function (response) {
                var openingTimes = response.data;

                // The next days
                var day = new Date();
                day.setHours(0, 0, 0, 0);
                // Because day get added one
                day.setDate(day.getDate() - 1);

                var data = [];
                for (var i = 0; i < 7; i++) {
                    day.setDate(day.getDate() + 1);
                    for (var j = 0; j < openingTimes.length; j++) {
                        if (day.getDay() == openingTimes[j].weekday) {
                            data.push({
                                weekday: openingTimes[j].weekday,
                                name: weekdays[openingTimes[j].weekday],
                                date: new Date(day)
                            });
                            break;
                        }
                    }
                }

                $http.get(URL + '/restDays?get=id,date,description&restaurant=' + restaurant)
                    .then(function (response) {
                        var response = response.data;
                        for (var i = 0; i < response.length; i++) {
                            for (var j = 0; j < data.length; j++) {
                                if (new Date(response[i].date).getTime() == data[j].date.getTime()) {
                                    data[j].restDay = response[i];
                                }
                            }
                        }
                    });

                $http.get(URL + '/menus?get=date&days=7&restaurant=' + restaurant)
                    .then(function (response) {
                        var response = response.data;
                        for (var i = 0; i < response.length; i++) {
                            for (var j = 0; j < data.length; j++) {
                                if (new Date(response[i].date).getTime() == data[j].date.getTime()) {
                                    data[j].id = response[i].id;
                                    if ((response[i].appetizer || response[i].mainCourse || response[i].dessert) && !data[j].restDay) {
                                        data[j].menu = {meals: {}};
                                        if (response[i].appetizer) data[j].menu.meals.appetizer = response[i].appetizer;
                                        if (response[i].mainCourse) data[j].menu.meals.mainCourse = response[i].mainCourse;
                                        if (response[i].dessert) data[j].menu.meals.dessert = response[i].dessert;
                                    }
                                }
                            }
                        }
                    });
                if(constantMenus){
                    $scope.everydays = data;
                }
                else $scope.days = data;
            });
        });

        $scope.everyday = {menu: {meals: {}}};

        /*
         $http.get(URL + '/menus?restaurant=' + restaurant)
         .then(function (response) {
         var menus = response.data;
         var menuDate;
         for (var i = 0; i <= menus.length; i++) {
         menuDate = new Date(menus[i].date);
         console.log(menuDate);
         console.log($scope.days);
         if (menuDate == $scope.days[0].date) {
         alert('ok');
         break;
         }
         }
         console.log($scope.days);
         });
         */

        $http.get(URL + '/meals?get=id,type,description,veggie&restaurant=' + restaurant)
            .then(function (response) {
                $scope.menus = response.data;
            })

        $scope.restDayToggle = function (index) {
            if (!$scope.days[index].restDay) {
                var dateFormatted = dateToString($scope.days[index].date);
                var data = {
                    restaurant: restaurant,
                    date: dateFormatted,
                }
                data = prepareUpload(data);
                $http({
                    url: URL + '/restDays',
                    method: 'POST',
                    params: data
                }).then(function (response) {
                        var id = response.data.id;
                        globalNotification('success', 'Der Ruhetag wurde eingetragen.');
                        $scope.days[index].restDay = {id: id};
                        console.log($scope.days[index]);
                    },
                    function () {
                        globalNotification('alert')
                    });

            }
            else {
                var data = {
                    id: $scope.days[index].restDay.id
                }
                data = prepareUpload(data);
                $http({
                    url: URL + '/restDays',
                    method: 'DELETE',
                    params: data
                }).then(function () {
                        globalNotification('success', 'Der Ruhetag wurde entfernt.');
                        delete $scope.days[index].restDay;
                    },
                    function () {
                        globalNotification('error')
                    });
            }
        }
        $scope.assignMenu = function (index, menu) {
            if (!$scope.days[index].menu) {
                $scope.days[index].menu = {};
                $scope.days[index].menu.meals = {};
            }

            var data = {
                restaurant: restaurant,
                date: dateToString($scope.days[index].date)
            }
            console.log($scope.menus[menu].id);
            switch ($scope.menus[menu].type) {
                case 1:
                    data.appetizer = $scope.menus[menu].id;
                    $scope.days[index].menu.meals.appetizer = $scope.menus[menu]; // Because a 0 would be a bug
                    break;
                case 2:
                    data.mainCourse = $scope.menus[menu].id;
                    $scope.days[index].menu.meals.mainCourse = $scope.menus[menu];
                    break;
                case 3:
                    data.dessert = $scope.menus[menu].id;
                    $scope.days[index].menu.meals.dessert = $scope.menus[menu];
            }

            $http({
                url: URL + '/menus',
                method: 'POST',
                params: data
            }).then(function (response) {
                    $scope.days[index].id = response.data.id;
                },
                function () {
                    globalNotification('error')
                });

            console.log($scope.days);
            tooltipstln();
        }
        $scope.removeMenu = function (type, index) {
            var data = {
                id: $scope.days[index].id,
                type: type
            }
            console.log($scope.days[index]);
            $http({
                url: URL + '/menus',
                method: 'DELETE',
                params: data
            }).then(function () {
                    delete $scope.days[index].menu.meals[type];
                    if ($.isEmptyObject($scope.days[index].menu.meals)) {
                        delete $scope.days[index].menu;
                    }
                    console.log($scope.days);
                },
                function () {
                    globalNotification('error')
                });

            /*
             switch (type) {
             case 'appetizer':
             delete $scope.days[index].menu.meals.appetizer;
             break;
             case 'mainCourse':
             delete $scope.days[index].menu.meals.mainCourse;
             break;
             case 'dessert':
             delete $scope.days[index].menu.meals.dessert;
             break;
             }

             console.log($scope.days);
             */
        }

    $scope.setConstantMenu = function (index) {
        var data = {
            restaurant: restaurant,
            constant: 1,
            date: dateToString($scope.days[index].date)
        }
        $http({
            url: URL + '/menus',
            method: 'POST',
            params: data
        }).then(function (response) {
                $scope.days[index].constant = true;
            },
            function () {
                globalNotification('error')
            });
    }

        $scope.assignConstantMeal = function (meal) {

            switch ($scope.menus[meal].type) {
                case 1:
                    //data.appetizer = $scope.menus[meal].id;
                    $scope.everyday.menu.meals.appetizer = $scope.menus[meal]; // Because a 0 would be a bug
                    break;
                case 2:
                    //data.mainCourse = $scope.menus[meal].id;
                    $scope.everyday.menu.meals.mainCourse = $scope.menus[meal];
                    break;
                case 3:
                    //data.dessert = $scope.menus[meal].id;
                    $scope.everyday.menu.meals.dessert = $scope.menus[meal];
            }
            tooltipstln();
        }

        $scope.removeMeal = function (id, index) {
            $http.delete(URL + '/meals?id=' + id)
                .then(function () {
                        delete $scope.menus[index];
                        globalNotification('success', 'Die Mahlzeit wurde gelöscht.')
                    },
                    function () {
                        globalNotification('error')
                    });
        }
        /*
         $('.content').ready(function () {
         $('.menu').draggable({
         cursorAt: {left: 5},
         revert: true,
         revertDuration: 0,
         });
         $(".day").droppable({
         hoverClass: "hovered",
         drop: function (event, ui) {
         $(this).addClass("done");
         $(this).html("<i class='material-icons'>done</i>");
         console.log(event);
         }
         });
         });
         */
    }
);
halleinApp.controller('RestaurantController', function ($scope, $location, $http) {
    $scope.input = {};
    $scope.config = {
        activeTab: 0,
        tabs: [
            {title: 'GENERAL', link: 'page#general', content: 'Web/Content/RestaurantGeneral.html',
                actions: [
                    {title: 'SAVE', icon: 'done',
                    returnFunction: function(){
                        var input = $scope.input.general;
                        if (input.restaurantname && input.street && input.houseNumber && input.countryCode && input.country) {
                            var data = {
                                id: restaurant,
                                restaurantname: input.restaurantname,
                                description: input.description,
                                description_en: input.description_en,
                                studentMeals: input.studentMeals,
                                reservation: input.reservation,
                                groupsWelcome: input.groupsWelcome,
                                petsWelcome: input.petsWelcome,
                                cornKitchen: input.cornKitchen,
                                acceptsKelteneuro: input.acceptsKelteneuro,
                                acceptsCard: input.acceptsCard,
                                street: input.street,
                                houseNumber: input.houseNumber,
                                countryCode: input.countryCode,
                                country: input.country,
                                parking: input.parking,
                                email: input.email,
                                tel: input.tel,
                                website: input.website
                            }
                            data = prepareUpload(data);
                            console.log(data);
                            $http({
                                url: URL + '/restaurants',
                                method: 'PUT',
                                params: data
                            }).then(function () {
                                    globalNotification('success', 'Die Daten wurden gespeichert.');
                                    $scope.input.loadGeneral();
                                },
                                function () {
                                    globalNotification('error')
                                });
                        }
                        else {
                            globalNotification('warning', 'Bitte geben Sie alle Daten ein.')
                        }
                    }},
                    {title: 'DISCARD', icon: 'close', route: '/'}
                ],},
            {title: 'OPENINGTIMES', link: 'page#times', content: 'Web/Content/RestaurantTimes.html',
                actions: [
                    {title: 'CLOSE', icon: 'close', route: '/'}
                ],},
            {title: 'DESIGN', link: 'page#design', content: 'Web/Content/RestaurantDesign.html',
                actions: [
                    {title: 'CLOSE', icon: 'close', route: '/'}
                ],}
        ]
    }

    switch($location.hash()){
        case 'general':
            $scope.config.activeTab = '0'
            break;
        case 'times':
            $scope.config.activeTab = '1'
            break;
        case 'design':
            $scope.config.activeTab = '2'
            break;
        default:
            $scope.config.activeTab = '0'
    }
});
halleinApp.controller('SupportController', function ($scope, $location, $http, ngDialog) {
    $scope.config = {
        title: 'Support',
        actions: [
            {title: 'CREATE-QUESTION', icon: 'add', route: '/support/add'}
        ],
        content: 'Web/Content/Support.html',
        return: function (index, e) {
            switch (index) {
                case 0:
                    if ($scope.input.question) {
                        var data = {
                            user: restaurant,
                            question: $scope.input.question
                        }
                        $http({
                            url: URL + '/help',
                            method: 'POST',
                            params: data
                        }).then(function () {
                                $location.path('/help');
                                globalNotification('success', 'Die Frage wurde abgeschickt.')
                            },
                            function () {
                                globalNotification('error')
                            });
                    }
                    else {
                        globalNotification('warning', 'Bitte geben Sie alle Daten ein.')
                    }
                    break;
            }
        }
    }

    $scope.category = {
        selected: {id: 1, name: 'Allgemein'},
        options: [
            {id: 1, name: 'Allgemein'},
            {id: 2, name: 'Login'},
            {id: 3, name: 'Mahlzeiten'},
            {id: 4, name: 'Feedback'},
            {id: 5, name: 'Restaurantseite'},
            {id: 6, name: 'Benutzer'}
        ]

    }

    $http.get(URL + '/help?get=id,question,lastEdited&answer=false')
        .then(function (response) {
            $scope.unreplied = response.data;
        });

    $http.get(URL + '/help?get=id,question,category,lastEdited&answer=true')
        .then(function (response) {
            $scope.replied = response.data;
        });

    $http.get(URL + '/bugreport')
        .then(function (response) {
            $scope.bugs = response.data;
        });

    $scope.sort = function (object, property) {
        $scope[object].sort(dynamicSort(property));
    }

    function dynamicSort(property) {
        return function (a, b) {
            var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
            return result;
        }
    }

    $scope.delete = function (id, object, index) {
        if (object == 'bugs') {
            ngDialog.openConfirm({
                controller: ['$scope', function ($scope) {
                    $scope.dialog = {
                        content: 'Bugreport löschen?',
                        options: {
                            confirm: 'Löschen',
                            abort: 'Abbrechen'
                        }
                    }
                }]
            }).then(function () {
                var data = {
                    id: id
                }
                $http({
                    url: URL + '/bugreport',
                    method: 'DELETE',
                    params: data
                }).then(function () {
                        $scope[object].splice(index, 1);
                        globalNotification('success', 'Der Bugreport wurde gelöscht.')
                    },
                    function () {
                        globalNotification('error')
                    });
            });
        }
        else {
            ngDialog.openConfirm({
                controller: ['$scope', function ($scope) {
                    $scope.dialog = {
                        content: 'Frage löschen?',
                        options: {
                            confirm: 'Löschen',
                            abort: 'Abbrechen'
                        }
                    }
                }]
            }).then(function () {
                var data = {
                    id: id
                }
                $http({
                    url: URL + '/help',
                    method: 'DELETE',
                    params: data
                }).then(function () {
                        $scope[object].splice(index, 1);
                        globalNotification('success', 'Die Frage wurde gelöscht.')
                    },
                    function () {
                        globalNotification('error')
                    });
            });
        }
    }
});
halleinApp.controller('UsersController', function ($scope, $http, ngDialog) {
    $scope.config = {
        title: 'USERS',
        actions: [
            {title: 'ADD', icon: 'add', route: '/user/add'}
        ],
        content: 'Web/Content/Users.html'
    }

    $http.get(URL + '/users?get=id,username,type,lastActive')
        .then(function (response) {
            var data = response.data;
            console.log(data);
            for (var i = 0; i < data.length; i++) {
                if (userType != 1 && data[i].type == 1) continue;
                if (data[i].id == user) {
                    data[i].actions = {
                        edit: true
                    };
                    continue;
                }
                data[i].actions = {
                    edit: true,
                    delete: true
                };
            }
            $scope.users = data;
        });

    $scope.sort = function (property) {
        $scope.users.sort(dynamicSort(property));
    }

    function dynamicSort(property) {
        return function (a, b) {
            var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
            return result;
        }
    }

    $scope.deleteUser = function (id, index) {
        ngDialog.openConfirm({
            controller: ['$scope', function ($scope) {
                $scope.dialog = {
                    content: 'Wollen Sie den Benutzer löschen?',
                    options: {
                        confirm: 'Löschen',
                        abort: 'Abbrechen'
                    }
                }
            }]
        }).then(function () {
            var params = "?id=" + id;
            $http.delete(URL + '/users' + params)
                .then(function () {
                        $scope.users.splice(index, 1);
                        globalNotification('success', 'Der Benutzer wurde gelöscht.')
                    },
                    function () {
                        globalNotification('error')
                    });
        });
    }
});
halleinApp.controller('HelpAddController', function ($scope, $location, $http) {
    $scope.config = {
        title: 'Frage stellen',
        actions: [
            {title: 'Abschicken', icon: 'done'},
            {title: 'Verwefen', icon: 'close', route: '/help'}
        ],
        content: 'Web/Content/HelpAdd.html',
        return: function (index, e) {
            switch (index) {
                case 0:
                    if ($scope.input.question) {
                        console.log($scope.input.emailReply);
                        if ($scope.input.emailReply) {
                            var data = {
                                user: user,
                                question: $scope.input.question
                            }
                        }
                        else {
                            var data = {
                                question: $scope.input.question
                            }
                        }
                        $http({
                            url: URL + '/help',
                            method: 'POST',
                            params: data
                        }).then(function () {
                                $location.path('/help');
                                globalNotification('success', 'Die Frage wurde abgeschickt.')
                            },
                            function () {
                                globalNotification('error')
                            });
                    }
                    else {
                        globalNotification('warning', 'Bitte geben Sie alle Daten ein.')
                    }
                    break;
            }
        }
    }

    $scope.input = {
        emailReply: true
    };
});
halleinApp.controller('HelpBugController', function ($scope, $location, $http) {
    $scope.config = {
        title: 'Fehler melden',
        actions: [
            {title: 'REPORT', icon: 'done'},
            {title: 'DISCARD', icon: 'close', route: '/help'}
        ],
        content: 'Web/Content/HelpBug.html',
        return: function (index, e) {
            switch (index) {
                case 0:
                    if ($scope.input.description) {
                        var data = {
                            description: $scope.input.description
                        }
                        $http({
                            url: URL + '/bugreport',
                            method: 'POST',
                            params: data
                        }).then(function () {
                                $location.path('/help');
                                globalNotification('success', 'Danke! Der Fehler wurde gemeldet.')
                            },
                            function () {
                                globalNotification('error')
                            });
                    }
                    else {
                        globalNotification('warning', 'Bitte geben Sie alle Daten ein.')
                    }
                    break;
            }
        }
    }

    $scope.input = {};
});
halleinApp.controller('HelpFeedbackController', function ($scope, $location, $http) {
    $scope.config = {
        title: 'Feedback geben',
        actions: [
            {title: 'Abschicken', icon: 'done'},
            {title: 'Verwefen', icon: 'close', route: '/help'}
        ],
        content: 'Web/Content/HelpFeedback.html',
        return: function (index, e) {
            switch (index) {
                case 0:
                    if ($scope.input.description) {
                        var data = {
                            restaurant: restaurant,
                            type: $scope.types.selected.id,
                            description: $scope.input.description,
                            veggie: $scope.input.veggie,
                        }
                        $http({
                            url: URL + '/meals',
                            method: 'POST',
                            params: data
                        }).then(function () {
                                $location.path('/help');
                                globalNotification('success', 'Die Mahlzeit wurde hinzugefügt.')
                            },
                            function () {
                                globalNotification('error')
                            });
                    }
                    else {
                        globalNotification('warning', 'Bitte geben Sie alle Daten ein.')
                    }
                    break;
            }
        }
    }

    $scope.input = {
        veggie: 0
    };

    $scope.types = {
        selected: {id: 2, name: 'Hauptspeise'},
        options: [
            {id: 1, name: 'Vorspeise'},
            {id: 2, name: 'Hauptspeise'},
            {id: 3, name: 'Nachspeise'}
        ]
    }

    $scope.tags = [
        {name: 'putenstreifensalat', class: 'red'},
        {name: 'salat', class: 'yellow'},
        {name: 'geflügel', class: 'orange'},
    ];
    $scope.removeTag = function (index) {
        $scope.tags.splice(index, 1);
    }

    $scope.foodAdd = function () {
        alert('oe')
    }
});
halleinApp.controller('MealsAddController', function ($scope, $routeParams, $location, $http) {
    $scope.config = {
        title: 'ADD-MEAL',
        actions: [
            {title: 'SAVE', icon: 'done'},
            {title: 'DISCARD', icon: 'close', route: '/meal'}
        ],
        content: 'Web/Content/MealsAdd.html',
        return: function (index, e) {
            switch (index) {
                case 0:
                    if ($scope.input.description) {
                        var data = {
                            restaurant: restaurant,
                            type: $scope.types.selected.id,
                            description: $scope.input.description,
                            veggie: $scope.input.veggie,
                        }
                        $http({
                            url: URL + '/meals',
                            method: 'POST',
                            params: data
                        }).then(function () {
                                $location.path('/meal');
                                globalNotification('success', 'Die Mahlzeit wurde hinzugefügt.')
                            },
                            function () {
                                globalNotification('error')
                            });
                    }
                    else {
                        globalNotification('warning', 'Bitte geben Sie alle Daten ein.')
                    }
                    break;
            }
        }
    }

    $scope.input = {
        veggie: 0
    };

    $scope.types = {
        selected: {id: 2, name: 'MAIN-COURSE'},
        options: [
            {id: 1, name: 'APPETIZER'},
            {id: 2, name: 'MAIN-COURSE'},
            {id: 3, name: 'DESSERT'}
        ]
    }

    switch($routeParams.mealtype){
        case 'appetizer':
            $scope.types.selected = $scope.types.options[0];
            break;
        case 'dessert':
            $scope.types.selected = $scope.types.options[2];
    }

    $scope.tags = [
        {name: 'putenstreifensalat', class: 'red'},
        {name: 'salat', class: 'yellow'},
        {name: 'geflügel', class: 'orange'},
    ];
    $scope.removeTag = function (index) {
        $scope.tags.splice(index, 1);
    }

    $scope.foodAdd = function () {
        alert('oe')
    }
});
halleinApp.controller('RestaurantDesignController', function ($scope, $http, ngDialog) {
    load();
    function load() {
        $http.get(URL + '/restaurants?id=' + restaurant)
            .then(function (response) {
                $scope.input = response.data[0];
            });
    }

    function loadColor() {
        $http.get(URL + '/restaurants?get=color&id=' + restaurant)
            .then(function (response) {
                console.log(response);
                $scope.input = response.data[0];
            });
    }

    $scope.pickColor = function(){
        $scope.hexValid = false;
        ngDialog.open({
            template: 'content/dialogs/color.html',
            appendClassName: 'ngdialog-theme-cropper',
            scope: $scope
        });
    };

    $scope.isHex = function(color){
        var pattern = new RegExp(/^#([0-9a-f]{6}|[0-9a-f]{3})$/i);
        $scope.hexValid = pattern.test(color);
    }

    $scope.setColor = function(color){
        $scope.input.color = color;
        $scope.colorpicker = false;
        var data = {
            id: restaurant,
            color: color
        }
        data = prepareUpload(data);
        $http({
            url: URL + '/restaurants',
            method: 'PUT',
            params: data
        }).then(function () {
                globalNotification('success', 'Farbe gespeichert.');
                loadColor();
            },
            function () {
                globalNotification('error')
            });
    }

    $scope.myImage = '';
    $scope.mainImg = false;
    $scope.croppedImg = '';

    var handleFileSelect = function (evt) {
        var file = evt.currentTarget.files[0];
        var reader = new FileReader();
        reader.onload = function (evt) {
            $scope.$apply(function ($scope) {
                $scope.myImage = evt.target.result;
            });
        };
        reader.readAsDataURL(file);
        ngDialog.open({
            template: 'content/dialogs/cropper.html',
            appendClassName: 'ngdialog-theme-cropper',
            scope: $scope
        });
    };
    angular.element(document.querySelector('#filepicker')).on('change', handleFileSelect);
    $scope.uploadImg = function (image, main) {
        var data = {
            restaurant: restaurant,
            main: main
        }
        var fd = new FormData();
        fd.append('img', image);
        $http.post(URL + '/upload', fd, {
            params: data,
            uploadEventHandlers: {
                progress: function(e) {
                    $scope.progress = e.loaded * 100 / e.total;
                }
            },
            headers: {'Content-Type': undefined}
        }).then(function (result) {
            var data = result.data;
            if(!$scope.input.imgs) $scope.input.imgs = [];
            $scope.input.imgs.unshift(data);
            if(main){
                setMainImg(0);
            }
                globalNotification('success', 'Hochgeladen.');
                $scope.progress = 0;
            },
            function () {
                globalNotification('error');
                $scope.progress = 0;
            });
    }
    $scope.setMainImg = function (index) {
        var data = {
            id: $scope.input.imgs[index].id,
            main: 1
        }
        $http({
            url: URL + '/upload',
            method: 'PUT',
            params: data
        }).then(function () {
            setMainImg(index);
        });
    }
    function setMainImg(index){
        for (var i = 0; i < $scope.input.imgs.length; i++) {
            delete $scope.input.imgs[i].main
        }
        $scope.input.imgs[index].main = true;
    }
    $scope.deleteImg = function (index) {
        ngDialog.openConfirm({
            controller: ['$scope', function ($scope) {
                $scope.dialog = {
                    content: 'CONF-DEL-IMG',
                    options: {
                        confirm: 'DELETE',
                        abort: 'CANCEL'
                    }
                }
            }]
        }).then(function () {
            var data = {
                id: $scope.input.imgs[index].id
            }
            $http({
                url: URL + '/upload',
                method: 'DELETE',
                params: data
            }).then(function () {
                $scope.input.imgs.splice(index, 1);
                    globalNotification('success', 'Gelöscht.');
                },
                function () {
                    globalNotification('error')
                });
        });
    }
});
halleinApp.controller('RestaurantGeneralController', function ($scope, $http) {
    $scope.input.loadGeneral = function () {
        $http.get(URL + '/restaurants?id=' + restaurant)
            .then(function (response) {
                $scope.input.general = response.data[0];
            });
    }
    $scope.input.loadGeneral();
});
halleinApp.controller('RestaurantTimesController', function ($scope, $http, ngDialog) {
    $scope.weekdays = {
        selected: {id: 0, name: 'Sonntag'},
        options: [
            {id: 0, name: 'SUNDAY'},
            {id: 1, name: 'MONDAY'},
            {id: 2, name: 'TUESDAY'},
            {id: 3, name: 'WEDNESDAY'},
            {id: 4, name: 'THURSDAY'},
            {id: 5, name: 'FRIDAY'},
            {id: 6, name: 'SATURDAY'}
        ]
    }

    $scope.showOpeningTimesAdd = function () {
        $scope.validOpeningTimes = false;
        ngDialog.open({
            template: 'content/dialogs/openingTimesAdd.html',
            appendClassName: 'ngdialog-theme-cropper',
            scope: $scope
        });
    }

    $scope.validateOpeningTimes = function(opens, closes){
        var pattern = new RegExp(/^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/i);
       if(pattern.test(opens) && pattern.test(closes)) {
           $scope.validOpeningTimes = true;
       }
       else $scope.validOpeningTimes = false;
    }

    $scope.input = {
        openingTimes: []
    };

    $scope.openingTimeAdd = function (weekday, opens, closes) {
        if (opens && closes) {
            var data = {
                restaurant: restaurant,
                weekday: weekday,
                opens: opens,
                closes: closes
            }
            data = prepareUpload(data);
            $http({
                url: URL + '/openingTimes',
                method: 'POST',
                params: data
            }).then(function (response) {
                    var id = response.data.id;
                    globalNotification('success', 'Eingetragen.');
                    $scope.input.openingTimes.push({
                        id: id,
                        weekday: weekday,
                        opens: opens,
                        closes: closes
                    })
                },
                function () {
                    globalNotification('error')
                });
            return true;
        }
    }

    $scope.openingTimeRemove = function (id, index) {
        var data = {
            id: id,
        }
        $http({
            url: URL + '/openingTimes',
            method: 'DELETE',
            params: data
        }).then(function () {
                globalNotification('success', 'Gelöscht.');
                $scope.input.openingTimes.splice(index, 1);
            },
            function () {
                globalNotification('error')
            });
    }

    var today = new Date();
    today.setHours(0,0,0,0);
    $scope.datepickerConfig = {
        dateFormat: 'DD.MM.YYYY',
        minDate: today
    };

    $scope.showRestDayAdd = function () {
        $scope.validRestDays = false;
        ngDialog.open({
            template: 'content/dialogs/restDayAdd.html',
            appendClassName: 'ngdialog-theme-cropper',
            scope: $scope
        });
    }

    $scope.validateRestDays = function(from, to){
        var pattern = new RegExp(/^\d{2}[./-]\d{2}[./-]\d{4}$/i);
        if(pattern.test(from) && pattern.test(to)) {
            $scope.validRestDays = true;
        }
        else $scope.validRestDays = false;
    }

    $scope.restDayAdd = function (from, to, description) {
        if (from && to) {
            if (stringToDate(from) >= today && stringToDate(to) >= today) {
                var date = stringToDate(from);
                date.setDate(date.getDate() - 1);
                var dateTo = stringToDate(to);
                var diff = Math.abs(dateTo.getTime() - date.getTime());
                var diff = Math.ceil(diff / (1000 * 3600 * 24));
                if(diff < 30) {
                    for (var i = 0; i < diff; i++) {
                        date.setDate(date.getDate() + 1);
                        var dateFormatted = dateToString(date);
                        var data = {
                            restaurant: restaurant,
                            date: dateFormatted,
                            description: description
                        }
                        data = prepareUpload(data);
                        $http({
                            url: URL + '/restDays',
                            method: 'POST',
                            params: data
                        }).then(function () {
                                globalNotification('success', 'Der Ruhetag wurde gespeichert.');
                                load();
                            },
                            function () {
                                globalNotification('alert')
                            });
                    }
                    return true;
                }
                else globalNotification('warning', 'Wählen Sie maximal 30 Tage.');
            }
            else globalNotification('warning', 'Datum liegt in der Vergangenheit.');
        }
        else {
            globalNotification('warning', 'Bitte geben Sie alle Daten ein.')
        }
    }

    $scope.restDayRemove = function (id, index) {
        var data = {
            id: id,
        }
        $http({
            url: URL + '/restDays',
            method: 'DELETE',
            params: data
        }).then(function () {
                globalNotification('success', 'Gelöscht.');
                $scope.restDays.splice(index, 1);
            },
            function () {
                globalNotification('error')
            });
    }

    load();
    function load() {
        $http.get(URL + '/openingTimes?get=id,weekday,opens:noSeconds,closes:noSeconds&orderBy=weekday&restaurant=' + restaurant)
            .then(function (response) {
                $scope.input.openingTimes = response.data;
            });

        $http.get(URL + '/restDays?get=id,date,description,description_en&orderBy=date&restaurant=' + restaurant)
            .then(function (response) {
                $scope.restDays = response.data;
            });
    }
});
halleinApp.controller('SupportAddController', function ($scope, $location, $http) {
    $scope.config = {
        title: 'CREATE-QUESTION',
        actions: [
            {title: 'CREATE', icon: 'done'},
            {title: 'DISCARD', icon: 'close', route: '/support'}
        ],
        content: 'Web/Content/SupportAdd.html',
        return: function (index, e) {
            switch (index) {
                case 0:
                    if ($scope.input.category.selected && $scope.input.question && $scope.input.answer) {
                        var data = {
                            category: $scope.input.category.selected.id,
                            question: $scope.input.question,
                            answer: $scope.input.answer
                        }
                        $http({
                            url: URL + '/help',
                            method: 'POST',
                            params: data
                        }).then(function () {
                                $location.path('/support');
                                globalNotification('success', 'Die Frage wurde erstellt.')
                            },
                            function () {
                                globalNotification('error')
                            });
                    }
                    else {
                        globalNotification('warning', 'Bitte geben Sie alle Daten ein.')
                    }
                    break;
            }
        }
    }

    $scope.input = {};

    $scope.input.category = {
        selected: {id: 1, name: 'Allgemein'},
        options: [
            {id: 1, name: 'Allgemein'},
            {id: 2, name: 'Login'},
            {id: 3, name: 'Mahlzeiten'},
            {id: 4, name: 'Feedback'},
            {id: 5, name: 'Restaurantseite'},
            {id: 6, name: 'Benutzer'}
        ]
    }
});
halleinApp.controller('SupportEditController', function ($scope, $routeParams, $location, $http) {
    $scope.config = {
        title: 'EDIT-QUESTION',
        actions: [
            {title: 'SAVE', icon: 'done'},
            {title: 'DISCARD', icon: 'close', route: '/support'}
        ],
        content: 'Web/Content/SupportEdit.html',
        return: function (index, e) {
            switch (index) {
                case 0:
                    if ($scope.input.category.selected && $scope.input.question && $scope.input.answer) {
                        var data = {
                            id: id,
                            category: $scope.input.category.selected.id,
                            question: $scope.input.question,
                            answer: $scope.input.answer
                        }
                        $http({
                            url: URL + '/help',
                            method: 'PUT',
                            params: data
                        }).then(function () {
                                $location.path('/support');
                                globalNotification('success', 'Die Frage wurde gespeichert.')
                            },
                            function () {
                                globalNotification('error')
                            });
                    }
                    else {
                        globalNotification('warning', 'Bitte geben Sie alle Daten ein.')
                    }
                    break;
            }
        }
    }

    var id = $routeParams.id;

    $scope.input = {name: 'sdd'};

    $scope.input.category = {
        selected: {},
        options: [
            {id: 1, name: 'Allgemein'},
            {id: 2, name: 'Login'},
            {id: 3, name: 'Mahlzeiten'},
            {id: 4, name: 'Feedback'},
            {id: 5, name: 'Restaurantseite'},
            {id: 6, name: 'Benutzer'}
        ]
    }

    $http.get(URL + '/help?get=question,answer,category&id=' + id)
        .then(function (response) {
            var data = response.data[0];

            $scope.input.question = data.question;
            $scope.input.answer = data.answer;
            if(data.category) {
                $scope.input.category.selected.id = data.category;
            }
        });
});
halleinApp.controller('SupportBugController', function ($scope, $routeParams, $location, $http) {
    $scope.config = {
        title: 'Bug ansehen',
        actions: [
            {title: 'Schließen', icon: 'close', route: '/support'}
        ],
        content: 'Web/Content/SupportBug.html',
    }

    var id = $routeParams.id;

    $http.get(URL + '/bugreport?id=' + id)
        .then(function (response) {
            $scope.bug = response.data[0];
        });
});
halleinApp.controller('UsersAddController', function ($scope, $location, $http) {
    $scope.config = {
        title: 'ADD-USER',
        actions: [
            {title: 'SAVE', icon: 'done'},
            {title: 'DISCARD', icon: 'close', route: '/user'}
        ],
        content: 'Web/Content/UsersAdd.html',
        return: function (index, e) {
            switch (index) {
                case 0:
                    if ($scope.input.firstname && $scope.input.lastname) {
                        if (($scope.types.selected.id == 3 && $scope.input.restaurantname) || $scope.types.selected.id != 3) {
                            var data = {
                                username: $scope.input.username,
                                firstname: $scope.input.firstname,
                                lastname: $scope.input.lastname,
                                restaurantname: $scope.input.restaurantname,
                                email: $scope.input.email,
                                type: $scope.types.selected.id,
                                password: $scope.input.password,
                                pwTemp: $scope.input.pwTemp
                            }
                            $http({
                                url: URL + '/users',
                                method: 'POST',
                                params: data
                            }).then(function () {
                                    $location.path('/user');
                                    globalNotification('success', 'Der Benutzer wurde erstellt.')
                                },
                                function () {
                                    globalNotification('error')
                                });
                        }
                        else {
                            globalNotification('warning', 'Bitte geben Sie alle Daten ein.');
                        }
                    }
                    else {
                        globalNotification('warning', 'Bitte geben Sie alle Daten ein.');
                    }
                    break;
            }
        }
    }

    $scope.input = {
        pwTemp: 1
    };

    if (userType == 1) {
        $scope.types = {
            selected: {id: 3, name: 'Restaurant', group: 'restaurants'},
            options: [
                {id: 1, name: 'Superuser', group: 'superuser'},
                {id: 2, name: 'Administrator', group: 'admins'},
                {id: 3, name: 'Restaurant', group: 'restaurants'}
            ]
        }
    }
    else {
        $scope.types = {
            selected: {id: 3, name: 'Restaurant', group: 'restaurants'},
            options: [
                {id: 2, name: 'Administrator', group: 'admins'},
                {id: 3, name: 'Restaurant', group: 'restaurants'}
            ]
        }
    }

    $scope.restaurantname = '';

    $scope.generateUsername = function () {
        var firstname = $scope.input.firstname;
        var lastname = $scope.input.lastname;
        if (firstname && lastname) {
            var data = {
                firstname: firstname,
                lastname: lastname
            }
            $http({
                url: URL + '/username',
                method: 'GET',
                params: data
            }).then(function (response) {
                console.log(response.data);
                $scope.input.username = response.data;
            });
        }
    }

    $scope.input.password = generateRandom(6);

    $scope.generatePassword = function () {
        $scope.input.password = generateRandom(6);
    }

    function generateRandom(length) {
        var password = '';
        var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

        for (var i = 0; i < length; i++)
            password += possible.charAt(Math.floor(Math.random() * possible.length));

        return password;
    }
});
halleinApp.controller('UsersEditController', function ($scope, $routeParams, $location, $http) {
    $scope.config = {
        title: 'EDIT-USER',
        actions: [
            {title: 'SAVE', icon: 'done'},
            {title: 'DISCARD', icon: 'close', route: '/user'}
        ],
        content: 'Web/Content/UsersEdit.html',
        return: function (index, e) {
            switch (index) {
                case 0:
                    if ($scope.input.firstname && $scope.input.lastname) {
                        var data = {
                            id: id,
                            username: ($scope.input.firstname.substr(0, 2) + $scope.input.lastname).toLowerCase(),
                            firstname: $scope.input.firstname,
                            lastname: $scope.input.lastname,
                            email: $scope.input.email
                        }
                        if($scope.input.password){
                            data.password = $scope.input.password;
                            data.pwTemp = $scope.input.pwTemp;
                        }
                        data = prepareUpload(data);
                        $http({
                            url: URL + '/users',
                            method: 'PUT',
                            params: data
                        }).then(function () {
                                $location.path('/user');
                                globalNotification('success', 'Änderungen gespeichert.')
                            },
                            function () {
                                globalNotification('error')
                            });
                    }
                    else {
                        globalNotification('warning', 'Bitte geben Sie alle Daten ein.')
                    }
                    break;
            }
        }
    }

    var id = $routeParams.id;

    $scope.input = {};
    $scope.resetPassword = false;

    $http.get(URL + '/users?get=type,email,firstname,lastname,username&id=' + id)
        .then(function (response) {
            $scope.input = response.data[0];
        });

    $scope.types = {
        selected: {id: 3, name: 'Restaurant', group: 'restaurants'},
        options: [
            {id: 1, name: 'Superuser', group: 'superuser'},
            {id: 2, name: 'Administrator', group: 'admins'},
            {id: 3, name: 'Restaurant', group: 'restaurants'}
        ]
    }

    $scope.restaurantname = '';

    $scope.generateUsername = function () {
        var firstname = $scope.input.firstname;
        var lastname = $scope.input.lastname;
        if(firstname && lastname) {
            var data = {
                firstname: firstname,
                lastname: lastname
            }
            $http({
                url: URL + '/username',
                method: 'GET',
                params: data
            }).then(function (response) {
                console.log(response.data);
                $scope.input.username = response.data;
            });
        }
    }

    $scope.input.password = generateRandom(6);

    $scope.generatePassword = function () {
        $scope.input.password = generateRandom(6);
    }

    function generateRandom(length) {
        var password = '';
        var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

        for (var i = 0; i < length; i++)
            password += possible.charAt(Math.floor(Math.random() * possible.length));

        return password;
    }
});