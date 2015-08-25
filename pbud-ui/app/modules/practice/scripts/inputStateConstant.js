(function() {
    'use strict';

    angular
        .module('pBud.practice')
        .constant('INPUT_STATE', {
            NONE: 0,
            SAVING: 1,
            SAVED: 2
        });
}());