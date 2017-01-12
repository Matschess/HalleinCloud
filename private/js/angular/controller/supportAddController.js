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
                    }5
                    break;
            }
        }
    }

    $scope.categories = {
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