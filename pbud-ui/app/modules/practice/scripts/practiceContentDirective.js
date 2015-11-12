(function () {
    'use strict';

    angular
        .module('pBud.practice')
        .directive('practiceContent', PracticeContent);

    PracticeContent.$inject = [ '$compile', '$timeout' ];

    function PracticeContent($compile, $timeout) {

        var editing = false;
        var revertData = null;

        return {
            restrict: 'E',
            scope: {
                data: '=',
                saveCallback: '='
            },
            template: getTemplate(),
            link: linkFn
        };

        function linkFn(scope, ele) {

            ele.bind('click', function(e) {
                if(editing) return;

                revertData = scope.data;

                editing = true;
                scope.$apply(function() {
                    ele.html(getTemplate());
                    $compile(ele.contents())(scope);
                });
            });

            scope.save = function() {

                applyTemplate(scope, ele);

                // still need 'better' error handling
                scope.saveCallback(scope.data).then(function () {

                }, function(/*err*/) {
                    scope.data = revertData;
                });
            };

            scope.cancel = function() {
                editing = false;
                scope.data = revertData;

                applyTemplate(scope, ele);
            }
        }

        function applyTemplate(scope, ele) {
            // This is terrible (and unsafe) and I swear I'll fix it later... it also happens to work
            $timeout(function() {
                editing = false;

                scope.$apply(function() {
                    ele.html(getTemplate());
                    $compile(ele.contents())(scope);
                });
            }, 10);
        }

        function getTemplate() {

            // prolly transclude this
            if(editing) {
                return '<textarea ng-model="data"></textarea><div class="buttonGrp"><button class="btn cancelButton" ng-click="cancel()">X</button>' +
                        '<button class="btn saveButton" ng-click="save()">SAVE</button></div>';
            }
            return '<pre>{{ data }}</pre>';
        }

    }
}());