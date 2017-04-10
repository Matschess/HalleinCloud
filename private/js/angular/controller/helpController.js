myApp.controller('helpController', function ($scope, $http) {
    $scope.config = {
        title: 'Hilfe',
        actions: [
            {title: 'Fehler melden', icon: 'build', route: '/help/bugreport'},
            {title: 'Feedback geben', icon: 'thumbs_up_down', route: '/help/feedback'},
            {title: 'Frage stellen', icon: 'edit', route: '/help/add'}
        ],
        content: 'content/help.html'
    }

    $scope.faqs = [];

    switch (userType) {
        case 2:
            var categories = [
                {id: 1, name: 'Allgemein'},
                {id: 2, name: 'Login'},
                {id: 6, name: 'Benutzer'}
            ]
            break;
        case 3:
            var categories = [
                {id: 1, name: 'Allgemein'},
                {id: 2, name: 'Login'},
                {id: 3, name: 'Mahlzeiten'},
                {id: 4, name: 'Feedback'},
                {id: 5, name: 'Restaurantseite'},
            ]
            break;
    }

    $scope.categories = categories;

    var data = {
        cateory: categories.map(function (a) {
            return a.id;
        })
    };

    $http({
        url: URL + '/help',
        method: 'GET',
        params: data
    }).then(function (response) {
        $scope.faqs = response.data;
    });
});