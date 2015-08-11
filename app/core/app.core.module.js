(function () {
    'use strict';
    angular
        .module('app.core', [
            'ngMaterial',
            'ngMessages',
            'ngTouch',
            'ui.router',
            'app.utils',
            'app.header',
            'app.sidebar',
            'app.navbar',
            'app.detail',
            'app.produits',
            'app.toolbar'
        ]);
})();
