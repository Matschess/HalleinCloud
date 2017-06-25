myApp.controller('pageController', function ($scope, $location, $http) {
    $scope.input = {};
    $scope.config = {
        activeTab: 0,
        tabs: [
            {title: 'GENERAL', link: 'page#general', content: 'content/restaurant/general.html',
                actions: [
                    {title: 'SAVE', icon: 'done',
                    returnFunction: function(){
                        var input = $scope.input.general;
                        if (input.restaurantname && input.street && input.houseNumber && input.countryCode && input.country) {
                            var data = {
                                id: restaurant,
                                restaurantname: input.restaurantname,
                                description: input.description,
                                description_en: input.description_en,
                                studentMeals: input.studentMeals,
                                reservation: input.reservation,
                                groupsWelcome: input.groupsWelcome,
                                petsWelcome: input.petsWelcome,
                                cornKitchen: input.cornKitchen,
                                acceptsKelteneuro: input.acceptsKelteneuro,
                                acceptsCard: input.acceptsCard,
                                street: input.street,
                                houseNumber: input.houseNumber,
                                countryCode: input.countryCode,
                                country: input.country,
                                parking: input.parking,
                                email: input.email,
                                tel: input.tel,
                                website: input.website
                            }
                            data = prepareUpload(data);
                            console.log(data);
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
                    {title: 'DISCARD', icon: 'close', route: '/'}
                ],},
            {title: 'OPENINGTIMES', link: 'page#times', content: 'content/restaurant/times.html',
                actions: [
                    {title: 'CLOSE', icon: 'close', route: '/'}
                ],},
            {title: 'DESIGN', link: 'page#design', content: 'content/restaurant/design.html',
                actions: [
                    {title: 'CLOSE', icon: 'close', route: '/'}
                ],}
        ]
    }

    switch($location.hash()){
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
});