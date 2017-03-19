myApp.controller('mainController', function ($scope, $rootScope, $route, $location, $routeParams, $http, loginHandler) {
    $scope.$on('$viewContentLoaded', function(){
        console.log('loaded');
    });

    // System-Infos
    $scope.system = {
        version: '0.0.0',
        versionName: "Ain't nobody got time for that",
        released: '',
        copyright: '2017 by Matthias Lang, Maximilian Hölzl, Thomas Steiner'
    };

    $scope.checkKey = function ($event) {
        if ($event.keyCode == 27) {
            $scope.popupClose();
        }
    }

    // Check for existing login
    loginHandler.checkLogin();
    $scope.logout = function () {
        loginHandler.logout();
    }

    // Route-Change
    $scope.$on('$routeChangeStart', function ($rootScope) {
        $rootScope.loading = false;
    });
    $scope.$on('$routeChangeSuccess', function (next, current, $rootScope) {
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
        $rootScope.loading = false;
    });

    // Active links in navbar
    $scope.isActive = function (location) {
        var active = (location === '/' + $location.path().split('/')[1]);
        return active;
    };

    // Popup
    var settingsLinks = [
        {name: 'Profil', icon: 'person_outline', url: 'settings/profileSettings.html'},
        {name: 'Passwort ändern', icon: 'lock_outline', url: 'settings/pwChange.html'}
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
    }
    $scope.popupClose = function () {
        $scope.popup = false;
    }
});