(function() {
    'use strict';

    angular
        .module('ngMenuRouterDemo')
        .run(homeMenu);

    homeMenu.$inject = ['mrMenu'];

    function homeMenu(mrMenu) {

        // Define the menu separated from the route definition
        var menuItem = {
            order: 0,
            name: 'Home',
            sref: 'home'
        };

        mrMenu.addItem(menuItem);

    }
})();