myApp.controller('pagesController', function ($scope, $http) {
    $scope.config = {
        title: 'Mahlzeiten',
        actions: [
            {title: 'Speichern', icon: 'done', route: '/page'},
            {title: 'Verwerfen', icon: 'close', route: '/'}
        ],
        content: 'content/page.html',
        return: function (index) {
            switch (index) {
                case 0:
                    if ($scope.input.restaurantname) {
                        var data = {
                            id: user,
                            restaurantname: $scope.input.restaurantname,
                            description: $scope.input.description,
                            studentMeals: $scope.input.studentMeals,
                            street: $scope.input.street,
                            houseNumber: $scope.input.houseNumber,
                            countryCode: $scope.input.countryCode,
                            country: $scope.input.country,
                            email: $scope.input.email,
                            tel: $scope.input.tel,
                            website: $scope.input.website
                        }
                        data = prepareUpload(data);
                        $http({
                            url: URL + '/restaurants',
                            method: 'PUT',
                            params: data
                        }).then(function () {
                                globalNotification('success', 'Die Daten wurden gespeichert.');
                                load();
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

    $scope.restDayShow = false;
    $scope.restDayDateAssume = function () {
        $scope.input.restDayTo = $scope.input.restDayFrom;
    }
    $scope.restDayAdd = function () {
        if ($scope.input.restDayFrom && $scope.input.restDayTo) {
            var data = {
                id: user,
                restaurant: restaurant,
                date: mysqlDate($scope.input.restDayFrom),
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
                    globalNotification('error')
                });
        }
        else {
            globalNotification('warning', 'Bitte geben Sie alle Daten ein.')
        }
    }

    load();

    function load() {
        $http.get(URL + '/restaurants?user=' + user)
            .then(function (response) {
                $scope.input = response.data[0];
            });

        $http.get(URL + '/openingTimes?get=id,weekday,opens:noSeconds,closesHalf:noSeconds,opensHalf:noSeconds,closes:noSeconds&restaurant=' + restaurant)
            .then(function (response) {
                $scope.days = [
                    {id: 1, shorthand: 'Mo'},
                    {id: 2, shorthand: 'Di'},
                    {id: 3, shorthand: 'Mi'},
                    {id: 4, shorthand: 'Do'},
                    {id: 5, shorthand: 'Fr'},
                    {id: 6, shorthand: 'Sa'},
                    {id: 7, shorthand: 'So'}
                ]
                for (var i = 0; i < $scope.days.length; i++) {
                    if (response.data[i]) {
                        $scope.days[i].data = response.data[i];
                    }
                }
            });


        $http.get(URL + '/restDays?get=id,date:localDate,description&orderBy=date&restaurant=' + restaurant)
            .then(function (response) {
                $scope.restDays = response.data;
            });
    }

    $scope.sleep = function (index) {
        if (!$scope.days[index].data) {
            $scope.days[index].data = {};
        }
        else delete $scope.days[index].data;
    }
    $scope.restDayRemove = function (id, index) {
        var data = {
            id: id
        }
        data = prepareUpload(data);
        $http({
            url: URL + '/restDays',
            method: 'DELETE',
            params: data
        }).then(function () {
                globalNotification('success', 'Gelöscht');
                load();
            },
            function () {
                globalNotification('error')
            });
    }
});