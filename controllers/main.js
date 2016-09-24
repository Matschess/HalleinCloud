var myApp = angular.module('myApp', ['ngRoute', 'ngSanitize', 'ngCookies']);

myApp.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'content/dashboard.html',
            name: 'Dashboard',
            controller: 'dashboardController'
        })
        .when('/food', {
            templateUrl: 'content/food.html',
            name: 'Mahlzeiten',
            action: true,
            controller: 'foodController'
        })
        .when('/feedback', {
            templateUrl: 'content/feedback.html',
            name: 'Feedback'
        })
        .when('/page', {
            templateUrl: 'content/page.html',
            name: 'Restaurantseite'
        })
        .when('/help', {
            templateUrl: 'content/help.html',
            name: 'Hilfe'
        })
        .otherwise({
            redirectTo: "/"
        });
});



myApp.controller('mainController', function ($scope, $route, $routeParams, $http, $cookies) {
    $scope.routes = [];
    angular.forEach($route.routes, function (route, path) {
        if (route.name) {
            $scope.routes.push({
                path: path,
                name: route.name
            });
        }
    });

    // Looks if action bar is a param
    $scope.$on('$routeChangeSuccess', function(next, current) {
        $scope.action = current.$$route.action;
    });



    $scope.popupLinks = [
        {name: 'Passwort ändern', icon: 'lock_outline', url: 'settings/pwChange.html'},
        {name: 'Feedback', icon: 'star', url: 'settings/feedbackSettings.html'}
    ];

    $scope.logIn = function (url, action) {
        $scope.loggedIn = true;
    }

    $scope.logOut = function (url, action) {
        $scope.loggedIn = false;
    }


    $scope.openSettings = function () {
        $scope.popup = true;
    }
    $scope.popupClose = function () {
        $scope.popup = false;
    }
    $scope.load = function (url, action) {
        if (action) {
            $scope.action = true;
        }
        else {
            $scope.action = false;
        }
        $http.get('content/' + url)
            .then(function (response) {
                $scope.content = response.data;
                $cookies.put('view', url);
            });
    }
    $scope.popupLoad = function (url) {
        $http.get('content/' + url)
            .then(function (response) {
                $scope.popupContent = response.data;
            });
    }
});

myApp.controller('dashboardController', function ($scope) {
    // make dashboard-boxes draggable
    $('.dashboardBox').each(function () {
        if (Cookies.get(this.id + '-box-position')) {
            $(this).css('top', Cookies.getJSON(this.id + '-box-position').top + 'px');
            $(this).css('left', Cookies.getJSON(this.id + '-box-position').left + 'px');
        }
    });
    $('.dashboardBox').draggable({
        containment: '.container',
        stop: function (event, ui) {
            Cookies.set(this.id + '-box-position', ui.position, {expires: 365});
        }
    });
});
myApp.controller('foodController', function ($scope) {
    // make dashboard-boxes draggable
    $('.menuclass').draggable();
    $( ".day" ).droppable({
     hoverClass: "hovered"



    });



});
