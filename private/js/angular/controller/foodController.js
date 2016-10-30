myApp.controller('foodController', function ($scope, $http, $routeParams) {
    $scope.config = {
        title: 'Mahlzeiten',
        actions: [
            {title: 'Hinzufügen', icon: 'add', route: '/food-add'}
        ],
        content: 'content/food.html'
    }

    $http.get(URL + '/meals?restaurant=' + restaurant)
        .then(function (response) {
            $scope.menus = response.data;
        })
    $scope.days = [
        {name: 'Montag', menu: {appetizer: 1}},
        {name: 'Dienstag'},
        {name: 'Mittwoch'},
        {name: 'Donnerstag'},
        {name: 'Freitag'},
        {name: 'Samstag'},
        {name: 'Sonntag'}
    ];
    $scope.assignMenu = function (index, data) {
        if (!$scope.days[index].menu) {
            $scope.days[index].menu = {};
        }
        switch ($scope.menus[data].type) {
            case 'appetizer':
                $scope.days[index].menu.appetizer = data + 1; // Because a 0 would be a bug
                return;
            case 'mainCourse':
                $scope.days[index].menu.mainCourse = data + 1;
                return;
            case 'dessert':
                $scope.days[index].menu.dessert = data + 1;
                return;
        }
        tooltipstln();
    }
    $scope.removeMenu = function (type, index) {
        switch (type) {
            case 'appetizer':
                delete $scope.days[index].menu.appetizer;
                return;
            case 'mainCourse':
                delete $scope.days[index].menu.mainCourse;
                return;
            case 'dessert':
                delete $scope.days[index].menu.dessert;
                return;
        }
    }
    /*
     $('.content').ready(function () {
     $('.menu').draggable({
     cursorAt: {left: 5},
     revert: true,
     revertDuration: 0,
     });
     $(".day").droppable({
     hoverClass: "hovered",
     drop: function (event, ui) {
     $(this).addClass("done");
     $(this).html("<i class='material-icons'>done</i>");
     console.log(event);
     }
     });
     });
     */
});