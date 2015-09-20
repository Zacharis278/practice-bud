(function() {
    'use strict';

    angular
        .module('pBud.practice')
        .directive('starRating', StarRating);

    function StarRating() {
        return {
            restrict: 'EA',
            template: '<ul class="star-rating" ng-class="{readonly: readonly}">' +
            '  <li ng-repeat="star in stars" class="star" ng-class="{filled: star.filled}" ng-click="toggle($index)">' +
            '    <i class="fa fa-star"></i>' + // or &#9733
            '  </li>' +
            '</ul>',
            scope: {
                ratingValue: '=ngModel',
                max: '=?', // optional (default is 5)
                onRatingSelect: '&?'
            },
            link: function (scope) {
                if (scope.max == undefined) {
                    scope.max = 5;
                }

                function updateStars() {
                    scope.stars = [];
                    for (var i = 0; i < scope.max; i++) {
                        scope.stars.push({
                            filled: i < scope.ratingValue
                        });
                    }
                }

                scope.toggle = function (index) {
                    var newValue = scope.ratingValue === index+1 ? index : index+1;
                    scope.ratingValue = newValue;
                    scope.onRatingSelect({
                        rating: newValue
                    });
                };
                scope.$watch('ratingValue', function (oldValue, newValue) {
                    if (angular.isNumber(newValue)) {
                        updateStars();
                    }
                });
            }
        }
    }
}());