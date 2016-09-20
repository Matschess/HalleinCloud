var myApp = angular.module('dashboard',[]);

myApp.controller('NavigationController', ['$scope', function($scope) {
    $scope.links = ['Dashboard', 'Mahlzeiten', 'Feedback', 'Restaurantseite', 'Hilfe'];
    $scope.openSettings = function() {
        $('.overlay').show();
        $('.popup').show();
    }
    $scope.popupClose = function() {
        $('.overlay').hide();
        $('.popup').hide();
    }
}]);