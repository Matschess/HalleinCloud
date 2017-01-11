myApp.controller('userAddController', function ($scope, $location, $http) {
    $scope.config = {
        title: 'Benutzer hinzufügen',
        actions: [
            {title: 'Speichern', icon: 'done'},
            {title: 'Verwerfen', icon: 'close', route: '/users'}
        ],
        content: 'content/user-add.html',
        return: function (index, e) {
            switch (index) {
                case 0:
                    if ($scope.input.firstname && $scope.input.lastname) {
                        var data = {
                            username: $scope.input.username,
                            firstname: $scope.input.firstname,
                            lastname: $scope.input.lastname,
                            email: $scope.input.email,
                            type: $scope.types.selected.id,
                            password: $scope.input.password,
                            pwTemp: $scope.input.pwTemp
                        }
                        $http({
                            url: URL + '/users',
                            method: 'POST',
                            params: data
                        }).then(function () {
                                $location.path('/users');
                                globalNotification('success', 'Der Benutzer wurde erstellt.')
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

    $scope.input = {
        pwTemp: 1
    };

    if (userType == 1) {
        $scope.types = {
            selected: {id: 3, name: 'Restaurant', group: 'restaurants'},
            options: [
                {id: 1, name: 'Superuser', group: 'superuser'},
                {id: 2, name: 'Administrator', group: 'admins'},
                {id: 3, name: 'Restaurant', group: 'restaurants'}
            ]
        }
    }
    else {
        $scope.types = {
            selected: {id: 3, name: 'Restaurant', group: 'restaurants'},
            options: [
                {id: 2, name: 'Administrator', group: 'admins'},
                {id: 3, name: 'Restaurant', group: 'restaurants'}
            ]
        }
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