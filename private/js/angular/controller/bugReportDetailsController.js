myApp.controller('bugReportDetailsController', function ($scope, $routeParams, $location, $http) {
    $scope.config = {
        title: 'Bug ansehen',
        actions: [
            {title: 'Schließen', icon: 'close', route: '/support'}
        ],
        content: 'content/bugreport.html',
    }

    var id = $routeParams.id;

    $http.get(URL + '/bugreport?id=' + id)
        .then(function (response) {
            $scope.bug = response.data[0];
        });
});