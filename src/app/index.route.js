(function() {
  'use strict';

  angular
    .module('vmc')
    .config(routeConfig);

  function routeConfig($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        controllerAs: 'main'
      })
      .when('/lifeandministry', {
        templateUrl: 'app/lifeandministry/index.html',
        controller: 'LifeAndMinistryController',
        controllerAs: 'lifeandministry'
      })
      .otherwise({
        redirectTo: '/'
      });
  }

})();
