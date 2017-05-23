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
        create: ['$scope', 'uiDatetimePickerConfig', function ($scope, uiDatetimePickerConfig) {
          uiDatetimePickerConfig.buttonBar.now.text = 'Maintenant';
          uiDatetimePickerConfig.buttonBar.today.text = 'Aujourd\'hui';
          uiDatetimePickerConfig.buttonBar.clear.text = 'Effacer';
          uiDatetimePickerConfig.buttonBar.date.text = 'Date';
          uiDatetimePickerConfig.buttonBar.time.text = 'Heure';
          uiDatetimePickerConfig.buttonBar.close.text = 'Fermer';
        }],
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
        }],
        view: ['$scope', '$stateParams', 'Formio', 'i18nService', 
        function ($scope, $stateParams, Formio, i18nService) {
          //Translate ui-grid
          i18nService.setCurrentLang('fr');
 
          $scope.kneeInterventionForm = null;
          $scope.formsSrc = Formio.getProjectUrl() + '/form';

          var params = {
            type: 'form',
            limit: 1,
            tags: 'patient',
            name__regex: '/^kneeIntervention/i'
          };

          (new Formio($scope.formsSrc)).loadForms({params: params}).then(function (forms) {
            if (forms && forms.length > 0) {
              $scope.kneeInterventionForm = forms[0];
              $scope.kneeInterventionForm.url = $scope.formsSrc + "/" + $scope.kneeInterventionForm._id;
            }
          });

          $scope.submissionQuery = {};
          $scope.submissionQuery['data.patient._id'] = $stateParams['patientId'];
        }]
      }
    };
  });
