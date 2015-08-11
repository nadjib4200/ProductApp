(function () {

    'use strict';

    angular
        .module('app.navbar')
        .directive('engieNavbar', engieNavbar);

        engieNavbar.$inject = ['$timeout', '$state', '$log', 'menuService']

    function engieNavbar($timeout, $state, $log, MenuService) {
        return {
            restrict: 'E',
            scope: {
                user: '=',
                state: '='
            },
            templateUrl: "common/navbar/navbar.html",
            link: function(scope){
               scope.onBurger = function(){
                    $timeout(function(){
                        MenuService.toggleMenu();
                    });
               }

               scope.$root.onClickOutSide = function(){
                   MenuService.close();
                   MenuService.closeMenu();
               }
                
            }
        }
    }

})();
