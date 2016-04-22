(function() {
    'use strict';

    angular
        .module('vmc')
        .controller('PublishersController', PublishersController);

    /** @ngInject */
    function PublishersController($http, $log, Publisher, $scope) {
        var vm = this;

        vm.publisher = new Publisher();

        $http.get('publishers.json').success(function(data) {
            vm.publishers = data;
        });

        vm.save = function() {
            $log.debug(vm.publisher);
            Publisher.save(vm.publisher, function(data) {
                $log.debug("Publisher saved successful.");
            }, function(errors) {
                for (var index in errors.data.violations) {
                    var violation = errors.data.violations[index];
                    $scope.newPublisher[violation.field].$setValidity(violation.field, false);
                }
            });
        }
    }
})();