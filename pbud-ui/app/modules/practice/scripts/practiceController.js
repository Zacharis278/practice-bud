(function() {
    'use strict';

    angular
        .module('pBud.practice')
        .controller('practiceController', Practice);

    Practice.$inject = ['$stateParams', '$timeout', 'practiceService', 'INPUT_STATE'];

    function Practice($stateParams, $timeout, practiceService, INPUT_STATE) {

        var vm = this;

        // public API
        vm.saveValue = saveValue;

        // data model
        vm.title = {
            value: '',
            state: INPUT_STATE.NONE
        };
        vm.artist = {
            value: '',
            state: INPUT_STATE.NONE
        };
        vm.tab = '';
        vm.lyrics = '';
        vm.notes = '';
        vm.playCount = 0;
        vm.progress = 0;
        vm.lastPlayed = null;

        // expose constants to view
        vm.INPUT_STATE = INPUT_STATE;

        // view state
        vm.infoOpen = false;

        init();

        // private vars

        function init() {
            practiceService.getPracticeItem($stateParams.itemId).then(function (item) {
                vm.tab = item.tabData;
                vm.lyrics = item.lyricData;
                vm.title.value = item.title;
                vm.artist.value = item.artist;
                vm.playCount = item.playCount;
                vm.progress = item.progress;
                vm.lastPlayed = item.lastPlayed;
            });
        }

        function saveValue(key) {
            if(!vm[key]) {
                console.log('you should feel bad');
            }

            vm[key].state = 1;

            // mock service call w/ timeout instead
            console.log('saving ' + key);
            //practiceService.updateItem(key, vm[key].value);
            $timeout(function () {
                vm[key].state = INPUT_STATE.SAVING;
            }, 2000).then(function() {
                vm[key].state = INPUT_STATE.SAVED;
                $timeout(function () {
                    vm[key].state = INPUT_STATE.NONE;
                }, 2000);
            });
        }
    }

}());