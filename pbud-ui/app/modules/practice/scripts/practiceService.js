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
            updateItem: updateItem,
            deleteItem: deleteItem,
            saveSession: saveSession
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
            return $http.put('/practiceBud/api/v1/practiceItems/'+id+'/'+key, {value: value}).then(function(res) {
                return res.data;
            }, function(err) {
                $log.error('shits wrong yo: ' + err);
                return $q.reject(err);
            });
        }

        function deleteItem(id) {
            return $http.delete('/practiceBud/api/v1/practiceItems/'+id).then(function(res) {
            return res.data;
            }, function(err) {
                $log.error('shits wrong yo: ' + err);
            });
        }

        function saveSession(evaluation, id) {

            // simplify view object
            var ratings = [];
            angular.forEach(evaluation, function(category) {
                ratings.push({categoryId: category.id, rating: category.value, weight: category.weight});
            });

            return $http.post('/practiceBud/api/v1/practiceItems/'+id+'/sessions', {evaluation: ratings});
        }

    }

}());
