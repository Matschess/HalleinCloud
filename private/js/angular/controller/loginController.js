myApp.controller('loginController', function ($scope, $route, $http, loginHandler) {
    loginHandler.buildNavbar();

    var routes = {
        login: {
            title: 'Dashboard',
            aboutUs: true,
            content: 'content/login.html'
        },
        pwForgot: {
            request: {
                title: 'Passwort zurücksetzen',
                subtitle: 'Email eingeben',
                content: 'content/pwForgot/request.html'
            },
            confirm: {
                title: 'Passwort zurücksetzen',
                subtitle: 'PIN eingeben',
                content: 'content/pwForgot/confirm.html'
            },
            password: {
                title: 'Passwort zurücksetzen',
                subtitle: 'Neues Passwort festlegen',
                content: 'content/pwForgot/password.html'
            },
            success: {
                title: 'Passwort zurücksetzen',
                subtitle: "Das war's",
                content: 'content/pwForgot/success.html'
            }
        },
        setup: {
            everyone: {
                welcome: {
                    title: 'Hallo',
                    subtitle: 'Willkommen bei der Ersteinrichtung',
                    content: 'content/setup/welcome.html'
                },
                password: {
                    title: 'Einrichtung',
                    subtitle: 'Sicherheit',
                    content: 'content/setup/password.html'
                },
            },
            restaurant: {
                basicData: {
                    title: 'Einrichtung',
                    subtitle: 'Allgemein',
                    content: 'content/setup/restaurants/basicData.html'
                },
                address: {
                    title: 'Einrichtung',
                    subtitle: 'Adress- & Kontaktdaten',
                    content: 'content/setup/restaurants/address.html'
                },
                openingTimes: {
                    title: 'Einrichtung',
                    subtitle: 'Öffnungszeiten',
                    content: 'content/setup/restaurants/openingTimes.html'
                },
                options: {
                    title: 'Einrichtung',
                    subtitle: 'Weiteres',
                    content: 'content/setup/restaurants/options.html'
                },
                payments: {
                    title: 'Einrichtung',
                    subtitle: 'Zahlungsmethoden',
                    content: 'content/setup/restaurants/payments.html'
                },
                completed: {
                    title: "We're ready!",
                    content: 'content/setup/restaurants/completed.html'
                }
            },

        }
    };

    $scope.route = routes.login;

    $scope.input = {}

    $scope.login = function () {
        $('.login').removeClass('shake');
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
                        url: URL + '/restaurants?get=restaurantname',
                        method: 'GET',
                        params: data
                    }).then(function (response) {
                        $scope.setup = {input: response.data[0]};
                    });
                    $('.wrapper').addClass('background');
                } else {
                    loginHandler.login(response);
                }
            }, function () {
                $('.login').addClass('animated shake');
            });
        }
        else {
            $('.login').addClass('animated shake');
        }
    }

    $scope.complete = function (src) {
        switch (src) {
            case 'pwReset':
                $scope.route = routes.pwForgot.request;
                $scope.pwForgot = {input: {}};
                break;
            case 'pwReset/request':
                $scope.route = routes.pwForgot.confirm;
                var email = $scope.pwForgot.input.email;
                if (email) {
                    var data = {
                        email: $scope.pwForgot.input.email
                    }
                    $http({
                        url: URL + '/pwforgot',
                        method: 'PUT',
                        params: data
                    }).then();
                }
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
                        console.log('error');
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
                        }, function () {
                            console.log('error');
                        });
                    }
                    else {
                        console.log('stimmen nicht');
                    }
                }
                break;
            case 'pwReset/success':
                $scope.route = routes.login;
                break;
            case 'welcome':
                $scope.route = routes.setup.everyone.password;
                break;
            case 'password':
                $scope.route = routes.setup.restaurant.basicData;
                break;
            case 'basicData':
                $scope.route = routes.setup.restaurant.address;
                break;
            case 'address':
                $scope.route = routes.setup.restaurant.openingTimes;
                break;
            case 'openingTimes':
                $scope.route = routes.setup.restaurant.options;
                break;
            case 'options':
                $scope.route = routes.setup.restaurant.payments;
                break;
            case 'payments':
                $scope.route = routes.setup.restaurant.completed;
                break;
            case 'completed':
                var input = $scope.setup.input;
                if (input) {
                    var data = {
                        id: input.id,
                        restaurantname: input.restaurantname,
                        description: input.description,
                        street: input.street,
                        houseNumber: input.houseNumber,
                        countryCode: input.countryCode,
                        country: input.country,
                        email: input.email,
                        tel: input.tel,
                        website: input.website
                    }
                    console.log(data);
                    $http({
                        url: URL + '/restaurants',
                        method: 'PUT',
                        params: data
                    }).then(function () {
                        $scope.route = routes.login;
                    });
                }
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