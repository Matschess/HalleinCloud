myApp.controller('usersController', function ($scope, $http, ngDialog) {
    $scope.config = {
        title: 'Benutzer',
        actions: [
            {title: 'Hinzufügen', icon: 'add', route: '/user/add'}
        ],
        content: 'content/user.html'
    }

    $http.get(URL + '/users?get=id,username,type,lastActive')
        .then(function (response) {
            var data = response.data;
            for (var i = 0; i < data.length; i++) {
                if (userType != 1 && data[i].type == 1) continue;
                if (data[i].id == user) {
                    data[i].actions = {
                        edit: true
                    };
                    continue;
                }
                data[i].actions = {
                    edit: true,
                    delete: true
                };
            }
            $scope.users = data;
        });

    $scope.sort = function (property) {
        $scope.users.sort(dynamicSort(property));
    }

    function dynamicSort(property) {
        return function (a, b) {
            var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
            return result;
        }
    }

    $scope.deleteUser = function (id, index) {
        ngDialog.openConfirm({
            controller: ['$scope', function ($scope) {
                $scope.dialog = {
                    content: 'Wollen Sie den Benutzer löschen?',
                    options: {
                        confirm: 'Löschen',
                        abort: 'Abbrechen'
                    }
                }
            }]
        }).then(function () {
            var params = "?id=" + id;
            $http.delete(URL + '/users' + params)
                .then(function () {
                        $scope.users.splice(index, 1);
                        globalNotification('success', 'Der Benutzer wurde gelöscht.')
                    },
                    function () {
                        globalNotification('error')
                    });
        });
    }
});