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
            actions: [
                {title: 'Hinzufügen', icon: 'add', route: '/food-add'}
            ],
            controller: 'foodController'
        })
        .when('/food-add', {
            templateUrl: 'content/food-add.html',
            name: 'Mahlzeit erstellen',
            actions: [
                {title: 'Speichern', icon: 'done'},
                {title: 'Löschen', icon: 'delete', bottom: true}
            ],
            controller: 'foodAddController'
        })
        .when('/feedback', {
            templateUrl: 'content/feedback.html',
            name: 'Feedback'
        })
        .when('/page', {
            templateUrl: 'content/page.html',
            actions: [
                {title: 'Speichern', icon: 'done'},
                {title: 'Löschen', icon: 'delete', bottom: true}
            ],
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
    $scope.$on('$routeChangeSuccess', function (next, current) {

        if (current.$$route.actions) {
            $scope.action = true;
            $scope.actions = current.$$route.actions;
        }
        else {
            $scope.action = false;
        }
        $('.tooltip').tooltipster({
            theme: ['tooltipster-noir', 'tooltipster-noir-customized'],
            side: 'left',
            arrow: false,
            delay: 100,
            animationDuration: 200
        });
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
    $('.menuclass').draggable({
    hoverClass: "whiledragged"
    });
    $( ".day" ).droppable({
     hoverClass: "hovered"
    });





});

myApp.controller('foodAddController', function ($scope) {

});

