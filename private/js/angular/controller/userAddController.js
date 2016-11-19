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
                            username: ($scope.input.firstname.substr(0, 2) + $scope.input.lastname).toLowerCase(),
                            firstname: $scope.input.firstname,
                            lastname: $scope.input.lastname,
                            email: $scope.input.email,
                            type: $scope.types.selected.id,
                            password: $scope.input.password,
                            pwTemp: 1
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
        pwTemp: true
    };

    $scope.types = {
        selected: {id: 3, name: 'Restaurant', group: 'restaurants'},
        options: [
            {id: 1, name: 'Superuser', group: 'superuser'},
            {id: 2, name: 'Administrator', group: 'admins'},
            {id: 3, name: 'Restaurant', group: 'restaurants'}
        ]
    }

    $scope.restaurantname = '';

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