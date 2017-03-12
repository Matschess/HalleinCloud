myApp.controller('pageGeneralController', function ($scope, $http) {
    $scope.input.loadGeneral = function () {
        $http.get(URL + '/restaurants?user=' + user)
            .then(function (response) {
                $scope.input.general = response.data[0];
            });
    }
    $scope.input.loadGeneral();
});