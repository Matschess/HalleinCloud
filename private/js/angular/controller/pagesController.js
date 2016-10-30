myApp.controller('pagesController', function ($scope, $http) {
    $scope.config = {
        title: 'Mahlzeiten',
        actions: [
            {title: 'Speichern', icon: 'done', route: '/page'},
            {title: 'Verwerfen', icon: 'close', route: '/'}
        ],
        content: 'content/page.html'
    }

    $http.get(URL + '/restaurants?user=' + user)
        .then(function (response) {
            $scope.pages = response.data[0];
        });

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