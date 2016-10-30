myApp.controller('dashboardController', function ($scope) {
    $scope.config = {
        content: 'content/dashboard.html'
    }

    $scope.notifications = [
        {type: 'alert', number: 3, title: 'Fehler', text: 'Dies ist eine Fehler oder Nicht-behoben-Box.'},
        {type: 'success', title: 'Erfolg', text: 'Eine Erfolgsmeldung.'},
        {type: 'warning', title: 'Warnung', text: 'So sieht eine Warnung aus.'}
    ]
});