myApp.controller('bugReportController', function ($scope, $location, $http) {
    $scope.config = {
        title: 'Fehler melden',
        actions: [
            {title: 'Melden', icon: 'done'},
            {title: 'Verwefen', icon: 'close', route: '/help'}
        ],
        content: 'content/help-bugreport.html',
        return: function (index, e) {
            switch (index) {
                case 0:
                    if ($scope.input.description) {
                        var data = {
                            description: $scope.input.description
                        }
                        $http({
                            url: URL + '/bugreport',
                            method: 'POST',
                            params: data
                        }).then(function () {
                                $location.path('/help');
                                globalNotification('success', 'Danke! Der Fehler wurde gemeldet.')
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
});