(function () {

    'use strict';

    angular
        .module('app.sidebar')
        .directive('engieSidebar', engieSidebar);

        engieSidebar.$inject = ['$timeout', '$state', '$log']

    function engieSidebar($timeout, $state, $log) {
        return {
            restrict: 'E',
            scope: {
                user: '=',
                state : "="
            },
            templateUrl: "common/sidebar/sidebar.html",
            link: function(scope){
               
            }
        }
    }

})();
