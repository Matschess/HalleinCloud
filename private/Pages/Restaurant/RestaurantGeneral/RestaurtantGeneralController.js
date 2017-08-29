halleinApp.controller('RestaurantGeneralController', function ($scope, $http) {
    $scope.input.loadGeneral = function () {
        $http.get(URL + '/restaurants?id=' + restaurant)
            .then(function (response) {
                $scope.input.general = response.data[0];
            });
    }
    $scope.input.loadGeneral();
});