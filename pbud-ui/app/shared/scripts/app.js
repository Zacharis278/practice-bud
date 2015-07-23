'use strict';
(function() {

    angular
        .module('pBud', [ 'ui.router', 'ngMaterial' ])
        .config(routeConfig)
        .run(appRun);

    routeConfig.$inject = [ '$stateProvider', '$urlRouterProvider' ];

    function routeConfig($stateProvider, $urlRouterProvider) {

        // landing and default routes
        $stateProvider
            .state('home', {
                url: '/home',
                templateUrl: 'modules/home/views/home.html'
            })
            .state('practice', {
                url: '/practice',
                templateUrl: 'modules/practice/views/practice.html',
                inherit: true
            });
        $urlRouterProvider.otherwise('/home');
    }

    function appRun() {
        console.log('and go?');
    }
}());