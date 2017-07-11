myApp.controller('supportEditController', function ($scope, $routeParams, $location, $http) {
    $scope.config = {
        title: 'EDIT-QUESTION',
        actions: [
            {title: 'SAVE', icon: 'done'},
            {title: 'DISCARD', icon: 'close', route: '/support'}
        ],
        content: 'content/support-edit.html',
        return: function (index, e) {
            switch (index) {
                case 0:
                    if ($scope.input.category.selected && $scope.input.question && $scope.input.answer) {
                        var data = {
                            id: id,
                            category: $scope.input.category.selected.id,
                            question: $scope.input.question,
                            answer: $scope.input.answer
                        }
                        $http({
                            url: URL + '/help',
                            method: 'PUT',
                            params: data
                        }).then(function () {
                                $location.path('/support');
                                globalNotification('success', 'Die Frage wurde gespeichert.')
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

    $scope.input = {name: 'sdd'};

    $scope.input.category = {
        selected: {},
        options: [
            {id: 1, name: 'Allgemein'},
            {id: 2, name: 'Login'},
            {id: 3, name: 'Mahlzeiten'},
            {id: 4, name: 'Feedback'},
            {id: 5, name: 'Restaurantseite'},
            {id: 6, name: 'Benutzer'}
        ]
    }

    $http.get(URL + '/help?get=question,answer,category&id=' + id)
        .then(function (response) {
            var data = response.data[0];

            $scope.input.question = data.question;
            $scope.input.answer = data.answer;
            if(data.category) {
                $scope.input.category.selected.id = data.category;
            }
        });
});