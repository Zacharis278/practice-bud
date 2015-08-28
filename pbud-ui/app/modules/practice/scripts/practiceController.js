(function() {
    'use strict';

    angular
        .module('pBud.practice')
        .controller('practiceController', Practice);

    Practice.$inject = ['$stateParams', '$timeout', 'practiceService'];

    function Practice($stateParams, $timeout, practiceService) {

        var vm = this;

        // public API
        vm.saveTitle = saveTitle;
        vm.saveArtist = saveArtist;
        vm.saveNotes = saveNotes;

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

        function saveTitle(value) {
            return practiceService.updateItem('title', value, $stateParams.id);
        }

        function saveArtist(value) {
            return practiceService.updateItem('artist', value, $stateParams.id);
        }

        function saveNotes(value) {
            return practiceService.updateItem('notes', value, $stateParams.id);
        }
    }

}());