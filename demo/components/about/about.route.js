(function() {
    'use strict';

    angular
        .module('ngMenuRouterDemo')
        .run(aboutRoute);

    aboutRoute.$inject = ['mrRouter'];
    function aboutRoute(mrRouter){

        mrRouter.state('about', {
            url: '/about',
            title: 'About',
            templateUrl: 'about/about.html',
            // toaster will be only loaded by ocLazyLoad for this route
            require: ['toaster'],
            // Define the menu together with the route
            menu: {
                name: 'About',
                order: 1
            }
        })
        ;
    }

})();