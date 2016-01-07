(function() {
  'use strict';

  angular
    .module('vmc')
    .controller('LifeAndMinistryController', LifeAndMinistryController);

  /** @ngInject */
  function LifeAndMinistryController($scope, $timeout) {
    var vm = this;

    var timeout = null;

    var debounceUpdate = function(newVal, oldVal) {
      if (newVal != oldVal) {
        if (timeout) {
          $timeout.cancel(timeout);
        }
        timeout = $timeout(vm.save, 2 * 1000);
      }
    };

    $scope.$watch('assignment', debounceUpdate);

    vm.save = function() {
      var viewAssignments = vm.assignments;
      var finalAssignments = [];
      for (var week in viewAssignments) {
        for (var room in viewAssignments[week]) {
          for (var assignment in viewAssignments[week][room]) {
            var finalAssignment = viewAssignments[week][room][assignment];
            if (finalAssignment.assignment !== angular.isUndefined) {
              finalAssignments.push({
                // "key": md5(week + room + finalAssignment.name),
                "date": week,
                "name:": finalAssignment.name,
                "assistant": finalAssignment.assistant,
                "assignment": finalAssignment.assignment,
                "point": finalAssignment.point,
                "room": room
              });
            }
          }

        }
      }
    }
  }
})();