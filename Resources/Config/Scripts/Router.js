halleinCloud.config(function ($routeProvider) {
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