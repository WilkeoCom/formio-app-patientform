angular.module('servicetracker')
  .provider('PatientResource', function() {
    return {
      $get: function() { return null; },
      templates: {
        abstract: 'views/patient/patient.html',
        view: 'views/patient/view.html'
      },
      controllers: {
        index: ['$scope', function ($scope) {
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
