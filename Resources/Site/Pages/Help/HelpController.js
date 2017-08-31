halleinCloud.controller('HelpController', function ($scope, $http) {
    $scope.config = {
        title: 'HELP',
        actions: [
            {title: 'REPORT-A-BUG', icon: 'build', route: '/help/bugreport'},
            {title: 'GIVE-FEEDBACK', icon: 'thumbs_up_down', route: '/help/feedback'},
            {title: 'ASK-A-QUESTION', icon: 'edit', route: '/help/add'}
        ],
        content: 'Web/Content/Help.html'
    }

    $scope.faqs = [];

    switch (userType) {
        case 2:
            var categories = [
                {id: 1, name: 'GENERAL'},
                {id: 2, name: 'LOGIN'},
                {id: 6, name: 'USER'}
            ]
            break;
        case 3:
            var categories = [
                {id: 1, name: 'GENERAL'},
                {id: 2, name: 'LOGIN'},
                {id: 3, name: 'MEALS'},
                {id: 4, name: 'FEEDBACK'},
                {id: 5, name: 'RESTAURANTPAGE'},
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