halleinApp.controller('UsersEditController', function ($scope, $routeParams, $location, $http) {
    $scope.config = {
        title: 'EDIT-USER',
        actions: [
            {title: 'SAVE', icon: 'done'},
            {title: 'DISCARD', icon: 'close', route: '/user'}
        ],
        content: 'Public/Content/UsersEdit.html',
        return: function (index, e) {
            switch (index) {
                case 0:
                    if ($scope.input.firstname && $scope.input.lastname) {
                        var data = {
                            id: id,
                            username: ($scope.input.firstname.substr(0, 2) + $scope.input.lastname).toLowerCase(),
                            firstname: $scope.input.firstname,
                            lastname: $scope.input.lastname,
                            email: $scope.input.email
                        }
                        if($scope.input.password){
                            data.password = $scope.input.password;
                            data.pwTemp = $scope.input.pwTemp;
                        }
                        data = prepareUpload(data);
                        $http({
                            url: URL + '/users',
                            method: 'PUT',
                            params: data
                        }).then(function () {
                                $location.path('/user');
                                globalNotification('success', 'Änderungen gespeichert.')
                            },
                            function () {
                                globalNotification('error')
                            });
                    }
                    else {
                        globalNotification('warning', 'Bitte geben Sie alle Daten ein.')
                    }
                    break;
            }
        }
    }

    var id = $routeParams.id;

    $scope.input = {};
    $scope.resetPassword = false;

    $http.get(URL + '/users?get=type,email,firstname,lastname,username&id=' + id)
        .then(function (response) {
            $scope.input = response.data[0];
        });

    $scope.types = {
        selected: {id: 3, name: 'Restaurant', group: 'restaurants'},
        options: [
            {id: 1, name: 'Superuser', group: 'superuser'},
            {id: 2, name: 'Administrator', group: 'admins'},
            {id: 3, name: 'Restaurant', group: 'restaurants'}
        ]
    }

    $scope.restaurantname = '';

    $scope.generateUsername = function () {
        var firstname = $scope.input.firstname;
        var lastname = $scope.input.lastname;
        if(firstname && lastname) {
            var data = {
                firstname: firstname,
                lastname: lastname
            }
            $http({
                url: URL + '/username',
                method: 'GET',
                params: data
            }).then(function (response) {
                console.log(response.data);
                $scope.input.username = response.data;
            });
        }
    }

    $scope.input.password = generateRandom(6);

    $scope.generatePassword = function () {
        $scope.input.password = generateRandom(6);
    }

    function generateRandom(length) {
        var password = '';
        var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

        for (var i = 0; i < length; i++)
            password += possible.charAt(Math.floor(Math.random() * possible.length));

        return password;
    }
});