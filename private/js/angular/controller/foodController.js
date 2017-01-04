myApp.controller('foodController', function ($scope, $http, $routeParams) {
        $scope.config = {
            title: 'Mahlzeiten',
            actions: [
                {title: 'Hinzufügen', icon: 'add', route: '/food-add'}
            ],
            content: 'content/food.html'
        }

        var date = new Date();
        date.setDate(date.getDate() - 1);

        // So that time is 0 when comparing with menu dates
        date.setHours(0);
        date.setMinutes(0);
        date.setSeconds(0);

        $scope.days = [];
        var weekdays = ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'];
        for (var i = 0; i < 7; i++) {
            var day = {};
            date.setDate(date.getDate() + 1)
            day.weekday = date.getDay();
            day.name = weekdays[date.getDay()];
            day.date = date
            $scope.days.push(day);
        }

        /*
         $http.get(URL + '/menus?restaurant=' + restaurant)
         .then(function (response) {
         var menus = response.data;
         var menuDate;
         for (var i = 0; i <= menus.length; i++) {
         menuDate = new Date(menus[i].date);
         console.log(menuDate);
         console.log($scope.days);
         if (menuDate == $scope.days[0].date) {
         alert('ok');
         break;
         }
         }
         console.log($scope.days);
         });
         */

        $http.get(URL + '/meals?get=id,type,description,veggie&restaurant=' + restaurant)
            .then(function (response) {
                $scope.menus = response.data;
            })
        $scope.closeToggle = function (index) {
            if (!$scope.days[index].closed) {
                $scope.days[index].closed = true;
            }
            else $scope.days[index].closed = false;
        }
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
            if ($.isEmptyObject($scope.days[index].menu.meals)) {
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