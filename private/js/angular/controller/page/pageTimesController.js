myApp.controller('pageTimesController', function ($scope, $http, ngDialog) {
    $scope.weekdays = {
        selected: {id: 0, name: 'Sonntag'},
        options: [
            {id: 0, name: 'Sonntag'},
            {id: 1, name: 'Montag'},
            {id: 2, name: 'Dienstag'},
            {id: 3, name: 'Mittwoch'},
            {id: 4, name: 'Donnerstag'},
            {id: 5, name: 'Freitag'},
            {id: 6, name: 'Samstag'}
        ]
    }

    $scope.showOpeningTimesAdd = function () {
        $scope.validOpeningTimes = false;
        ngDialog.open({
            template: 'content/dialogs/openingTimesAdd.html',
            appendClassName: 'ngdialog-theme-cropper',
            scope: $scope
        });
    }

    $scope.validateOpeningTimes = function(opens, closes){
        var pattern = new RegExp(/^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/i);
       if(pattern.test(opens) && pattern.test(closes)) {
           $scope.validOpeningTimes = true;
       }
       else $scope.validOpeningTimes = false;
    }

    $scope.input = {
        openingTimes: []
    };

    $scope.openingTimeAdd = function (weekday, opens, closes) {
        if (opens && closes) {
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

    var today = new Date();
    today.setHours(0,0,0,0);
    $scope.datepickerConfig = {
        dateFormat: 'DD.MM.YYYY',
        minDate: today
    };

    $scope.showRestDayAdd = function () {
        $scope.validRestDays = false;
        ngDialog.open({
            template: 'content/dialogs/restDayAdd.html',
            appendClassName: 'ngdialog-theme-cropper',
            scope: $scope
        });
    }

    $scope.validateRestDays = function(from, to){
        var pattern = new RegExp(/^\d{2}[./-]\d{2}[./-]\d{4}$/i);
        if(pattern.test(from) && pattern.test(to)) {
            $scope.validRestDays = true;
        }
        else $scope.validRestDays = false;
    }

    $scope.restDayAdd = function (from, to, description) {
        if (from && to) {
            if (stringToDate(from) >= today && stringToDate(to) >= today) {
                var date = stringToDate(from);
                date.setDate(date.getDate() - 1);
                var dateTo = stringToDate(to);
                var diff = Math.abs(dateTo.getTime() - date.getTime());
                var diff = Math.ceil(diff / (1000 * 3600 * 24));
                if(diff < 30) {
                    for (var i = 0; i < diff; i++) {
                        date.setDate(date.getDate() + 1);
                        var dateFormatted = dateToString(date);
                        var data = {
                            restaurant: restaurant,
                            date: dateFormatted,
                            description: description
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
                    }
                    return true;
                }
                else globalNotification('warning', 'Wählen Sie maximal 30 Tage.');
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
        $http.get(URL + '/openingTimes?get=id,weekday,opens:noSeconds,closes:noSeconds&orderBy=weekday&restaurant=' + restaurant)
            .then(function (response) {
                $scope.input.openingTimes = response.data;
            });

        $http.get(URL + '/restDays?get=id,date,description&orderBy=date&restaurant=' + restaurant)
            .then(function (response) {
                $scope.restDays = response.data;
            });
    }
});