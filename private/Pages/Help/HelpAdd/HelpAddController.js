halleinApp.controller('HelpAddController', function ($scope, $location, $http) {
    $scope.config = {
        title: 'Frage stellen',
        actions: [
            {title: 'Abschicken', icon: 'done'},
            {title: 'Verwefen', icon: 'close', route: '/help'}
        ],
        content: 'Public/Content/HelpAdd.html',
        return: function (index, e) {
            switch (index) {
                case 0:
                    if ($scope.input.question) {
                        console.log($scope.input.emailReply);
                        if ($scope.input.emailReply) {
                            var data = {
                                user: user,
                                question: $scope.input.question
                            }
                        }
                        else {
                            var data = {
                                question: $scope.input.question
                            }
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

    $scope.input = {
        emailReply: true
    };
});