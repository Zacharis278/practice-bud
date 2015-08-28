(function() {
    'use strict';

    angular
        .module('pBud.practice')
        .factory('practiceService', PracticeService);

    PracticeService.$inject = ['$http', '$log', '$q'];

    function PracticeService($http, $log, $q) {

        // Public API
        var service = {
            getPracticeItem: getPracticeItem,
            updateItem: updateItem
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

        function updateItem(key, value, id) {
            var postData = {};
            postData[key] = value;
            return $http.post('/practiceBud/api/v1/practiceItems/'+id, postData).then(function(res) {
                return res.data;
            }, function(err) {
                $log.error('shits wrong yo: ' + err);
                return $q.reject(err);
            })
        }
    }

}());
