myApp.controller('helpController', function ($scope, $http) {
    $scope.config = {
        title: 'Hilfe',
        actions: [
            {title: 'Frage stellen', icon: 'add', route: '/help-add'}
        ],
        content: 'content/help.html'
    }

    $scope.questions=[
        {question: 'Probleme beim eintragen Ihrer Restaurantdaten?', answer: 'Klicken sie dazu auf Restaurantseite, und geben sie wie gefordert Ihre Daten ein, danach klicken sie auf das Häkchen.'},
        {question: 'Probleme bein ein- oder ausloggen?', answer: 'Kontaktieren sie bitte den Support: 06645613657.'}
        ]
});