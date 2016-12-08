myApp.controller('passwordSettingsController', function ($scope, $http) {
    $scope.input = {};

    $scope.save = function () {
        if ($scope.input.pwOld && $scope.input.pwNew && $scope.input.pwRepeat) {
            if ($scope.input.pwNew == $scope.input.pwRepeat) {
                var data = {
                    id: user,
                    passwordOld: $scope.input.pwOld,
                    passwordNew: $scope.input.pwNew
                }
                data = prepareUpload(data);
                $http({
                    url: URL + '/pwchange',
                    method: 'PUT',
                    params: data
                }).then(function () {
                        globalNotification('success', 'Das Passwort wurde geändert.');
                        $scope.input = {}
                    },
                    function (response) {
                    if(response.status == 400){
                        globalNotification('error', 'Das alte Passwort ist nicht korrekt.');
                    }
                    else globalNotification('error');
                    });
            }
            else  globalNotification('warning', 'Die Passwörter stimmen nicht überein.')
        }
        else  globalNotification('warning', 'Bitte geben Sie alle Daten ein.')
    }
});