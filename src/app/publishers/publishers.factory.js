(function() {

    'use strict';

    angular.module('vmc')

    .factory('Publisher', ['$resource',
        function($resource) {
            return $resource('http://localhost:8080/restapi/' + '/publishers/:id', null, {
                'update': {
                    method: 'PUT'
                }
            });
        }
    ]);

})();