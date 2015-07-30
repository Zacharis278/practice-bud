(function() {
    'use strict';

    angular
        .module('pBud.practice')
        .factory('practiceService', PracticeService);

    PracticeService.$inject = ['$http', '$log'];

    function PracticeService($http, $log) {

        // Public API
        var service = {
            getPracticeItem: getPracticeItem
        };

        // private

        return service;

        // definitions
        function getPracticeItem(id) {
            return $http.get('/practiceBud/api/v1/practiceItems/'+id).then(function(res) {
                return res.data;
            }, function(err) {
                $log.error('shits wrong yo: ' + err);
            });
        }
    }

}());
