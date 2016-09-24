var myApp = angular.module('dashboard', ['ngSanitize', 'ngCookies']);

myApp.controller('NavigationController', function ($scope, $http, $cookies) {
    $scope.links = [
        {name: 'Dashboard', url: 'dashboard.html'},
        {name: 'Mahlzeiten', url: 'food.html', action: 'save'},
        {name: 'Feedback', url: 'feedback.html', alerts: 3},
        {name: 'Restaurantseite', url: 'page.html', action: 'save'},
        {name: 'Hilfe', url: 'help.html'}
    ];
    $scope.popupLinks = [
        {name: 'Passwort ändern', icon: 'lock_outline', url: 'settings/pwChange.html'},
        {name: 'Feedback', icon: 'star', url: 'settings/feedbackSettings.html'}
    ];
    var url;
    if ($cookies.get('view')) {
        url = $cookies.get('view');
    }
    else {
        url = $scope.links[0].url;
    }

    $scope.logIn = function (url, action) {
        $scope.loggedIn = true;
    }

    $scope.logOut = function (url, action) {
        $scope.loggedIn = false;
    }

    $http.get('content/' + url)
        .then(function (response) {
            $scope.content = response.data;
        });
    $scope.action;

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