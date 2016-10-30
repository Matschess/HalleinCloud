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
                 var data = {
                     username: $scope.username,
                     group: $scope.group.selected,
                     password: $scope.password,
                     pwTemp: $scope.pwTemp
                 }
                 $http.post(URL + '/users', data)
                    .success(function (response) {
                    });
                 break;
            }
        }
    }

    $scope.group = {
        selected: 'restaurants',
        options: [
            {name: 'Restaurant', value: 'restaurants'},
            {name: 'Administrator', value: 'admins'}]
    }

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