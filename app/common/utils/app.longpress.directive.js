(function () {
    angular
        .module('app.utils')
		.directive('onLongpress', function ($timeout, $parse) {

		    return {
		        restrict: 'A',
		        link: function ($scope, $elm, $attrs) {
		            $elm.bind('touchstart', function (evt) {
		            	// Locally scoped variable that will keep track of the long press
		                $scope.longPress = true;
		                var functionHandler = $parse($attrs.onLongpress);
		                // We'll set a timeout for 600 ms for a long press
		                $timeout(function () {
		                    if ($scope.longPress) {
		                        // If the touchend event hasn't fired,
		                        // apply the function given in on the element's on-long-press attribute
		                        $scope.$apply(function () {
		                            functionHandler($scope, {$event: evt});
		                        });
		                    }
		                }, 600);
		            });

		            $elm.bind('touchend', function (evt) {
		                // Prevent the onLongpress event from firing
		                $scope.longPress = false;
		                var functionHandler = $parse($attrs.onLongpress);
		                // If there is an on-touch-end function attached to this element, apply it
		                if ($attrs.onTouchEnd) {
		                    $scope.$apply(function () {
		                        functionHandler($scope, {$event: evt});
		                    });
		                }
		            });
		        }
		    };
		});
})();