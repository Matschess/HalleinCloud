myApp.controller('supportController', function ($scope, $location, $http) {
    $scope.config = {
        title: 'Support',
        actions: [
            {title: 'Frage erstellen', icon: 'add', route: '/support-add'}
        ],
        content: 'content/support.html',
        return: function (index, e) {
            switch (index) {
                case 0:
                    if ($scope.input.question) {
                        var data = {
                            user: restaurant,
                            question: $scope.input.question
                        }
                        $http({
                            url: URL + '/help',
                            method: 'POST',
                            params: data
                        }).then(function () {
                                $location.path('/help');
                                globalNotification('success', 'Die Frage wurde abgeschickt.')
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

    $http.get(URL + '/help?get=id,question,lastEdited&answer=false')
        .then(function (response) {
            $scope.unreplied = response.data;
        });

    $http.get(URL + '/help?get=id,question,category,lastEdited&answer=true')
        .then(function (response) {
            $scope.replied = response.data;
        });

    $http.get(URL + '/bugreport')
        .then(function (response) {
            $scope.bugs = response.data;
        });

    $scope.category = {
        selected: {id: 1, name: 'Allgemein'},
        options: [
            {id: 1, name: 'Allgemein'},
            {id: 2, name: 'Login'},
            {id: 3, name: 'Mahlzeiten'},
            {id: 4, name: 'Feedback'},
            {id: 5, name: 'Restaurantseite'},
            {id: 6, name: 'Benutzer'}
        ]
    }

    $scope.sort = function (object, property) {
        $scope[object].sort(dynamicSort(property));
    }

    function dynamicSort(property) {
        return function (a, b) {
            var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
            return result;
        }
    }

    $scope.delete = function (id, object, index) {
        if (object == 'bugs') {
            var data = {
                id: id
            }
            $http({
                url: URL + '/bugreport',
                method: 'DELETE',
                params: data
            }).then(function () {
                    $scope[object].splice(index, 1);
                    globalNotification('success', 'Der Bugreport wurde gelöscht.')
                },
                function () {
                    globalNotification('error')
                });
        }
        else {
            var data = {
                id: id
            }
            $http({
                url: URL + '/help',
                method: 'DELETE',
                params: data
            }).then(function () {
                    $scope[object].splice(index, 1);
                    globalNotification('success', 'Die Frage wurde gelöscht.')
                },
                function () {
                    globalNotification('error')
                });
        }
    }
});