(function() {
    'use strict';

    angular
        .module('pBud.practice')
        .controller('practiceController', Practice);

    Practice.$inject = ['$location', '$state'];

    function Practice($location, $state) {

        var vm = this;

        vm.testTab = 'lsdlakjfdlskajfdl;jlk';
        vm.testLyric = 'l;kjhkjh';

        //practiceService.fetchTrackData();

        var paramVars = $location.search();
        var title = paramVars['title'];
        var artist = paramVars['artist'];

        //fileService.loadTab(artist, title).then(function(tab) {
        //    vm.testTab = tab.data;
        //});
        //
        //fileService.loadLyric(artist, title).then(function(tab) {
        //    vm.testLyric = tab.data;
        //});
    }

}());