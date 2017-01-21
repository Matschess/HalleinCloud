myApp.controller('foodController', function ($scope, $http, $routeParams) {
        $scope.config = {
            title: 'Mahlzeiten',
            actions: [
                {title: 'Hinzufügen', icon: 'add', route: '/meal/add'}
            ],
            content: 'content/meal.html'
        }

        var date = new Date();
        date.setDate(date.getDate() - 1);

        // So that time is 0 when comparing with menu dates
        date.setHours(0);
        date.setMinutes(0);
        date.setSeconds(0);

        $scope.days = [];

        var weekdays = ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'];


        $http.get(URL + '/openingTimes?get=id,weekday,opens:noSeconds,closesHalf:noSeconds,opensHalf:noSeconds,closes:noSeconds&restaurant=' + restaurant)
            .then(function (response) {
                var response = response.data;
                var data = [];

                for (var i = 0; i < response.length; i++) {
                    data.push({
                        name: weekdays[response[i].weekday],
                        weekday: response[i].weekday
                    });
                }

                for (var i = 0; i < data.length; i++) {
                    var day = {};
                    var today = new Date();
                    today.setHours(0, 0, 0, 0);
                    data[i].date = new Date();
                    data[i].date.setHours(0, 0, 0, 0);
                    data[i].date.setDate(today.getDate() + data[i].weekday)
                }

                $http.get(URL + '/restDays?get=id,date,description&restaurant=' + restaurant)
                    .then(function (response) {
                        var response = response.data;
                        for (var i = 0; i < response.length; i++) {
                            for (var j = 0; j < data.length; j++) {
                                if (new Date(response[i].date).getTime() == data[j].date.getTime()) {
                                    data[j].restDay = response[i];
                                }
                            }
                        }
                    });

                $http.get(URL + '/menus?get=date&days=7&restaurant=' + restaurant)
                    .then(function (response) {
                        var response = response.data;
                        for (var i = 0; i < response.length; i++) {
                            for (var j = 0; j < data.length; j++) {
                                if (new Date(response[i].date).getTime() == data[j].date.getTime()) {
                                    data[j].id = response[i].id;
                                    data[j].menu = {meals: {
                                        appetizer: response[i].appetizer,
                                        mainCourse: response[i].mainCourse,
                                        dessert: response[i].dessert
                                    }};
                                }
                            }
                        }
                    });

                $scope.days = data;
            });

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

        $scope.restDayToggle = function (index) {
            if (!$scope.days[index].restDay) {
                var dateFormatted = dateToString($scope.days[index].date);
                var data = {
                    restaurant: restaurant,
                    date: dateFormatted,
                }
                data = prepareUpload(data);
                $http({
                    url: URL + '/restDays',
                    method: 'POST',
                    params: data
                }).then(function (response) {
                    var id = response.data.id;
                        globalNotification('success', 'Der Ruhetag wurde eingetragen.');
                        $scope.days[index].restDay = id;
                    },
                    function () {
                        globalNotification('alert')
                    });

            }
            else {
                var data = {
                    id: $scope.days[index].restDay.id
                }
                data = prepareUpload(data);
                $http({
                    url: URL + '/restDays',
                    method: 'DELETE',
                    params: data
                }).then(function () {
                        globalNotification('success', 'Der Ruhetag wurde entfernt.');
                        delete $scope.days[index].restDay;
                    },
                    function () {
                        globalNotification('error')
                    });
            }
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
            var data = {
                id: $scope.days[index].id,
                type: type
            }
            console.log(data);
            $http({
                url: URL + '/menus',
                method: 'DELETE',
                params: data
            }).then(function () {
                    globalNotification('success', 'Mahlzeit entfernt.');
                    delete $scope.days[index].menu.meals[type];
                    if ($.isEmptyObject($scope.days[index].menu.meals)) {
                        delete $scope.days[index].menu;
                    }
                    console.log($scope.days);
                },
                function () {
                    globalNotification('error')
                });

            /*
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

            console.log($scope.days);
            */
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