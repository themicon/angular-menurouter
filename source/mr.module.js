/**
 * angular-menurouter - Menu and Routing modules wrapper
 * @version v1.0
 * @license MIT
 * @author @themicon_co
 */
(function() {
    'use strict';

    angular
        .module('ngMenuRouter', [
            'ngRoute',
            'ui.router',
            'oc.lazyLoad'
        ]);
})();