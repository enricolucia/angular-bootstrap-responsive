/*global angular*/
var bootstrapResponsive = angular.module('bootstrap.responsive', []);

bootstrapResponsive.directive('bvMode', ['$window', '$timeout', function ($window, $timeout) {
  return {
    restrict: 'A',
    scope: {
      bvMode: '='
    },
    template: '<div class="visible-xs"></div><div class="visible-sm"></div>' +
    '<div class="visible-md"></div><div class="visible-lg"></div>',
    link: function (scope, iElement) {
      scope.markers = iElement.find('div');
      var t;

      scope.updateDisplayMode = function () {
        angular.forEach(scope.markers, function (elem) {
          if (elem.offsetParent !== null) {
            scope.bvMode = elem.className;
          }
        });
      };

      angular.element($window).bind('resize', function () {
        $timeout.cancel(t);
        t = $timeout(function () {
          scope.updateDisplayMode();
        }, 300); // check if resize event is still happening
      });

      scope.updateDisplayMode(); //fire it at least once
    }
  };
}]);
