myApp.controller('languageSettingsController', function ($scope, $translate, translateService) {
    $scope.languages = {
        selected: {},
        options: [
            {id: 'de_AT', name: 'GERMAN'},
            {id: 'en_US', name: 'ENGLISH'}
        ]
    }

    $scope.languages.selected = $scope.languages.options.filter(function( obj ) {
        return obj.id == $translate.use();
    })[0];

    $scope.save = function () {
        translateService.setLang($scope.languages.selected.id)
        globalNotification('success', 'SUCC-CHANGED-LANG');
    }
});