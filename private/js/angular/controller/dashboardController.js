myApp.controller('dashboardController', function ($scope, $http) {
    $scope.config = {
        content: 'content/dashboard.html'
    }

    $scope.notifications = [];

    $scope.notifications.push({
        type: 'info',
        title: 'Wir wollen Feedback',
        text: "Gefällt Ihnen das Dashboard oder gibt's Probleme? Geben Sie uns gerne Ihr Feedback.",
        route: 'help-feedback-add'
    })

    /*
    $scope.notifications.push({
        type: 'version',
        number: '0.0.0',
        title: 'Neue Version',
        text: 'Eine aktualisierte Version des Hallein Apps Dashboards wurde veröffentlicht. Sehen Sie hier die Änderungen.',
        route: 'help-feedback-add'
    })
    */

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
    else if (userType <= 2) {
        $scope.notifications.push({
            type: 'success',
            title: 'App online',
            text: 'Die App ist aktiviert und online.',
            route: 'app-control'
        })
        /*
        $scope.notifications.push({
            type: 'alert',
            number: 1,
            title: 'App offline',
            text: 'Die App ist heruntergefahren. Klicken für Fehlerbehebung.',
            route: 'app-control'
        })
        */
    }
});