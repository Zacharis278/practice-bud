'use strict';
(function() {

    angular.module('pBud')

        .filter('secondsTimeFormatter', function() {
           return function(seconds) {
               seconds = Math.floor(seconds);
               var hrs = Math.floor(seconds / 3600);
               var min = Math.floor(seconds % 3600 / 60);
               var sec = seconds % 60;

               return (hrs > 0 ? (hrs < 10 ? '0' + hrs : hrs) + ':' : '') +
                   (min < 10 ? '0' + min : min) + ':' +
                   (sec < 10 ? '0' + sec : sec);
           };
        });

}());