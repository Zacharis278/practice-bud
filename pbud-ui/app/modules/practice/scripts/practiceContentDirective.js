(function () {
    'use strict';

    angular
        .module('pBud.practice')
        .directive('practiceContent', PracticeContent);

    PracticeContent.$inject = [ '$compile' ];

    function PracticeContent($compile) {

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

            // this is shitty since I'm in a textarea but it proves the concept
            ele.bind('keydown keypress', function(event) {
                if(!editing) return;

                editing = false;
                var keyCode = event.which || event.keyCode;

                // If enter key is pressed
                if (keyCode === 13) {
                    scope.$apply(function() {
                        ele.html(getTemplate());
                        $compile(ele.contents())(scope);
                    });

                    event.preventDefault();
                }
            });
        }

        function getTemplate() {

            // prolly transclude this
            if(editing) {
                return '<textarea class="practiceContent">{{ data }}</textarea>';
            }
            return '<pre class="practiceContent">{{ data }}</pre>';
        }

    }
}());