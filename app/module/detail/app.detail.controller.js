(function () {
    'use strict';

    function DetailCtrl($q,$state, $rootScope, $scope, $log, $location, $stateParams) {
        var that = this;
        $scope.produit=$rootScope.produits[$stateParams.id];
    }

    DetailCtrl.$inject = ["$q","$state","$rootScope","$scope", "$log","$location","$stateParams"];

    angular
        .module('app.detail')
        .controller('DetailCtrl', DetailCtrl);

})();
