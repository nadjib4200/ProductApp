(function () {

    'use strict';

    angular
        .module('app.header')
        .directive('engieHeader', engieHeader);

    engieHeader.$inject = ['$timeout', 'menuService'];

    function engieHeader($timeout, menuService) {
        return {
            restrict: 'E',
            scope: {
                user: '=',
                state: "="
            },
            templateUrl: "common/header/header.html",
            link: function(scope){

                window.addEventListener("resize", function() {
                    scope.$root.$broadcast('window.resized');
                }, false);

            }
        }
    }

})();
