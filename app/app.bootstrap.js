(function () {

    'use strict';

    if ('addEventListener' in document) {
        document.addEventListener('DOMContentLoaded', contentLoaded, false);
        document.addEventListener('deviceready', deviceReady, false);
    }

    function contentLoaded() {
        FastClick.attach(document.body);
        if(window.isMock){
            deviceReady();
        }
    }

    function deviceReady() {
        angular.bootstrap(document, ['app']);
    }

})();