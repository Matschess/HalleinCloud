halleinApp.controller('PasswordSettingsController', function ($scope, $http) {
    $scope.input = {};

    $scope.pwValidate = function (pwNew) {
        var pwNew = pwNew.toString();
        $scope.pwSafety = 0;
        if (pwNew.length) {
            $scope.pwSafety++;
        }
        if (pwNew.match(".{8}[a-z]")) {
            $scope.pwSafety++;
        }
        if (pwNew.match("[0-9]?[A-Z]")) {
            $scope.pwSafety++;
        }
        if (pwNew.match("[!\"§$%&/()=?]")) {
            $scope.pwSafety++;
        }
    }

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
                        $scope.input = {};
                        $scope.pwSafety = 0;
                    },
                    function (response) {
                        if (response.status == 404) {
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