myApp.controller('profileSettingsController', function ($scope, $http) {
    $http.get(URL + '/users?get=firstname,lastname&id=' + user)
        .then(function (response) {
            $scope.input = response.data[0];
        });

    $scope.save = function () {
        var data = {
            id: user,
            firstname: $scope.input.firstname,
            lastname: $scope.input.lastname
        }
        data = prepareUpload(data);
        $http({
            url: URL + '/users',
            method: 'PUT',
            params: data
        }).then(function () {
                globalNotification('success', 'Die Daten wurden gespeichert.');
            },
            function () {
                globalNotification('error')
            });
    }
});