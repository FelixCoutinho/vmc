(function() {
  'use strict';

  angular
    .module('vmc')
    .controller('LifeAndMinistryController', LifeAndMinistryController);

  /** @ngInject */
  function LifeAndMinistryController($scope, $timeout, $http, $log) {
    var vm = this;

    $http.get('lifeandministry_structure_201603.json').success(function(data) {
      vm.assignments = data;
    });

    $http.get('students.json').success(function(data) {
      vm.students = data;
    });

    vm.save = function() {
      var viewAssignments = vm.assignments;
      var finalAssignments = [];
      for (var week in viewAssignments) {
        for (var section in viewAssignments[week]) {
          for (var assignment in viewAssignments[week][section]) {
            var finalAssignment = viewAssignments[week][section][assignment];
            if (finalAssignment.assignment !== angular.isUndefined) {
              finalAssignments.push({
                // "key": md5(week + section + finalAssignment.name),
                "date": week,
                "name:": finalAssignment.name,
                "assistant": finalAssignment.assistant,
                "assignment": finalAssignment.assignment,
                "point": finalAssignment.point,
                "section": section,
                "room": finalAssignment.room
              });
            }
          }
        }
      }
    }
  }
})();
