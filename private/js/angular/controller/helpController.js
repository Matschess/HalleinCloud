myApp.controller('helpController', function ($scope, $http) {
    $scope.config = {
        title: 'Hilfe',
        actions: [
            {title: 'Feedback geben', icon: 'thumbs_up_down', route: '/help-feedback-add'},
            {title: 'Frage stellen', icon: 'add', route: '/help-add'}
        ],
        content: 'content/help.html'
    }

    $http.get(URL + '/help?get=question,answer')
        .then(function (response) {
            $scope.questions = response.data;
        });
});