myApp.controller('profileSettingsController', function ($scope, $rootScope, $http) {
    $http.get(URL + '/users?get=firstname,lastname,email&id=' + user)
        .then(function (response) {
            $scope.input = response.data[0];
        });

    $scope.save = function () {
        if ($scope.input.firstname && $scope.input.lastname) {
            var data = {
                id: user,
                firstname: $scope.input.firstname,
                lastname: $scope.input.lastname,
                email: $scope.input.email
            }
            data = prepareUpload(data);
            $http({
                url: URL + '/users',
                method: 'PUT',
                params: data
            }).then(function () {
                    globalNotification('success', 'Die Daten wurden gespeichert.');
                    $rootScope.username = firstname
                },
                function () {
                    globalNotification('error')
                });
        }
        else {
            globalNotification('warning', 'Bitte geben Sie alle Daten ein.')
        }
    }
});