angular.module('vmcApp', ['ui.bootstrap'])
	.controller('AssignmentsController', function($scope, $http, $timeout) {
		var vm = this;

		$http.get('structure.json').success(function(data) {
			vm.assignments = data;
		});

		$http.get('students.json').success(function(data) {
			vm.students = data;
		});

		var timeout = null;

		var debounceUpdate = function(newVal, oldVal) {
			console.log("Go to saving...");
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
						if (finalAssignment.assignment !== undefined) {
							finalAssignments.push({
								"key": md5(week + room + finalAssignment.name),
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
			console.log(finalAssignments);
		}
	}).filter('weekDate', function() {
		return function(input) {
			return moment(new Date(input)).format('MMMM D') + '-' + moment(new Date(input)).add(6, 'days').format('D');
		}
	});