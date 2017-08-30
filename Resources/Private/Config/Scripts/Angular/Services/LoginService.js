halleinApp.service('LoginService', function ($route, $rootScope, $location, $http, $cookies) {
    this.checkLogin = function () {
        var userdata = $cookies.get('userdata');
        if (userdata) {
            $('.wrapper').removeClass('slideUp');
            var userdata = JSON.parse(userdata);
            user = userdata.user.id;
            userType = userdata.user.type;
            if (userType == 3) {
                restaurant = userdata.restaurant.id;
            }
            $http.defaults.headers.common['x-access-token'] = userdata.token;
            $.ajaxSetup({
                headers: {'x-access-token': userdata.token}
            });
            $rootScope.loggedIn = true;
            this.getUsername();
            this.buildNavbar();
        }
        else {
            $('document').ready(function () {
                $('.username').focus();
            });
        }

    }
    this.login = function (data) {
        $('.wrapper').addClass('animate');

        $http.defaults.headers.common['x-access-token'] = data.token;
        $.ajaxSetup({
            headers: {'x-access-token': data.token}
        });
        user = data.user.id;
        userType = data.user.type;
        if (userType == 3) {
            restaurant = data.restaurant.id;
        }
        console.log(restaurant);
        $cookies.put('userdata', JSON.stringify(data));
        $rootScope.loggedIn = true;
        this.getUsername();
        this.buildNavbar();
    }
    this.logout = function () {
        $('.wrapper').addClass('animate');
        $http.defaults.headers.common['x-access-token'] = '';
        $.ajaxSetup({
            headers: {'x-access-token': ''}
        });
        user = false;
        userType = false;
        restaurant = false;
        $location.path('/');
        $cookies.remove('userdata');
        $rootScope.loggedIn = false;
        $('document').ready(function () {
            $('.username').focus();
        });
        setTimeout(function () {
            $route.reload();
        }, 1000);
    }
    this.getUsername = function () {
        $http.get(URL + '/users?get=firstname&id=' + user)
            .then(function (response) {
                $rootScope.username = response.data[0].firstname;
            });
    }
    this.buildNavbar = function () {
        // Save routes in an array for navigation
        $rootScope.routes = [];
        angular.forEach($route.routes, function (route, path) {
            if (route.name) {
                if (route.grant) {
                    for (var i = 0; i < route.grant.length; i++) {
                        if (route.grant[i] == userType) {
                            $rootScope.routes.push({
                                path: path,
                                icon: route.icon,
                                name: route.name
                            });
                        }
                    }
                }
                else {
                    $rootScope.routes.push({
                        path: path,
                        icon: route.icon,
                        name: route.name
                    });
                }
            }
        });
    }
});