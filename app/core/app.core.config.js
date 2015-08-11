(function () {

    'use strict';

    angular
        .module('app.core')
        .config(config);

    config.$inject = ['$stateProvider', '$urlRouterProvider'];

    function config($stateProvider, $urlRouterProvider) {

        $stateProvider
          .state('detail', {
              url: "/produits/:id/detail",
              templateUrl: "module/detail/detail.html",
              controller: 'DetailCtrl'
          })
          .state('produits', {
                url: "/produits",
                templateUrl: "module/produits/produits.html",
                controller: 'ProduitsCtrl'
            }
          );


        $urlRouterProvider.otherwise("/produits");
    }

})();
