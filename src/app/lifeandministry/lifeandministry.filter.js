/* global moment:false */
(function() {
  'use strict';

  angular
    .module('vmc')
    .filter('weekDate', function() {
		return function(input) {
			return moment(new Date(input)).format('MMMM D') + '-' + moment(new Date(input)).add(6, 'days').format('D');
		}
	})
})();
