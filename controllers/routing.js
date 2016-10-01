var myApp = angular.module('myApp', ['ngRoute', 'ngCookies']);

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
            fullBox: true,
            title: 'Mahlzeiten',
            actions: [
                {title: 'Hinzufügen', icon: 'add', route: '/food-add'}
            ],
            controller: 'foodController'
        })
        .when('/food-add', {
            templateUrl: 'content/food-add.html',
            fullBox: true,
            title: 'Mahlzeit erstellen',
            actions: [
                {title: 'Speichern', icon: 'done', route: '/food'},
                {title: 'Verwerfen', icon: 'close', bottom: true, route: '/food'}
            ],
            controller: 'foodAddController'
        })
        .when('/feedback', {
            templateUrl: 'content/feedback.html',
            icon: 'feedback.png',
            name: 'Feedback',
            controller: 'feedbackController'
        })
        .when('/page', {
            templateUrl: 'content/page.html',
            name: 'Restaurantseite',
            fullBox: true,
            title: 'Restaurantseite',
            actions: [
                {title: 'Speichern', icon: 'done'},
                {title: 'Verwerfen', icon: 'close', bottom: true}
            ],
            controller: 'pagesController'
        })
        .when('/help', {
            templateUrl: 'content/help.html',
            icon: 'help.png',
            name: 'Hilfe',
            fullBox: true,
            title: 'Hilfe'
        })
        .otherwise({
            redirectTo: "/"
        });
});