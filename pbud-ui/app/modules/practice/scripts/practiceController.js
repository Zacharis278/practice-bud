(function() {
    'use strict';

    angular
        .module('pBud.practice')
        .controller('practiceController', Practice);

    Practice.$inject = ['$stateParams', 'practiceService'];

    function Practice($stateParams, practiceService) {

        var vm = this;

        vm.tab = '';
        vm.lyrics = '';

        init();

        // private vars

        function init() {
            practiceService.getPracticeItem($stateParams.itemId).then(function (item) {
                vm.tab = item.tabData;
                vm.lyrics = item.lyricData;
            });
        }
    }

}());