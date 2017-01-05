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

    $http.get(URL + '/help?get=id,question,answer')
        .then(function (response) {
            $scope.questions = response.data;
        });
});