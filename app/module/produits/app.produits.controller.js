(function () {
    'use strict';

    function ProduitsCtrl($q,$state, $rootScope, $scope, $log,$location, MenuService) {
        $rootScope.produits = [
          {
            id:               'lg-g2',
            name:               'LG G2',
            specification:{
                Chipset: 	          "Qualcomm MSM8974 Snapdragon 800",
                CPU: 	              "Quad-core 2.26 GHz Krait 400",
                StockageCapacity:  "16/32 go",
                Ram:               "2 Go",
                cameraPrimaire:    "13 MP",
                cameraSecondary:    "2,1 MP"
            }
          },
          {
            id:               'sony-xperia-z2',
            name:               'Sony Xperia Z2',
            specification:{
                Chipset: 	          "Qualcomm MSM8974AB Snapdragon 801",
                CPU: 	              "Quad-core 2.3 GHz Krait 400",
                StockageCapacity:  "16 go",
                Ram:               "3 Go",
                cameraPrimaire:    "20.7 MP",
                cameraSecondary:    "2,7 MP"
            }
          },
          {
            id:               'samsung-galaxy-s6',
            name:               'Samsung Galaxy S6',
            specification:{
                Chipset: 	          "Exynos 7420",
                CPU: 	              "Quad-core 1.5 GHz Cortex-A53 & Quad-core 2.1 GHz Cortex-A57",
                StockageCapacity:  "32/64/128 go",
                Ram:               "3 Go",
                cameraPrimaire:    "16 MP",
                cameraSecondary:    "5 MP"
            }
          },
          {
            id:               'samsung-galaxy-s5-plus',
            name:               'Samsung Galaxy S5 Plus',
            specification:{
                Chipset: 	          "Qualcomm Snapdragon 805",
                CPU: 	              "Quad-core 2.5 GHz Krait 450",
                StockageCapacity:   "16/32 go",
                Ram:                "3 Go",
                cameraPrimaire:     "16 MP",
                cameraSecondary:    "2 MP"
            }
          },
          {
            id:               'sony-xperia-z3',
            name:               'Sony Xperia Z3',
            specification:{
                Chipset: 	          "Qualcomm MSM8974AC Snapdragon 801",
                CPU: 	              "Quad-core 2.5 GHz Krait 400",
                StockageCapacity:   "16/32 go",
                Ram:                "3 Go",
                cameraPrimaire:     "20.7 MP",
                cameraSecondary:    "2,2 MP"
            }
          },
          {
            id:               'samsung-galaxy-a5',
            name:               'Samsung Galaxy A5',
            specification:{
                Chipset: 	          "Qualcomm MSM8916 Snapdragon 410",
                CPU: 	              "Quad-core 1.2 GHz Cortex-A53",
                StockageCapacity:   "16 go",
                Ram:                "2 Go",
                cameraPrimaire:     "13 MP",
                cameraSecondary:    "5 MP"
            }
          }
        ];

        $scope.gotoDetail = function(index){
          $location.path("/produits/"+index+"/detail");
        }


    }

    ProduitsCtrl.$inject = ["$q","$state","$rootScope","$scope", "$log","$location", "menuService"];

    angular
        .module('app.produits')
        .controller('ProduitsCtrl', ProduitsCtrl);

})();
