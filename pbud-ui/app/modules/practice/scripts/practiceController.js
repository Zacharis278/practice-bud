(function() {
    'use strict';

    angular
        .module('pBud.practice')
        .controller('practiceController', Practice);

    Practice.$inject = ['$stateParams', 'practiceService'];

    function Practice($stateParams, practiceService) {

        var vm = this;

        // data model
        vm.title = '';
        vm.artist = '';
        vm.tab = '';
        vm.lyrics = '';
        vm.notes = '';
        vm.playCount = 0;
        vm.progress = 0;
        vm.lastPlayed = null;

        // view state
        vm.infoOpen = false;

        init();

        // private vars

        function init() {
            practiceService.getPracticeItem($stateParams.itemId).then(function (item) {
                vm.tab = item.tabData;
                vm.lyrics = item.lyricData;
                vm.title = item.title;
                vm.artist = item.artist;
                vm.playCount = item.playCount;
                vm.progress = item.progress;
                vm.lastPlayed = item.lastPlayed;
            });
        }
    }

}());