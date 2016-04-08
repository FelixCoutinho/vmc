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
      .when('/publishers', {
        templateUrl: 'app/publishers/index.html',
        controller: 'PublishersController',
        controllerAs: 'publishers'
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
