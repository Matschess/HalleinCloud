var myApp = angular.module('myApp', ['ngRoute', 'ngCookies', 'ngDraggable']);

myApp.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'content/dashboard.html',
            icon: 'dashboard.png',
            name: 'Dashboard',
            controller: 'dashboardController'
        })
        .when('/food', {
            templateUrl: 'content/food.html',
            name: 'Mahlzeiten',
            frame: {
                type: 'fullBox',
                title: 'Mahlzeiten',
                actions: [
                    {title: 'Hinzufügen', icon: 'add', route: '/food-add'}
                ]
            },
            controller: 'foodController'
        })
        .when('/food-add', {
            templateUrl: 'content/food-add.html',
            frame: {
                type: 'fullBox',
                title: 'Mahlzeit erstellen',
                actions: [
                    {title: 'Speichern', icon: 'done', route: '/food', function: 'foodAdd()'},
                    {title: 'Verwerfen', icon: 'close', route: '/food'}
                ]
            },
            controller: 'foodAddController'
        })
        .when('/feedback', {
            templateUrl: 'content/feedback.html',
            icon: 'feedback.png',
            name: 'Feedback',
            frame: {
                type: 'switchBox',
                title: 'Feedback',
                switcher: ['Neu', 'Akzeptiert', 'Abgelehnt']
            },
            controller: 'feedbackController'
        })
        .when('/page', {
            templateUrl: 'templates/window.html',
            name: 'Restaurantseite',
            controller: 'pagesController'
        })
        .when('/users', {
            templateUrl: 'content/users.html',
            name: 'Benutzer',
            frame: {
                type: 'fullBox',
                title: 'Benutzer',
                actions: [
                    {title: 'Hinzufügen', icon: 'add', route: '/user-add'}
                ]
            },
            controller: 'usersController'
        })
        .when('/user-add', {
            templateUrl: 'templates/window.html',
            controller: 'userAddController'
        })
        .when('/help', {
            templateUrl: 'content/help.html',
            icon: 'help.png',
            name: 'Hilfe',
            frame: {
                type: 'fullBox',
                title: 'Hilfe'
            },
        })
        .otherwise({
            redirectTo: "/"
        });
});