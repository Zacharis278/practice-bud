(function() {
    'use strict'

    angular
        .module('pBud.dashboard')
        .factory('dashboardService', gridService);

    gridService.$inject = ['$http', '$log', '$q'];

    function gridService($http, $log, $q) {

        // Public API
        var service = {
            getGridItems: getGridItems,
            getGridHeaders: getGridHeaders
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

        function getGridHeaders() {
            if(gridColumns) {
                return $q.when(gridColumns);
            } else {
                return fetchGridData().then(function() {
                    return gridColumns;
                });
            }
        }

        function fetchGridData() {
            var deferred = $q.defer();

            $http.get('/api/v1/practiceItems').then(function(data) {
                gridItems = data.gridItems;
                gridColumns = data.gridColumns;
                deferred.resolve();
            }, function(err) {
                $log.error('shits wrong yo: ' + err);
            });

            return deferred.promise;
        }
    }

}());
