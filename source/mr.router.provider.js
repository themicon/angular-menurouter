(function() {
    'use strict';

    angular
        .module('ngMenuRouter')
        .provider('mrRouter', mrRouterProvider);

    mrRouterProvider.$inject = ['$locationProvider', '$stateProvider', '$urlRouterProvider'];

    function mrRouterProvider($locationProvider, $stateProvider, $urlRouterProvider) {

        var config = {
            // The paths where html templates reside
            viewsBasePath: '',
            // Automatically prepend views path to all templatesUrl?
            useViewsBasePath: true,
            // Set the following to true to enable the HTML5 Mode
            // You may have to set <base> tag in index and a routing configuration in your server
            html5Mode: false,
            // default route
            defaultRoute: '',
            // The list of paths to be required
            requires: {}
        };

        // public access to change configuration
        this.configure = function(cfg) {
            angular.extend(config, cfg);
        };


        this.$get = Router;

        Router.$inject = ['$rootScope', '$state', '$stateParams', 'mrMenu'];

        function Router($rootScope, $state, $stateParams, mrMenu) {
            /* jshint validthis:true */

            // Setup service configuration
            $locationProvider.html5Mode(config.html5Mode);
            $urlRouterProvider.otherwise(config.defaultRoute);

            // Service public API
            var service = {
                // service access level
                viewpath: viewpath,
                resolveFor: resolveFor,
                state: state,
                getStates: getStates
            };

            return service;

            ///////

            // wrapper for $stateProvider to simplify routes creation
            function state(name, options) {
                if (!name) throw new Error('Route name not defined.');
                // If we found a 'require' mixit with any existent resolve
                if (options.require) {
                    var require = this.resolveFor.apply(this, options.require);
                    options.resolve = angular.extend(options.resolve||{}, require);
                }
                // rewrite templateUrl if allowed
                if (options.templateUrl && config.useViewsBasePath)
                    options.templateUrl = this.viewpath(options.templateUrl);

                // Setup the state
                $stateProvider.state(name, options);

                // Setup menu
                if ( options.menu ) {
                    options.menu.sref = name;
                    mrMenu.addItem(options.menu);
                }

                // allow chain execution
                return this;
            }

            // Return the base of the
            // relative path for all views
            function viewpath(uri) {
                return config.viewsBasePath + uri;
            }

            // Generates a resolve object by passing script names
            // previously configured in config.requires
            function resolveFor() {
                var _args = arguments;
                return {
                    ___deps: ['$ocLazyLoad', '$q', function($ocLL, $q) {
                        // Creates a promise chain for each argument
                        var promiseChain = $q.when(1); // empty promise
                        for (var i = 0, len = _args.length; i < len; i++) {
                            promiseChain = andThen(_args[i]);
                        }
                        return promiseChain;

                        // creates promise to chain dynamically
                        function andThen(mod) {
                            // support a function that returns a promise
                            if (typeof mod === 'function')
                                return promiseChain.then(mod);
                            else {
                                return promiseChain.then(function() {
                                    // check if module is defined
                                    if (!config.requires[mod])
                                        throw new Error('Route resolve: Bad resource name [' + mod + ']');
                                    // finally, return the load promise
                                    return $ocLL.load(config.requires[mod]);
                                });
                            }
                        }

                    }]
                };
            } // resolveFor

            function getStates() {
                return $state.get();
            }

        }
    }
})();
