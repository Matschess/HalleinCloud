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

    load();

    function load() {
        $http.get(URL + '/restaurants?user=' + user)
            .then(function (response) {
                $scope.input = response.data[0];
            });
    }

    $scope.days = [
        {shorthand: 'Mo', from: '08:00', toHalf: '14:00', fromHalf: '15:00', to: '22:00'},
        {shorthand: 'Di'},
        {shorthand: 'Mi'},
        {shorthand: 'Do'},
        {shorthand: 'Fr'},
        {shorthand: 'Sa'},
        {shorthand: 'So'}
    ];
    $scope.restDays = [
        {fromDate: '22.10.2016', toDate: '22.10.2016'},
        {fromDate: '24.10.2016', toDate: '25.11.2016'},
        {fromDate: '20.10.2016', toDate: '22.10.2016'}
    ];
    $scope.sleep = function (index) {
        $scope.days[index].sleep = !$scope.days[index].sleep;
    }
    $scope.restDayRemove = function (index) {
        $scope.restDays.splice(index, 1);
    }
});