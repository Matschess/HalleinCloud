myApp.controller('helpAddController', function ($scope, $location, $http) {
    $scope.config = {
        title: 'Frage stellen',
        actions: [
            {title: 'Abschicken', icon: 'done'},
            {title: 'Verwefen', icon: 'close', route: '/help'}
        ],
        content: 'content/help-add.html',
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

    $scope.input = {
        veggie: 0
    };

    $scope.types = {
        selected: {id: 2, name: 'Hauptspeise'},
        options: [
            {id: 1, name: 'Vorspeise'},
            {id: 2, name: 'Hauptspeise'},
            {id: 3, name: 'Nachspeise'}
        ]
    }

    $scope.tags = [
        {name: 'putenstreifensalat', class: 'red'},
        {name: 'salat', class: 'yellow'},
        {name: 'geflügel', class: 'orange'},
    ];
    $scope.removeTag = function (index) {
        $scope.tags.splice(index, 1);
    }

    $scope.foodAdd = function () {
        alert('oe')
    }
});