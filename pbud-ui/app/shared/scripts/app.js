'use strict';
(function() {

    angular
        .module('pBud', [ 'ui.router' ])
        .config(routeConfig);

    routeConfig.$inject = [ '$stateProvider', '$urlRouterProvider' ];

    function routeConfig($stateProvider, $urlRouterProvider) {

        // landing and default routes
        $stateProvider
            .state('home', {
                url: '/home',
                templateUrl: 'shared/views/home.html'
            })
            .state('practice', {
                url: '/practice',
                templateUrl: 'modules/practice/views/practice.html',
                inherit: true
            });
        $urlRouterProvider.otherwise('/home');
    }

}());