myApp.controller('pageTimesController', function ($scope, $http, ngDialog) {
    $scope.datepickerConfig = {
        dateFormat: 'DD.MM.YYYY'
    };

    $scope.weekdays = {
        selected: {id: 1, name: 'Montag'},
        options: [
            {id: 1, name: 'Montag'},
            {id: 2, name: 'Dienstag'},
            {id: 3, name: 'Mittwoch'},
            {id: 3, name: 'Donnerstag'},
            {id: 3, name: 'Freitag'},
            {id: 3, name: 'Samstag'},
            {id: 3, name: 'Sonntag'}
        ]
    }

    $scope.showOpeningTimesAdd = function() {
        ngDialog.open({
            template: 'content/dialogs/openingTimesAdd.html',
            appendClassName: 'ngdialog-theme-cropper',
            scope: $scope
        });
    }

    $scope.input = {
        openingTimes: []
    };

    $scope.openingTimeAdd = function (weekday, opens, closes) {
        if (weekday && opens && closes) {
            $scope.input.openingTimes.push({
                weekday: weekday,
                opens: opens,
                closes: closes
            })
            return true;
            /*
                    var data = {
                        restaurant: restaurant,
                        date: dateFormatted,
                        description: $scope.input.restDayDescription
                    }
                    data = prepareUpload(data);
                    $http({
                        url: URL + '/restDays',
                        method: 'POST',
                        params: data
                    }).then(function () {
                            globalNotification('success', 'Der Ruhetag wurde gespeichert.');
                            $scope.restDayShow = false;
                            load();
                        },
                        function () {
                            globalNotification('alert')
                        });
            */
        }
        else {
            globalNotification('warning', 'Bitte geben Sie alle Daten ein.')
        }
    }

    $scope.showRestDayAdd = function() {
        ngDialog.open({
            template: 'content/dialogs/restDayAdd.html',
            appendClassName: 'ngdialog-theme-cropper',
            scope: $scope
        });
    }

    $scope.restDayShow = false;
    $scope.restDayDateAssume = function () {
        $scope.input.restDayTo = $scope.input.restDayFrom;
    }
    $scope.restDayAdd = function () {
        if ($scope.input.restDayFrom && $scope.input.restDayTo) {
            var date = stringToDate($scope.input.restDayFrom);
            date.setDate(date.getDate() - 1);
            var dateTo = stringToDate($scope.input.restDayTo);
            var diff = Math.abs(dateTo.getTime() - date.getTime());
            var diff = Math.ceil(diff / (1000 * 3600 * 24));
            if (diff < 7) {
                for (var i = 0; i < diff; i++) {
                    date.setDate(date.getDate() + 1);
                    var dateFormatted = dateToString(date);
                    var data = {
                        restaurant: restaurant,
                        date: dateFormatted,
                        description: $scope.input.restDayDescription
                    }
                    data = prepareUpload(data);
                    $http({
                        url: URL + '/restDays',
                        method: 'POST',
                        params: data
                    }).then(function () {
                            globalNotification('success', 'Der Ruhetag wurde gespeichert.');
                            $scope.restDayShow = false;
                            load();
                        },
                        function () {
                            globalNotification('alert')
                        });
                }
            }
            else globalNotification('error', 'Bitte geben Sie einen geringeren Zeitabstand ein.')
        }
        else {
            globalNotification('warning', 'Bitte geben Sie alle Daten ein.')
        }
    }

    load();

    function load() {
           $http.get(URL + '/openingTimes?get=id,weekday,opens:noSeconds,closes:noSeconds&restaurant=' + restaurant)
            .then(function (response) {
                $scope.input.openingTimes = response.data;
            });

        $http.get(URL + '/restDays?get=id,date:localDate,description&orderBy=date&restaurant=' + restaurant)
            .then(function (response) {
                $scope.restDays = response.data;
            });
    }
});