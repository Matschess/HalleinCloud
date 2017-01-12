myApp.controller('helpAddController', function ($scope, $location, $http) {
    $scope.config = {
        title: 'Frage stellen',
        actions: [
            {title: 'Abschicken', icon: 'done'},
            {title: 'Verwefen', icon: 'close', route: '/help'}
        ],
        content: 'content/help-add.html',
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
});