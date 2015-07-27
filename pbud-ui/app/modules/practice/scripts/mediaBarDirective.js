(function () {
    'use strict';

    angular
        .module('pBud.practice')
        .directive('mediaBar', MediaBar);

    MediaBar.$inject = [ '$window' ];

    function MediaBar($window) {

        var controller = controllerFn;

        // Private Vars
        var vm;
        var player = {};

        return {
            restrict: 'A',
            controller: controller,
            controllerAs: 'vm',
            bindToController: true,
            templateUrl: 'modules/practice/views/mediaBar.html',
            link: linkFn
        };

        function controllerFn() {
            vm = this;
            vm.playing = false;
            vm.playPause = playPause;
        }

        function linkFn() {

            if(document.getElementById('YouTubeAPI')) {
                createPlayer();
            }
            else {

                var tag = document.createElement('script');

                tag.src = 'https://www.youtube.com/iframe_api';
                tag.id = 'YouTubeAPI';
                var firstScriptTag = document.getElementsByTagName('script')[0];
                firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

                $window.onYouTubeIframeAPIReady = createPlayer;
            }
        }

        function createPlayer() {
            new YT.Player('yt-player', {
                height: '0',
                width: '0',
                videoId: '4x23l6BGu3w',
                events: {
                    'onReady': function (event) {
                        player = event.target;
                    }
                }
            });
        }



        function playPause() {
            if(vm.playing = !vm.playing) {
                player.playVideo();
            } else {
                player.pauseVideo();
            }
        }
    }

}());