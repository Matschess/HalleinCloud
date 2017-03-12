myApp.controller('pageController', function ($scope, $routeParams, $http) {
    $scope.input = {};
    $scope.config = {
        activeTab: 0,
        tabs: [
            {title: 'Allgemein', link: 'page/general', content: 'content/restaurant/general.html',
                actions: [
                    {title: 'Speichern', icon: 'done',
                    returnFunction: function(){
                        if ($scope.input.general.restaurantname) {
                            alert($scope.input.general.studentMeals)
                            var data = {
                                id: user,
                                restaurantname: $scope.input.general.restaurantname,
                                description: $scope.input.general.description,
                                studentMeals: $scope.input.general.studentMeals,
                                street: $scope.input.general.street,
                                houseNumber: $scope.input.general.houseNumber,
                                countryCode: $scope.input.general.countryCode,
                                country: $scope.input.general.country,
                                email: $scope.input.general.email,
                                tel: $scope.input.general.tel,
                                website: $scope.input.general.website
                            }
                            data = prepareUpload(data);
                            $http({
                                url: URL + '/restaurants',
                                method: 'PUT',
                                params: data
                            }).then(function () {
                                    globalNotification('success', 'Die Daten wurden gespeichert.');
                                    $scope.input.loadGeneral();
                                },
                                function () {
                                    globalNotification('error')
                                });
                        }
                        else {
                            globalNotification('warning', 'Bitte geben Sie alle Daten ein.')
                        }
                    }},
                    {title: 'Verwerfen', icon: 'close', route: '/'}
                ],},
            {title: 'Öffnungszeiten', link: 'page/times', content: 'content/restaurant/times.html',
                actions: [
                    {title: 'Schließen', icon: 'close', route: '/'}
                ],},
            {title: 'Design', link: 'page/design', content: 'content/restaurant/design.html',
                actions: [
                    {title: 'Schließen', icon: 'close', route: '/'}
                ],}
        ]
    }

    switch($routeParams.subpage){
        case 'general':
            $scope.config.activeTab = '0'
            break;
        case 'times':
            $scope.config.activeTab = '1'
            break;
        case 'design':
            $scope.config.activeTab = '2'
            break;
        default:
            $scope.config.activeTab = '0'
    }

    function saveGeneral() {

    }
});