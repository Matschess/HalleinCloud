myApp.controller('supportController', function ($scope, $location, $http) {
    $scope.config = {
        title: 'Support',
        actions: [
            {title: 'Frage erstellen', icon: 'add', route: '/support-add'}
        ],
        content: 'content/support.html',
        return: function (index, e) {
            switch (index) {
                case 0:
                    if ($scope.input.question) {
                        var data = {
                            user: restaurant,
                            question: $scope.input.question
                        }
                        $http({
                            url: URL + '/help',
                            method: 'POST',
                            params: data
                        }).then(function () {
                                $location.path('/help');
                                globalNotification('success', 'Die Frage wurde abgeschickt.')
                            },
                            function () {
                                globalNotification('error')
                            });
                    }
                    else {
                        globalNotification('warning', 'Bitte geben Sie alle Daten ein.')
                    }
                    break;
            }
        }
    }

    $http.get(URL + '/help?get=id,question,lastEdited&unreplied=true')
        .then(function (response) {
            $scope.unreplied = response.data;
        });

    $http.get(URL + '/help?get=id,question,answer,category,lastEdited')
        .then(function (response) {
            var data = response.data;
            for(var i = 0; i < data.length; i++){
                var category;
                switch(data[i].category){
                    case 1:
                        category = 'Allgemein';
                        break;
                    case 2:
                        category = 'Login';
                        break;
                    case 3:
                        category = 'Mahlzeiten';
                        break;
                    case 4:
                        category = 'Feedback';
                        break;
                    case 5:
                        category = 'Restaurantseite';
                        break;
                    case 6:
                        category = 'Benutzer';
                }
                data[i].category = category;
            }
            $scope.replied = data;
        });
});