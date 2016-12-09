myApp.controller('foodController', function ($scope, $http, $routeParams) {
        $scope.config = {
            title: 'Mahlzeiten',
            actions: [
                {title: 'Hinzufügen', icon: 'add', route: '/food-add'}
            ],
            content: 'content/food.html'
        }

    $scope.days = [
        {id: 1, name: 'Montag'},
        {id: 2, name: 'Dienstag'},
        {id: 3, name: 'Mittwoch'},
        {id: 4, name: 'Donnerstag'},
        {id: 5, name: 'Freitag'},
        {id: 6, name: 'Samstag'},
        {id: 7, name: 'Sonntag'}
    ]
    $http.get(URL + '/menus?restaurant=' + restaurant)
        .then(function (response) {
            console.log( response.data);
            for(var i = 0; i <= $scope.days.length; i++){
                console.log(response.data[i]);
                if(response.data[i]){
                    $scope.days[i].menu = response.data[i];
                    console.log('done');
                }
            }
            console.log($scope.days);
        });

        $http.get(URL + '/meals?get=id,type,description,veggie&restaurant=' + restaurant)
            .then(function (response) {
                $scope.menus = response.data;
            })
        $scope.assignMenu = function (index, data) {
            if (!$scope.days[index].menu) {
                $scope.days[index].menu = {};
                $scope.days[index].menu.meals = {};
            }
            console.log($scope.menus[data]);
            switch ($scope.menus[data].type) {
                case 1:
                    $scope.days[index].menu.meals.appetizer = $scope.menus[data]; // Because a 0 would be a bug
                    return;
                case 2:
                    $scope.days[index].menu.meals.mainCourse = $scope.menus[data];
                    return;
                case 3:
                    $scope.days[index].menu.meals.dessert = $scope.menus[data];
                    return;
            }
            console.log($scope.days);
            tooltipstln();
        }
        $scope.removeMenu = function (type, index) {
            switch (type) {
                case 'appetizer':
                    delete $scope.days[index].menu.meals.appetizer;
                    break;
                case 'mainCourse':
                    delete $scope.days[index].menu.meals.mainCourse;
                    break;
                case 'dessert':
                    delete $scope.days[index].menu.meals.dessert;
                    break;
            }
            if($.isEmptyObject($scope.days[index].menu.meals)){
                delete $scope.days[index].menu;
            }
            console.log($scope.days);
        }

        $scope.removeMeal = function (id, index) {
            $http.delete(URL + '/meals?id=' + id)
                .then(function () {
                        delete $scope.menus[index];
                        globalNotification('success', 'Die Mahlzeit wurde gelöscht.')
                    },
                    function () {
                        globalNotification('error')
                    });
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
    }
);