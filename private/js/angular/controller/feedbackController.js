myApp.controller('feedbackController', function ($scope, $http) {
    $scope.config = {
        title: 'Feedback',
        switches: ['Neu', 'Akzeptiert', 'Abgelehnt'],
        content: 'content/feedback.html'
    }

    $http.get(URL + '/feedback?get=id,rating,subject,text&status=1')
        .then(function (response) {
            $scope.newFeedbacks = response.data;
        })

    $http.get(URL + '/feedback?get=id,rating,subject,text&status=2')
        .then(function (response) {
            $scope.acceptedFeedbacks = response.data;
        })

    $http.get(URL + '/feedback?get=id,rating,subject,text&status=3')
        .then(function (response) {
            $scope.declinedFeedbacks = response.data;
        })

    $scope.accept = function (id, index) {
        $http.put(URL + '/feedback?status=2&id=' + id)
            .then(function () {
                $scope.acceptedFeedbacks.push($scope.newFeedbacks[index]);
                $scope.newFeedbacks.splice(index, 1);
            });
    }
    $scope.decline = function (id, index) {
        $http.put(URL + '/feedback?status=3&id=' + id)
            .then(function () {
                $scope.declinedFeedbacks.push($scope.newFeedbacks[index]);
                $scope.newFeedbacks.splice(index, 1);
            });
    }
    $scope.reDecline = function (id, index) {
        $http.put(URL + '/feedback?status=3&id=' + id)
            .then(function () {
                $scope.declinedFeedbacks.push($scope.acceptedFeedbacks[index]);
                $scope.acceptedFeedbacks.splice(index, 1);
            });
    }
    $scope.reAccept = function (id, index) {
        $http.put(URL + '/feedback?status=2&id=' + id)
            .then(function () {
                $scope.acceptedFeedbacks.push($scope.declinedFeedbacks[index]);
                $scope.declinedFeedbacks.splice(index, 1);
            });
    }
});