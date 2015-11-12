(function() {
    'use strict';

    angular
        .module('pBud.practice')
        .controller('practiceController', Practice);

    Practice.$inject = ['$scope', '$state', '$stateParams', '$modal', 'practiceService'];

    function Practice($scope, $state, $stateParams, $modal, practiceService) {

        var itemId = null;
        var modalInstace = null;

        var vm = this;

        // public API
        vm.saveTitle = saveTitle;
        vm.saveArtist = saveArtist;
        vm.saveNotes = saveNotes;
        vm.saveTab = saveTab;
        vm.saveLyrics = saveLyrics;
        vm.openSummary = openSummary;
        vm.submitSession = submitSession;
        vm.updateProgress = updateProgress;

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

        vm.sessionProgress = 0;

        // view state
        vm.infoOpen = false;

        init();

        // private vars

        function init() {
            itemId = $stateParams.itemId;

            vm.ratingsCategories = [
                {id: 1, label: 'Play Through', value: 0, weight: 40},
                {id: 2, label: 'Accuracy/Technique', value: 0, weight: 30},
                {id: 3, label: 'Tempo', value: 0, weight: 10},
                {id: 4, label: 'Memorization', value: 0, weight: 10},
                {id: 5, label: 'Musicality', value: 0, weight: 10}
            ];

            practiceService.getPracticeItem(itemId).then(function (item) {
                vm.tab = item.tabData;
                vm.lyrics = item.lyricData;
                vm.title = item.title;
                vm.artist = item.artist;
                vm.playCount = item.playCount || 0;
                vm.progress = item.progress || 0;
                vm.lastPlayed = item.lastPlayed;
                vm.notes = item.notes;
                vm.mediaId = item.mediaId;

                if(vm.lyrics) {
                    vm.ratingsCategories.push({id: 6, label: 'Vocals', value: 0, weight: 40});
                    angular.forEach(vm.ratingsCategories, function(category) {
                        category.weight = category.weight * 100/140;
                    });
                }
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

        function openSummary() {
            modalInstace = $modal.open({
                templateUrl: 'modules/practice/views/practiceSummary.html',
                scope: $scope,
                windowClass: 'expanded-dialog'
            })
        }

        function updateProgress(rating, index) {
            vm.sessionProgress += (rating - vm.ratingsCategories[index].value)/5 * vm.ratingsCategories[index].weight / 100;
        }

        function submitSession() {
            // TODO: Replace w/ error instead of closing on error
            practiceService.saveSession(vm.ratingsCategories, itemId).finally(function() {
                modalInstace.close();

                $state.go('home');
            });
        }
    }

}());