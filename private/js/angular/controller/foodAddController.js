myApp.controller('foodAddController', function ($scope, $location, $http) {
    $scope.config = {
        title: 'Mahlzeit hinzufügen',
        actions: [
            {title: 'Speichern', icon: 'done', route: '/food'},
            {title: 'Verwefen', icon: 'close', route: '/food'}
        ],
        content: 'content/food-add.html',
        return: function (index, e) {
            switch (index) {
                case 0:
                    if ($scope.input.description) {
                        var data = {
                            restaurant: restaurant,
                            type: $scope.types.selected.id,
                            description: $scope.input.description,
                            veggie: $scope.input.veggie,
                        }
                        $http({
                            url: URL + '/meals',
                            method: 'POST',
                            params: data
                        }).then(function () {
                                $location.path('/food');
                                globalNotification('success', 'Die Mahlzeit wurde hinzugefügt.')
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