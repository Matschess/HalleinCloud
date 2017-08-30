halleinApp.config(['ngDialogProvider', function (ngDialogProvider) {
    ngDialogProvider.setDefaults({
        template: 'Web/Templates/dialog.html',
        className: 'ngdialog-theme-plain',
        appendTo: '.wrapper',
        showClose: false,
        closeByNavigation: true
    });
}]);