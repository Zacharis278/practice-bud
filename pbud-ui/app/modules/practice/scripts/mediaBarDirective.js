(function () {
    'use strict';

    angular
        .module('pBud.practice')
        .directive('mediaBar', MediaBar);

    MediaBar.$inject = [ '$timeout', '$window' ];

    function MediaBar($timeout, $window) {

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
            vm.mediaProgress = 0;
            vm.playerTime = 0;
            vm.playPause = playPause;
            vm.updateProgress = updateProgress;
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
                    },
                    'onStateChange': stateChangeHandler
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

        function stateChangeHandler(state) {
            if(state.data === 1) {
                vm.playing = true;
                enableProgressListener();
            }
            else {
                vm.playing = false;
            }
        }

        function updateProgress(event) {
            var barWidth = event.srcElement.offsetParent ? event.srcElement.offsetParent.offsetWidth : event.srcElement.offsetWidth;
            var newValue = Math.floor((event.offsetX / barWidth) * player.getDuration());

            player.seekTo(newValue, true);      // true allows immediate data request, since we arn't dragging this is OK
            vm.playerTime = newValue;
            vm.mediaProgress = newValue*100 / player.getDuration();

            if(player.getPlayerState() === 1) {
                vm.playing = true;
            }
        }

        function enableProgressListener() {
            if(vm.playing) {
                vm.playerTime = player.getCurrentTime();
                vm.mediaProgress = vm.playerTime*100 / player.getDuration();
                $timeout(enableProgressListener, 100);
            }
        }
    }

}());