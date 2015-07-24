'use strict';
(function() {

    angular
        .module('pBud', [ 'ui.router', 'pBud.dashboard', 'pBud.practice' ])
        .config(routeConfig)
        .run(appRun);

    routeConfig.$inject = [ '$stateProvider', '$urlRouterProvider' ];

    function routeConfig($stateProvider, $urlRouterProvider) {

        // landing and default routes
        $stateProvider
            .state('home', {
                url: '/home',
                controller: 'dashboardController',
                controllerAs: 'dashboardCtrl',
                templateUrl: 'modules/dashboard/views/dashboard.html'
            })
            .state('practice', {
                url: '/practice',
                controller: 'practiceController',
                controllerAs: 'practiceCtrl',
                templateUrl: 'modules/practice/views/practice.html',
                inherit: true
            });
        $urlRouterProvider.otherwise('/home');
    }

    function appRun() {
        console.log('and go?');
    }
}());