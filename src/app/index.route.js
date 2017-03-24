(function() {
  'use strict';

  angular
    .module('servicetracker')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig(
    $stateProvider,
    $urlRouterProvider,
    FormioResourceProvider,
    FormioFormsProvider,
    AppConfig,
    $injector
  ) {
    $stateProvider
      .state('home', {
        url: '/?',
        templateUrl: 'views/home.html'
      });

    // Register all of the resources.
    angular.forEach(AppConfig.resources, function(resource, name) {
      FormioResourceProvider.register(name, resource.form, $injector.get(resource.resource + 'Provider'));
    });

    // Register the form provider for the patient.
    FormioFormsProvider.register('patient', AppConfig.appUrl, {
      field: [{
        name: 'patient',
        stateParam: 'patientId'
      }],
      base: 'patient.',
      tag: 'patient'
    });

    $urlRouterProvider.otherwise('/');
  }

})();
