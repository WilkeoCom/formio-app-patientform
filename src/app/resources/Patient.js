angular.module('patientforms')
  .provider('PatientResource', function() {
    return {
      $get: function() { return null; },
      templates: {
        create: 'views/patient/create.html',
        index: 'views/patient/index.html',
        abstract: 'views/patient/patient.html',
        view: 'views/patient/view.html'
      },
      controllers: {
        index: ['$scope', 'i18nService', function ($scope, i18nService) {
          //Translate ui-grid
          i18nService.setCurrentLang('fr');
          
          var template = '<formio-grid-cell class="ui-grid-cell-contents" data="COL_FIELD" component="col.colDef.component"></formio-grid-cell>';
          $scope.currentResource.gridOptions = {
            columnDefs: [
              {
                cellTemplate: '<a style="cursor:pointer;" ng-click="grid.appScope.buttonClick(\'rowView\', row)">' + template + '</a>',
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
        }]
      }
    };
  });
