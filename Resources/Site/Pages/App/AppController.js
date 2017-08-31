halleinCloud.controller('AppController', function ($scope, $http) {
    $scope.config = {
        title: 'App',
        content: 'Web/Content/App.html'
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