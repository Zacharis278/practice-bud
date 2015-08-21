(function () {
    'use strict';

    angular
        .module('pBud.practice')
        .directive('practiceContent', PracticeContent);

    PracticeContent.$inject = [ '$compile', '$timeout' ];

    function PracticeContent($compile, $timeout) {

        var editing = false;

        return {
            restrict: 'E',
            scope: {
                data: '=data'
            },
            template: getTemplate(),
            link: linkFn
        };

        function linkFn(scope, ele) {

            ele.bind('click', function(e) {
                if(editing) return;

                editing = true;
                scope.$apply(function() {
                    ele.html(getTemplate());
                    $compile(ele.contents())(scope);
                });
            });

            scope.save = function() {

                // This is terrible (and unsafe) and I swear I'll fix it later... it also happens to work
                $timeout(function() {
                    editing = false;

                    scope.$apply(function() {
                        ele.html(getTemplate());
                        $compile(ele.contents())(scope);
                    });
                }, 10);
            }
        }



        function getTemplate() {

            // prolly transclude this
            if(editing) {
                return '<textarea ng-model="data"></textarea><button class="btn saveButton" ng-click="save()">SAVE</button>';
            }
            return '<pre>{{ data }}</pre>';
        }

    }
}());