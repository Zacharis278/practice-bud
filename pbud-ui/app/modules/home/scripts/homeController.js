(function() {
    'use strict';

    angular
        .module('pBud.home')
        .controller('HomeController', Dashboard);

    Dashboard.$inject = ['$filter', '$location', '$state'];

    function Dashboard($filter, $location, $state) {

        // public view model
        var vm = this;
        vm.sortRows = sortRows;
        vm.openItem = openItem;

        vm.gridHeaders = [
            'title',
            'artist',
            'progress',
            'lastPlayed',
            'playCount'
        ];

        vm.gridItems = [
            {
                "id": 1,
                "title": "Imagine",
                "artist": "A Perfect Circle",
                "progress": 75,
                "lastPlayed": 1288323623006,
                "playCount": "14"
            },
            {
                "id": 2,
                "title": "Little Talks",
                "artist": "Of Monsters and Men",
                "progress": 75,
                "lastPlayed": 1288323623006,
                "playCount": "34"
            }
        ];

        // private members
        var sortKey = 'title';
        var sortReverse = false;

        // populate data grid
        //gridService.fetchGridData();


        // definitions

        function sortRows(index) {
            var predicate = vm.gridHeaders[index];
            sortReverse = predicate != sortKey || !sortReverse;
            vm.gridItems = $filter('orderBy')(vm.gridItems, predicate, sortReverse);
            sortKey = predicate;
        }

        function openItem(artist, title) {

            //// is this OK to use over $state.go??
            //$location.path('/practice')
            //    .search('artist', artist.replace(/\s/g, "_"))
            //    .search('title', title.replace(/\s/g, "_"));

        }
    }
}());