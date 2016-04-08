(function() {
    'use strict';

    angular
        .module('vmc')
        .controller('PublishersController', PublishersController);

    /** @ngInject */
    function PublishersController($http, $log) {
        var vm = this;

        $http.get('publishers.json').success(function(data) {
            vm.publishers = data;
        });
    }
})();