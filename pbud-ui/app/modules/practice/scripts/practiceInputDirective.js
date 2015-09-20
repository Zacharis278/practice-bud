(function() {

    angular
        .module('pBud.practice')
        .directive('practiceInput', PracticeInput);

    PracticeInput.$inject = [ '$timeout' ];

    function PracticeInput($timeout) {

        return {
            replace: true,
            restrict: 'E',
            scope: {
                labelText: '=',
                value: '=',
                required: '=',
                useTextarea: '=',
                saveCallback: '='
            },
            link: linkFn,
            template: '<form name="formItem">' +
                        '<label>{{labelText}}</label><input ng-show="!useTextarea" ng-model="value" ng-blur="save(value)" ng-change="clearState()" required="required"/>' +
                        '<span ng-class="showSpinner ? \'spinner\' : \'\'" ><i ng-class="iconClass"></i></span>' +
                        '<textarea ng-show="useTextarea" ng-model="value" ng-blur="save(value)"></textarea>' +
                      '</form>'
        };

        function linkFn(scope) {
            scope.showSpinner = false;
            scope.iconClass = '';

            scope.save = function(value) {

                if(scope.formItem.$pristine) {
                    return;
                }

                if(scope.formItem.$invalid) {
                    scope.iconClass = 'glyphicon glyphicon-remove-circle';
                    return;
                }

                scope.showSpinner = true;
                scope.iconClass = 'fa fa-spinner fa-spin';

                scope.saveCallback(value).then(function(res) {
                    scope.showSpinner = false;
                    scope.iconClass = 'glyphicon glyphicon-ok-circle';

                    $timeout(function() {
                        scope.iconClass = '';
                    }, 3000);
                }, function(err) {
                    scope.showSpinner = false;
                    scope.iconClass = 'glyphicon glyphicon-remove-circle';
                });
            };

            scope.clearState = function() {
                scope.showSpinner = false;
                scope.iconClass = '';
            }
        }
    }
}());
