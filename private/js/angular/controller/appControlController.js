myApp.controller('appControlController', function ($scope, $http) {
    $scope.config = {
        title: 'App-Wartung',
        content: 'content/app-control.html'
    }

    $scope.input = {
        appStatus: true
    }

    $scope.activeUsers = 568;
    $scope.downloads = {
        android: 312,
        iOS: 458,
        windows: 50
    }
});