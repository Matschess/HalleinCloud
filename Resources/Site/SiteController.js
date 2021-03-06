halleinCloud.controller('SiteController', function ($scope, $rootScope, $route, $location, $routeParams, $http, translateService, LoginService) {
    translateService.translate();

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
    LoginService.checkLogin();
    $scope.logout = function () {
        LoginService.logout();
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
        {name: 'PROFILE', icon: 'person_outline', url: 'ProfileSettings.html'},
        {name: 'CHANGE-PASS', icon: 'lock_outline', url: 'PasswordSettings.html'},
        {name: 'LANGUAGE', icon: 'language', url: 'LanguageSettings.html'}
    ];
    $scope.openSettings = function () {
        $scope.popup = {
            title: 'SETTINGS',
            links: settingsLinks,
            content: 'Web/Content/' + settingsLinks[0].url,
            actions: settingsLinks[0].actions
        }
    }
    $scope.popupLoad = function (index) {
        $scope.popup.content = 'Web/Content/' + $scope.popup.links[index].url;
    }
    $scope.popupClose = function () {
        $scope.popup = false;
    }
});