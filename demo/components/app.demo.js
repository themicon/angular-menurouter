// APP START
(function() {
    'use strict';

    angular
        .module('ngMenuRouterDemo', [
            'ngMenuRouter'
        ]);
})();

// Router Configuration
(function() {
    'use strict';

    angular
        .module('ngMenuRouterDemo')
        .config(routerConfig);

    routerConfig.$inject = ['mrRouterProvider'];

    function routerConfig(mrRouterProvider) {

        // Lazy Load modules configuration
        mrRouterProvider.configure({
            viewsBasePath: 'components/',
            useViewsBasePath: true,
            html5Mode: false,
            defaultRoute: '/home',
            // DRY suggestion: create a constant, inject and use it here
            requires: {
                // The name that will be referenced in the route definition
                'toaster': {
                    // Array of path(s)
                    files: [
                        'bower_components/AngularJS-Toaster/toaster.min.css',
                        'bower_components/AngularJS-Toaster/toaster.min.js'
                    ]
                    // More options supported by ocLazyLoad can be added here.
                    // serie: true,
                    // insertBefore: '#selector'
                }
            }
        });
    }
})();

// Menu Controller
(function() {
    'use strict';

    angular
        .module('ngMenuRouterDemo')
        .controller('MenuController', MenuController);

    MenuController.$inject = ['mrMenu'];

    function MenuController(mrMenu) {
        var vm = this;

        activate();

        ////////////////

        function activate() {
            // get all menu items declared
            vm.items = mrMenu.getItems();
        }
    }
})();
