(function() {
    'use strict';

    angular
        .module('pBud.dashboard')
        .directive('newItem', NewItem);

    NewItem.$inject = [ '$state', 'dashboardService' ];

    function NewItem($state, dashboardService) {

        var vm;
        var hideModal;

        return {
            restrict: 'EA',
            link: linkFn,
            controller: controllerFn,
            controllerAs: 'vm',
            bindToController: true,
            templateUrl: 'modules/dashboard/views/newItemModal.html'
        };

        function linkFn(scope, ele) {
            hideModal = function() {
                scope.$close();
            }
        }

        function controllerFn() {
            vm = this;
            vm.title = '';
            vm.artist = '';
            vm.mediaId = '';
            vm.error = '';

            vm.submit = submit;
        }

        function submit() {
            dashboardService.createNewItem({
                title: vm.title,
                artist: vm.artist,
                mediaId: vm.mediaId
            }).then(function(id) {
                $state.go('practice', { itemId: id});
                hideModal();
            }, function(/*err*/) {
                vm.error = 'Unable to add item right now';
            });
        }
    }
}());