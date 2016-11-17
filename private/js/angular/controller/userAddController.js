myApp.controller('userAddController', function ($scope, $http) {
    $scope.config = {
        title: 'Benutzer hinzufügen',
        actions: [
            {title: 'Speichern', icon: 'done', route: '/users'},
            {title: 'Verwerfen', icon: 'close', route: '/users'}
        ],
        content: 'content/user-add.html',
        return: function (index) {
            switch (index) {
                case 0:
                    console.log( $scope.firstname);
                    switch ($scope.types.selected) {

                        case 1:
                            var name = $scope.firstname + ' ' + $scope.lastname;

                        case 2:
                            var name = $scope.restaurantname;
                    }
                    alert($scope.pwTemp);

                    var data = {
                        username: $scope.username,
                        firstname: $scope.firstname,
                        lastname: $scope.lastname,
                        type: $scope.types.selected,
                        password: $scope.password,
                        pwTemp: $scope.pwTemp
                    }
                    $http({
                        url: URL + '/users',
                        method: 'POST',
                        params: data
                    });
                    break;
            }
        }
    }

    $scope.types = {
        selected: {id: 3, name: 'Restaurant', group: 'restaurants'},
        options: [
            {id: 1, name: 'Superuser', group: 'superuser'},
            {id: 2, name: 'Administrator', group: 'admins'},
            {id: 3, name: 'Restaurant', group: 'restaurants'}
        ]
    }

    $scope.pwTemp = true;
    $scope.restaurantname = '';

    generateRandom(10);

    $scope.generatePassword = function () {
        generateRandom(10);
    }

    function generateRandom(length) {
        var password = '';
        var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

        for (var i = 0; i < length; i++)
            password += possible.charAt(Math.floor(Math.random() * possible.length));

        $scope.password = password;
    }
});