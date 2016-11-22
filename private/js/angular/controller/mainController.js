myApp.controller('mainController', function ($scope, $route, $routeParams, $http, $cookies) {
    $scope.foodAdd = function () {
        myApp.foodAddController.foodAdd();
    }

    $scope.username = 'Benutzername';
    /*$scope.loading = {
     status: '',
     text: ''
     };*/
    $scope.checkKey = function ($event) {
        if ($event.keyCode == 27) {
            $scope.popupClose();
        }
    }

    $scope.frameSwitch = function (index) {
        $scope.frame.switched = index + 1;
        tooltipstln();
    }

    $('.tooltip').tooltipster({
        theme: ['tooltipster-noir', 'tooltipster-noir-customized'],
        side: 'left',
        arrow: false,
        delay: 100,
        animationDuration: 200
    });

    // Login
    $scope.loggedIn = true;

    // Save routes in an array for navigation
    $scope.routes = [];
    angular.forEach($route.routes, function (route, path) {
        if (!route.icon) {
            route.icon = 'help.png';
        }
        if (route.name) {
            $scope.routes.push({
                path: path,
                icon: route.icon,
                name: route.name
            });
        }
    });

    // Watches, if actionbar is a param
    $scope.$on('$routeChangeSuccess', function (next, current) {
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

        tooltipstln();
        selectln();
    });

    var settingsLinks = [
        {name: 'Profil', icon: 'person_outline', url: 'settings/profileSettings.html', actions: [{icon: 'done'}]},
        {name: 'Passwort ändern', icon: 'lock_outline', url: 'settings/pwChange.html', actions: [{icon: 'send'}]}
    ];

    $scope.openSettings = function () {
        $scope.popup = {
            title: 'Einstellungen',
            links: settingsLinks,
            content: 'content/' + settingsLinks[0].url,
            actions: settingsLinks[0].actions
        }
    }
    $scope.popupLoad = function (index) {
        $scope.popup.content = 'content/' + $scope.popup.links[index].url;
        $scope.popup.action = $scope.popup.links[index].actions;
        console.log($scope.popup);
    }
    $scope.popupClose = function () {
        $scope.popup = false;
    }
});