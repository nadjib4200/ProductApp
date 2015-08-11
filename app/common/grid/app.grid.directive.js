(function () {

    'use strict';

    angular
        .module('app.grid')
        .directive('engieGrid', engieGrid);

    engieGrid.$inject = ['$timeout'];

    function engieGrid($timeout) {
        return {
            restrict: 'E',
            scope: {
                rows: '=',
                columns: "=",
                page: "=",
                size: "=",
                sortBy: "=",
                title: "=",
                numberElementsVisible: "=",
                onRowclick: '&'
            },
            templateUrl: "common/grid/grid.html",
            link: function(scope, grid){
            	
            }
        }
    }

})();
