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