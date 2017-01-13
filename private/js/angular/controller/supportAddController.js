myApp.controller('supportAddController', function ($scope, $location, $http) {
    $scope.config = {
        title: 'Frage erstellen',
        actions: [
            {title: 'Erstellen', icon: 'done'},
            {title: 'Verwefen', icon: 'close', route: '/support'}
        ],
        content: 'content/support-add.html',
        return: function (index, e) {
            switch (index) {
                case 0:
                    if ($scope.input.category.selected && $scope.input.question && $scope.input.answer) {
                        var data = {
                            category: $scope.input.category.selected.id,
                            question: $scope.input.question,
                            anwer: $scope.input.answer
                        }
                        $http({
                            url: URL + '/help',
                            method: 'POST',
                            params: data
                        }).then(function () {
                                $location.path('/support');
                                globalNotification('success', 'Die Frage wurde erstellt.')
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

    $scope.input = {};

    $scope.input.category = {
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
});