(function() {
    'use strict';

    angular
        .module('pBud.dashboard')
        .controller('dashboardController', Dashboard);

    Dashboard.$inject = ['$filter', '$modal', '$state', 'dashboardService'];

    function Dashboard($filter, $modal, $state, dashboardService) {

        // public view model
        var vm = this;
        vm.sortRows = sortRows;
        vm.openItem = openItem;
        vm.newItemForm = newItemForm;

        vm.gridItems = [];

        vm.gridHeaders = [
            'title',
            'artist',
            'progress',
            'lastPlayed',
            'playCount'
        ];

        init();

        // private members
        var sortKey = 'title';
        var sortReverse = false;


        // definitions
        function init() {
            dashboardService.getGridItems().then(function(gridList){
                vm.gridItems = gridList;
            });
        }

        function sortRows(index) {
            var predicate = vm.gridHeaders[index];
            sortReverse = predicate != sortKey || !sortReverse;
            vm.gridItems = $filter('orderBy')(vm.gridItems, predicate, sortReverse);
            sortKey = predicate;
        }

        function openItem(id) {

            $state.go('practice', { itemId: id});

        }

        function newItemForm() {
            $modal.open({
                template: '<new-item></new-item>',
                windowClass: 'expanded-dialog'
            });
        }
    }
}());