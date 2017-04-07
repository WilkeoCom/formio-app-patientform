(function() {
  'use strict';

  angular
    .module('patientforms')
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
        /*
        controller: ['$scope', '$state', '$rootScope', function($scope, $state, $rootScope) {
          $scope.patients = [];
          $scope.patientsUrl = $rootScope.patientForm + '/submission';
          
          var template = '<formio-grid-cell class="ui-grid-cell-contents" data="COL_FIELD" component="col.colDef.component"></formio-grid-cell>';
          $scope.gridOptions = {
            columnDefs: [
              {
                cellTemplate: '<a style="cursor:pointer;" href="/#/patient/{{row.entity._id}}">' + template + '</a>',
                displayName: 'Prénom',
                enableFiltering: true,
                field: 'data.firstName'
              },
              {
                displayName: 'Nom',
                enableFiltering: true,
                field: 'data.lastName'
              },
              {
                displayName: 'Sexe',
                enableFiltering: false,
                field: 'data.gender'
              },
              {
                displayName: 'Age',
                enableFiltering: false,
                field: 'data.age'
              },
              {
                displayName: 'Taille',
                enableFiltering: false,
                field: 'data.height'
              },
              {
                displayName: 'Poids',
                enableFiltering: false,
                field: 'data.weight'
              }
            ]
          };
        }],        
        controllerAs: 'vm'
        */
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
