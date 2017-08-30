halleinApp.controller('HomeController', function ($scope, $http) {
    $scope.config = {
        content: 'Public/Content/Home.html'
    }

    $scope.notifications = [];

    if (userType == 3) {
        $http.get(URL + '/feedback?get=id&status=1&restaurant=' + restaurant)
            .then(function (response) {
                var feedback = response.data;
                if (feedback.length) {
                    $scope.notifications.push({
                        type: 'alert',
                        number: feedback.length,
                        title: 'DB-NEW-FEEDBACK',
                        text: 'DB-NEW-FEEDBACK-TEXT',
                        route: 'feedback'
                    })
                }
                else $scope.notifications.push({
                    type: 'success',
                    title: 'DB-FEEDBACK-DONE',
                    text: 'DB-FEEDBACK-DONE-TEXT',
                    route: 'feedback'
                })
            });

        $http.get(URL + '/openingTimes?get=id&restaurant=' + restaurant)
            .then(function (response) {
                var openingTimes = response.data;
                if (!openingTimes.length) {
                    $scope.notifications.push({
                        type: 'warning',
                        title: 'DB-NO-OPENINGTIMES',
                        text: 'DB-NO-OPENINGTIMES-TEXT',
                        route: 'page#times'
                    })
                }
            });

        // Restdays
        var today = new Date();
        var todayFormatted = dateToString(today);
        $http.get(URL + '/restDays?get=id&date=' + todayFormatted + '&restaurant=' + restaurant)
            .then(function (response) {
                if (response.data[0].id) {
                    $scope.notifications.push({
                        type: 'info',
                        title: 'DB-RESTDAY-TODAY',
                        text: 'DB-RESTDAY-TODAY-TEXT',
                        route: 'page#times'
                    })
                }
            });

        var tomorrow = new Date();
        tomorrow.setDate(today.getDate() + 1);
        var tomorrowFormatted = dateToString(tomorrow);
        $http.get(URL + '/restDays?get=id&date=' + tomorrowFormatted + '&restaurant=' + restaurant)
            .then(function (response) {
                if (response.data[0].id) {
                    $scope.notifications.push({
                        type: 'info',
                        title: 'DB-RESTDAY-TOMORROW',
                        text: 'DB-RESTDAY-TOMORROW-TEXT',
                        route: 'page#times'
                    })
                }
            });

        // Meals
        // Today
        var todayWeekday = today.getDay();
        $http.get(URL + '/openingTimes?get=id&weekday=' + todayWeekday + '&restaurant=' + restaurant)
            .then(function (response) {
                if (response.data) {
                    $http.get(URL + '/restDays?get=id&date=' + todayFormatted + '&restaurant=' + restaurant)
                        .then(function (response) {
                            if (!response.data.length) {
                                $http.get(URL + '/menus?get=id&date=' + todayFormatted + '&restaurant=' + restaurant)
                                    .then(function (response) {
                                        if (!response.data.length) {
                                            $scope.notifications.push({
                                                type: 'warning',
                                                title: 'DB-NO-MENU-TODAY',
                                                text: 'DB-NO-MENU-TODAY-TEXT',
                                                route: 'meal'
                                            })
                                        }
                                    });
                            }
                        });
                }
            });

        // Tomorrow
        var tomorrowWeekday = tomorrow.getDay();
        $http.get(URL + '/openingTimes?get=id&weekday=' + tomorrowWeekday + '&restaurant=' + restaurant)
            .then(function (response) {
                if (response.data) {
                    $http.get(URL + '/restDays?get=id&date=' + tomorrowFormatted + '&restaurant=' + restaurant)
                        .then(function (response) {
                            if (!response.data.length) {
                                $http.get(URL + '/menus?get=id&date=' + tomorrowFormatted + '&restaurant=' + restaurant)
                                    .then(function (response) {
                                        if (!response.data.length) {
                                            $scope.notifications.push({
                                                type: 'warning',
                                                title: 'DB-NO-MENU-TOMORROW',
                                                text: 'DB-NO-MENU-TOMORROW-TEXT',
                                                route: 'meal'
                                            })
                                        }
                                    });
                            }
                        });
                }
            });

        $http.get(URL + '/restaurants?get=description,description_en&id=' + restaurant)
            .then(function (response) {
                var data = response.data[0];
                if (!data.imgs) {
                    $scope.notifications.push({
                        type: 'warning',
                        title: 'DB-NO-IMGS',
                        text: 'DB-NO-IMGS-TEXT',
                        route: 'page#design'
                    })
                }
                if (data.imgs && !data.mainImg) {
                    $scope.notifications.push({
                        type: 'warning',
                        title: 'DB-NO-MAINIMG',
                        text: 'DB-NO-MAINIMG-TEXT',
                        route: 'page#design'
                    })
                }
                if (data.description && !data.description_en) {
                    $scope.notifications.push({
                        type: 'warning',
                        title: 'DB-NO-TRANSLATIONS',
                        text: 'DB-NO-TRANSLATIONS-TEXT',
                        route: 'page'
                    })
                }
            });
    }
    else if (userType == 1 || userType == 2) {
        $scope.notifications.push({
            type: 'success',
            title: 'DB-APP-ONLINE',
            text: 'DB-APP-ONLINE-TEXT',
            route: 'app-control'
        })
        /*
         $scope.notifications.push({
         type: 'alert',
         number: 1,
         title: 'App offline',
         text: 'Die App ist heruntergefahren. Klicken für Behebung.',
         route: 'app-control'
         })
         */
    }
    if (userType == 2 || userType == 3) {
        /*
         $scope.notifications.push({
         type: 'info',
         title: 'Wir wollen Feedback',
         text: "Gefällt Ihnen das Dashboard oder gibt's Probleme? Geben Sie uns gerne Ihr Feedback.",
         route: 'help-feedback-add'
         })

         $scope.notifications.push({
         type: 'version',
         number: '0.0.0',
         title: 'Neue Version',
         text: 'Eine aktualisierte Version des Hallein App Dashboards wurde veröffentlicht. Sehen Sie sich hier die Änderungen an.',
         route: 'help-feedback-add'
         })
         */
    }
    if (userType == 1) {
        $http.get(URL + '/help?get=id&answer=false')
            .then(function (response) {
                var help = response.data;
                if (help.length) {
                    if (help.length == 1) {
                        $scope.notifications.push({
                            type: 'alert',
                            number: help.length,
                            title: 'DB-NEW-SUPPORT-ENQUIRY',
                            text: 'DB-NEW-SUPPORT-ENQUIRY-TEXT',
                            route: 'support'
                        })
                    }
                    else {
                        $scope.notifications.push({
                            type: 'alert',
                            number: help.length,
                            title: 'Neue Supportanfragen',
                            text: 'Sie haben neue Supportanfragen.',
                            route: 'support'
                        })
                    }
                }
            });
        $http.get(URL + '/bugreport?get=id')
            .then(function (response) {
                var bugs = response.data;
                if (bugs.length) {
                    if (bugs.length == 1) {
                        $scope.notifications.push({
                            type: 'alert',
                            number: bugs.length,
                            title: 'Bug gemeldet',
                            text: 'Es wurde ein Bug gemeldet.',
                            route: 'support'
                        })
                    }
                    else {
                        $scope.notifications.push({
                            type: 'alert',
                            number: bugs.length,
                            title: 'Bugs gemeldet',
                            text: 'Es wurden Bugs gemeldet.',
                            route: 'support'
                        })
                    }
                }
            });
    }
});