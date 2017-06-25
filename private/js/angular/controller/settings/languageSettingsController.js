myApp.controller('languageSettingsController', function ($scope, $translate) {
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
        var newLang = $scope.languages.selected.id;
        $translate.use(newLang);
        globalNotification('success', 'SUCC-CHANGED-LANG');
    }
});