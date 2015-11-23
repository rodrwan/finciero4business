(function () {
  'use strict';

  angular.module('finciero.cmp.youtubeVideo')
    .directive('finYoutubeVideo', function ($compile) {
      return {
        replace: true,
        templateUrl: 'scripts/components/youtube-video/youtube-video.html',
        restrict: 'E',
        scope: {
          id: '='
        },
        compile: function (tElement, tAttrs) {
          var compiled, height, width;

          tElement.attr('src', 'https://www.youtube.com/embed/' + tAttrs.id);

          height = angular.isDefined(tAttrs.height) ? tAttrs.height : '100%';
          tElement.attr('height', height);

          width = angular.isDefined(tAttrs.width) ? tAttrs.width : '100%';
          tElement.attr('width', width);

          compiled = $compile(tElement);

          return function ($scope) {
            compiled($scope);
          };
        }
      };
    });

}());
