halleinCloud.controller('LoginController', function ($scope, $route, translateService, $http, LoginService) {
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
                content: 'Web/Content/pwForgot/request.html'
            },
            confirm: {
                title: 'RESET-PASSWORD',
                subtitle: 'SU-PASSWORD-RESET-CONFIRM-SUBTITLE',
                content: 'Web/Content/pwForgot/confirm.html'
            },
            password: {
                title: 'RESET-PASSWORD',
                subtitle: 'SU-PASSWORD-RESET-PASSWORD-SUBTITLE',
                content: 'Web/Content/pwForgot/password.html'
            },
            success: {
                title: 'RESET-PASSWORD',
                subtitle: "SU-PASSWORD-RESET-SUCCESS-SUBTITLE",
                content: 'Web/Content/pwForgot/success.html'
            }
        },
        setup: {
            everyone: {
                welcome: {
                    title: 'HELLO',
                    subtitle: 'SU-WELCOME-SUBTITLE',
                    content: 'Web/Content/Setup/Welcome.html'
                },
                password: {
                    title: 'SECURITY',
                    subtitle: 'SU-SECURITY-SUBTITLE',
                    content: 'Web/Content/Setup/Password.html'
                },
            },
            restaurant: {
                basicData: {
                    title: 'RESTAURANTDATA',
                    subtitle: 'SU-RESTAURANTDATA-SUBTITLE',
                    content: 'Web/Content/Setup/Restaurant/BasicData.html'
                },
                address: {
                    title: 'ADDRESS-AND-CONTACT',
                    subtitle: 'SU-ADDRESS-AND-CONTACT-SUBTITLE',
                    content: 'Web/Content/Setup/Restaurant/Address.html'
                },
                openingTimes: {
                    title: 'OPENINGTIMES',
                    subtitle: 'SU-OPENINGTIMES-SUBTITLE',
                    content: 'Web/Content/Setup/Restaurant/OpeningTimes.html'
                },
                options: {
                    title: 'OPTIONS',
                    subtitle: 'SU-OPTIONS-SUBTITLE',
                    content: 'Web/Content/Setup/Restaurant/Options.html'
                },
                payments: {
                    title: 'Einrichtung',
                    subtitle: 'Zahlungsmethoden',
                    content: 'Web/Content/Setup/Restaurant/Payments.html'
                },
                completed: {
                    title: "Fertig!",
                    subtitle: 'Die Einrichtung ist abgeschlossen.',
                    content: 'Web/Content/Setup/Restaurant/Completed.html'
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