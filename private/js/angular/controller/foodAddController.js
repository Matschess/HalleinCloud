myApp.controller('foodAddController', function ($scope) {
    $scope.config = {
        title: 'Mahlzeit hinzufügen',
        actions: [
            {title: 'Speichern', icon: 'done', route: '/food'},
            {title: 'Verwefen', icon: 'close', route: '/food'}
        ],
        content: 'content/food-add.html'
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