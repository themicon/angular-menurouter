(function() {
    'use strict';

    angular
        .module('ngMenuRouterDemo')
        .run(homeRoute);

    homeRoute.$inject = ['mrRouter'];
    function homeRoute(mrRouter){

        mrRouter.state('home', {
            url: '/home',
            title: 'Home',
            templateUrl: 'home/home.html',
            // custom resolve
            resolve: {
                test: function() {
                    console.log('loggin from custom resolve');
                }
            }
        })
        ;
    }

})();