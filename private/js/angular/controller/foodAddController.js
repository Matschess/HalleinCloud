myApp.controller('foodAddController', function ($scope, $routeParams, $location, $http) {
    $scope.config = {
        title: 'Mahlzeit hinzufügen',
        actions: [
            {title: 'Speichern', icon: 'done'},
            {title: 'Verwefen', icon: 'close', route: '/meal'}
        ],
        content: 'content/meal-add.html',
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
                                $location.path('/meal');
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

    switch($routeParams.mealtype){
        case 'appetizer':
            $scope.types.selected = $scope.types.options[0];
            break;
        case 'dessert':
            $scope.types.selected = $scope.types.options[2];
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