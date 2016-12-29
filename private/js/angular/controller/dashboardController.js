myApp.controller('dashboardController', function ($scope, $http) {
    $scope.config = {
        content: 'content/dashboard.html'
    }

    $scope.notifications = [];

    if (userType == 3) {
        $http.get(URL + '/feedback?get=id&status=1&restaurant=' + restaurant)
            .then(function (response) {
                var feedback = response.data;
                if (feedback.length) {
                    $scope.notifications.push({
                        type: 'alert',
                        number: feedback.length,
                        title: 'Neues Feedback',
                        text: 'Sie haben neues Kundenfeedback.',
                        route: 'feedback'
                    })
                }
                else $scope.notifications.push({
                    type: 'success',
                    title: 'Feedback erledigt',
                    text: 'Sie haben kein neues und offenes Feedback.',
                    route: 'feedback'
                })
            });

        $http.get(URL + '/openingTimes?get=id&restaurant=' + restaurant)
            .then(function (response) {
                var openingTimes = response.data;
                if (!openingTimes.length) {
                    $scope.notifications.push({
                        type: 'warning',
                        title: 'Keine Öffnungszeiten',
                        text: 'Sie haben noch keine Öffnungszeiten eingetragen.',
                        route: 'page'
                    })
                }
            });

        $http.get(URL + '/restaurants?get=street,countryCode,country&id=' + restaurant)
            .then(function (response) {
                var data = response.data[0];
                if (!(data.street && data.countryCode && data.country)) {
                    $scope.notifications.push({
                        type: 'warning',
                        title: 'Adresse unvollständig',
                        text: 'Ihre Adressdaten sind nicht vollständig.',
                        route: 'page'
                    })
                }
            });
    }
});