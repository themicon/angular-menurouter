(function() {
    'use strict';

    angular
        .module('ngMenuRouterDemo')
        .controller('AboutController', AboutController);

    // toaster is available due to it was required in the route definition
    AboutController.$inject = ['toaster']
    function AboutController(toaster) {
        var vm = this;

        activate();

        ////////////////

        function activate() {
            vm.pop = function(){
                toaster.pop('success', 'Toaster title', 'Integer venenatis ultrices vulputate.');
            };
        }
    }
})();
