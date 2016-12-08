myApp.controller('profileSettingsController', function ($scope, $rootScope, $http) {
    $http.get(URL + '/users?get=firstname,lastname&id=' + user)
        .then(function (response) {
            $scope.input = response.data[0];
        });

    $scope.save = function () {
        var firstname = $scope.input.firstname;
        var lastname = $scope.input.lastname;
        var data = {
            id: user,
            firstname: firstname,
            lastname: lastname
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
});