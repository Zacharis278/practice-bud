(function() {
    'use strict';

    angular
        .module('pBud.practice')
        .controller('practiceController', Practice);

    Practice.$inject = ['$stateParams', '$timeout', 'practiceService'];

    function Practice($stateParams, $timeout, practiceService) {

        var itemId = null;

        var vm = this;

        // public API
        vm.saveTitle = saveTitle;
        vm.saveArtist = saveArtist;
        vm.saveNotes = saveNotes;
        vm.saveTab = saveTab;
        vm.saveLyrics = saveLyrics;

        // data model
        vm.title = '';
        vm.artist = '';
        vm.tab = '';
        vm.lyrics = '';
        vm.notes = '';
        vm.playCount = 0;
        vm.progress = 0;
        vm.lastPlayed = null;
        vm.mediaId = 123;

        // view state
        vm.infoOpen = false;

        init();

        // private vars

        function init() {
            itemId = $stateParams.itemId;

            practiceService.getPracticeItem($stateParams.itemId).then(function (item) {
                vm.tab = item.tabData;
                vm.lyrics = item.lyricData;
                vm.title = item.title;
                vm.artist = item.artist;
                vm.playCount = item.playCount;
                vm.progress = item.progress;
                vm.lastPlayed = item.lastPlayed;
                vm.notes = item.notes;
                vm.mediaId = item.mediaId;
            });
        }

        function saveTitle(value) {
            return practiceService.updateItem('title', value, itemId);
        }

        function saveArtist(value) {
            return practiceService.updateItem('artist', value, itemId);
        }

        function saveNotes(value) {
            return practiceService.updateItem('notes', value, itemId);
        }

        function saveTab(value) {
            return practiceService.updateItem('tabData', value, itemId);
        }

        function saveLyrics(value) {
            return practiceService.updateItem('lyricData', value, itemId);
        }
    }

}());