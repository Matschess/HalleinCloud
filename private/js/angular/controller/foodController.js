myApp.controller('foodController', function ($scope, $location, $http) {
        $scope.config = {
            title: 'MEALS',
            content: 'content/meal.html'
        }

        switch ($location.hash()) {
            case 'daily':
                $scope.config.activeTab = '0'
                break;
            case 'constant':
                $scope.config.activeTab = '1'
                break;
            default:
                $scope.config.activeTab = '0'
        }

        $scope.escSearchbox = function ($event) {
            if ($event.keyCode == 27) {
                $scope.appetizer.searchbox = false;
            }
        }

        var date = new Date();
        date.setDate(date.getDate() - 1);

        // So that time is 0 when comparing with menu dates
        date.setHours(0);
        date.setMinutes(0);
        date.setSeconds(0);

        $scope.days = [];

        var weekdays = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];


    $scope.input = {};
    var constantMenus = false;
    $http.get(URL + '/restaurants?get=constantMenus&id=' + restaurant)
        .then(function (response) {
            var response = response.data[0];
            $scope.input.constantMenus = response.constantMenus;
            if(response.constantMenus == true){
                constantMenus = true;
            }
        $http.get(URL + '/openingTimes?get=id,weekday,opens:noSeconds,closesHalf:noSeconds,opensHalf:noSeconds,closes:noSeconds&restaurant=' + restaurant)
            .then(function (response) {
                var openingTimes = response.data;

                // The next days
                var day = new Date();
                day.setHours(0, 0, 0, 0);
                // Because day get added one
                day.setDate(day.getDate() - 1);

                var data = [];
                for (var i = 0; i < 7; i++) {
                    day.setDate(day.getDate() + 1);
                    for (var j = 0; j < openingTimes.length; j++) {
                        if (day.getDay() == openingTimes[j].weekday) {
                            data.push({
                                weekday: openingTimes[j].weekday,
                                name: weekdays[openingTimes[j].weekday],
                                date: new Date(day)
                            });
                            break;
                        }
                    }
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
                                    if ((response[i].appetizer || response[i].mainCourse || response[i].dessert) && !data[j].restDay) {
                                        data[j].menu = {meals: {}};
                                        if (response[i].appetizer) data[j].menu.meals.appetizer = response[i].appetizer;
                                        if (response[i].mainCourse) data[j].menu.meals.mainCourse = response[i].mainCourse;
                                        if (response[i].dessert) data[j].menu.meals.dessert = response[i].dessert;
                                    }
                                }
                            }
                        }
                    });
                if(constantMenus){
                    $scope.everydays = data;
                }
                else $scope.days = data;
            });
        });

        $scope.everyday = {menu: {meals: {}}};

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
                        $scope.days[index].restDay = {id: id};
                        console.log($scope.days[index]);
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
        $scope.assignMenu = function (index, menu) {
            if (!$scope.days[index].menu) {
                $scope.days[index].menu = {};
                $scope.days[index].menu.meals = {};
            }

            var data = {
                restaurant: restaurant,
                date: dateToString($scope.days[index].date)
            }
            console.log($scope.menus[menu].id);
            switch ($scope.menus[menu].type) {
                case 1:
                    data.appetizer = $scope.menus[menu].id;
                    $scope.days[index].menu.meals.appetizer = $scope.menus[menu]; // Because a 0 would be a bug
                    break;
                case 2:
                    data.mainCourse = $scope.menus[menu].id;
                    $scope.days[index].menu.meals.mainCourse = $scope.menus[menu];
                    break;
                case 3:
                    data.dessert = $scope.menus[menu].id;
                    $scope.days[index].menu.meals.dessert = $scope.menus[menu];
            }

            $http({
                url: URL + '/menus',
                method: 'POST',
                params: data
            }).then(function (response) {
                    $scope.days[index].id = response.data.id;
                },
                function () {
                    globalNotification('error')
                });

            console.log($scope.days);
            tooltipstln();
        }
        $scope.removeMenu = function (type, index) {
            var data = {
                id: $scope.days[index].id,
                type: type
            }
            console.log($scope.days[index]);
            $http({
                url: URL + '/menus',
                method: 'DELETE',
                params: data
            }).then(function () {
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

    $scope.setConstantMenu = function (index) {
        var data = {
            restaurant: restaurant,
            constant: 1,
            date: dateToString($scope.days[index].date)
        }
        $http({
            url: URL + '/menus',
            method: 'POST',
            params: data
        }).then(function (response) {
                $scope.days[index].constant = true;
            },
            function () {
                globalNotification('error')
            });
    }

        $scope.assignConstantMeal = function (meal) {

            switch ($scope.menus[meal].type) {
                case 1:
                    //data.appetizer = $scope.menus[meal].id;
                    $scope.everyday.menu.meals.appetizer = $scope.menus[meal]; // Because a 0 would be a bug
                    break;
                case 2:
                    //data.mainCourse = $scope.menus[meal].id;
                    $scope.everyday.menu.meals.mainCourse = $scope.menus[meal];
                    break;
                case 3:
                    //data.dessert = $scope.menus[meal].id;
                    $scope.everyday.menu.meals.dessert = $scope.menus[meal];
            }
            tooltipstln();
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