halleinApp.config(['ngDialogProvider', function (ngDialogProvider) {
    ngDialogProvider.setDefaults({
        template: 'templates/dialog.html',
        className: 'ngdialog-theme-plain',
        appendTo: '.wrapper',
        showClose: false,
        closeByNavigation: true
    });
}]);