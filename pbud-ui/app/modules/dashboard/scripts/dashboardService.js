(function() {
    'use strict';

    angular
        .module('pBud.dashboard')
        .factory('dashboardService', gridService);

    gridService.$inject = ['$http', '$log', '$q'];

    function gridService($http, $log, $q) {

        // Public API
        var service = {
            getGridItems: getGridItems,
            createNewItem: createNewItem
        };

        // private
        var gridItems = null;
        var gridColumns = null;

        return service;

        // definitions
        function getGridItems() {
            if(gridItems) {
                return $q.when(gridItems);
            } else {
                return fetchGridData().then(function() {
                    return gridItems;
                });
            }
        }

        function fetchGridData() {
            var deferred = $q.defer();

            $http.get('/practiceBud/api/v1/practiceItems').then(function(res) {
                gridItems = res.data;

                deferred.resolve();
            }, function(err) {
                $log.error('shits wrong yo: ' + err);
            });

            return deferred.promise;
        }

        function createNewItem(item) {
            return $http.post('/practiceBud/api/v1/practiceItems/', item).then(function(res) {
                return res.data._id;
            }, function(err) {
                $log.error('shits wrong yo: ' + err);
                return $q.reject(err);
            })
        }
    }

}());
