halleinCloud.config(['$translateProvider', function ($translateProvider) {
    $translateProvider.useStaticFilesLoader({
        prefix: 'Web/Languages/',
        suffix: '.json'
    });
    $translateProvider.preferredLanguage('de_AT');
}]);

halleinCloud.service('translateService', function ($rootScope, $translate, $cookies) {
    this.translate = function () {
        var id = $cookies.get('lang');
        $translate.use(id);
        if(id) $translate.use(id);
        else {
            $translate.use('de_AT');
            var exp = new Date();
            exp.setDate(exp.getDate() + 1825);
            $cookies.put('lang', 'de_AT', {
                expires: exp
            });
        }
        $rootScope.lang = id;
    }
    this.setLang = function(id) {
        $translate.use(id);
        var exp = new Date();
        exp.setDate(exp.getDate() + 1825);
        $cookies.put('lang', id, {
            expires: exp
        });
        $rootScope.lang = id;
    }
});