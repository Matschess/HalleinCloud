myApp.controller('pageTimesController', function ($scope, $http, ngDialog) {
    $scope.weekdays = {
        selected: {id: 1, name: 'Montag'},
        options: [
            {id: 1, name: 'Montag'},
            {id: 2, name: 'Dienstag'},
            {id: 3, name: 'Mittwoch'},
            {id: 4, name: 'Donnerstag'},
            {id: 5, name: 'Freitag'},
            {id: 6, name: 'Samstag'},
            {id: 7, name: 'Sonntag'}
        ]
    }

    $scope.showOpeningTimesAdd = function () {
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
            var data = {
                restaurant: restaurant,
                weekday: weekday,
                opens: opens,
                closes: closes
            }
            data = prepareUpload(data);
            $http({
                url: URL + '/openingTimes',
                method: 'POST',
                params: data
            }).then(function (response) {
                    var id = response.data.id;
                    globalNotification('success', 'Eingetragen.');
                    $scope.input.openingTimes.push({
                        id: id,
                        weekday: weekday,
                        opens: opens,
                        closes: closes
                    })
                },
                function () {
                    globalNotification('error')
                });
            return true;
        }
        else {
            globalNotification('warning', 'Bitte geben Sie alle Daten ein.')
        }
    }

    $scope.openingTimeRemove = function (id, index) {
        var data = {
            id: id,
        }
        $http({
            url: URL + '/openingTimes',
            method: 'DELETE',
            params: data
        }).then(function () {
                globalNotification('success', 'Gelöscht.');
                $scope.input.openingTimes.splice(index, 1);
            },
            function () {
                globalNotification('error')
            });
    }

    $scope.datepickerConfig = {
        dateFormat: 'DD.MM.YYYY',
        minDate: new Date()
    };

    $scope.showRestDayAdd = function () {
        ngDialog.open({
            template: 'content/dialogs/restDayAdd.html',
            appendClassName: 'ngdialog-theme-cropper',
            scope: $scope
        });
    }

    $scope.restDayDateAssume = function () {
        $scope.input.restDayTo = $scope.input.restDayFrom;
    }

    $scope.restDayAdd = function () {
        if ($scope.input.restDayFrom && $scope.input.restDayTo) {
            if (stringToDate($scope.input.restDayFrom) >= new Date() && stringToDate($scope.input.restDayTo) >= new Date()) {
                var date = stringToDate($scope.input.restDayFrom);
                date.setDate(date.getDate() - 1);
                var dateTo = stringToDate($scope.input.restDayTo);
                var diff = Math.abs(dateTo.getTime() - date.getTime());
                var diff = Math.ceil(diff / (1000 * 3600 * 24));
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
                            load();
                        },
                        function () {
                            globalNotification('alert')
                        });
                    return true;
                }
            }
            else globalNotification('warning', 'Datum liegt in der Vergangenheit.');
        }
        else {
            globalNotification('warning', 'Bitte geben Sie alle Daten ein.')
        }
    }

    $scope.restDayRemove = function (id, index) {
        var data = {
            id: id,
        }
        $http({
            url: URL + '/restDays',
            method: 'DELETE',
            params: data
        }).then(function () {
                globalNotification('success', 'Gelöscht.');
                $scope.restDays.splice(index, 1);
            },
            function () {
                globalNotification('error')
            });
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