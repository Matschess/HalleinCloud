myApp.controller('pageDesignController', function ($scope, $http, ngDialog) {
    $scope.pickColor = function(){
        ngDialog.open({
            template: 'content/dialogs/color.html',
            appendClassName: 'ngdialog-theme-cropper',
            scope: $scope
        });
    };

    $scope.isHex = function(color){
        var pattern = new RegExp(/^#([0-9a-f]{6}|[0-9a-f]{3})$/i);
        $scope.hexValid = pattern.test(color);
    }

    $scope.setColor = function(color){
        $scope.input.color = color;
        $scope.colorpicker = false;
    }

    $scope.myImage = '';
    $scope.mainImg = false;
    $scope.croppedImg = '';

    var handleFileSelect = function (evt) {
        var file = evt.currentTarget.files[0];
        var reader = new FileReader();
        reader.onload = function (evt) {
            $scope.$apply(function ($scope) {
                $scope.myImage = evt.target.result;
            });
        };
        reader.readAsDataURL(file);
        ngDialog.open({
            template: 'content/dialogs/cropper.html',
            appendClassName: 'ngdialog-theme-cropper',
            scope: $scope
        });
    };
    angular.element(document.querySelector('#filepicker')).on('change', handleFileSelect);
    $scope.uploadImg = function (image, main) {
        console.log(main)
        var data = {
            restaurant: restaurant,
            main: main
        }
        var fd = new FormData();
        fd.append('img', image);
        $http.post(URL + '/upload', fd, {
            params: data,
            headers: {'Content-Type': undefined}
        }).then(function (result) {
            var data = result.data;
            $scope.input.imgs.unshift(data);
            if(main){
                setMainImg(0);
            }
        });
    }
    $scope.setMainImg = function (index) {
        var data = {
            id: $scope.input.imgs[index].id,
            main: 1
        }
        $http({
            url: URL + '/upload',
            method: 'PUT',
            params: data
        }).then(function () {
            setMainImg(index);
        });
    }
    function setMainImg(index){
        for (var i = 0; i < $scope.input.imgs.length; i++) {
            delete $scope.input.imgs[i].main
        }
        $scope.input.imgs[index].main = true;
    }
    $scope.deleteImg = function (index) {
        ngDialog.openConfirm({
            controller: ['$scope', function ($scope) {
                $scope.dialog = {
                    content: 'Wollen Sie das Bild löschen?',
                    options: {
                        confirm: 'Löschen',
                        abort: 'Abbrechen'
                    }
                }
            }]
        }).then(function () {
            var data = {
                id: $scope.input.imgs[index].id
            }
            $http({
                url: URL + '/upload',
                method: 'DELETE',
                params: data
            }).then(function () {
                $scope.input.imgs.splice(index, 1);
                console.log($scope.input);
            });
        });
    }
});