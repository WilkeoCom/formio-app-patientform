angular.module('patientforms')
  .provider('PatientResource', function () {
    return {
      $get: function () { return null; },
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
        index: ['$scope', 'Formio', 'i18nService', function ($scope, Formio, i18nService) {
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
              },
              {
                displayName: 'WOMAC',
                enableFiltering: false,
                field: 'data.score'
              },
              {
                displayName: 'IKDC',
                enableFiltering: false,
                field: 'data.scoreIKDC'
              },
              {
                displayName: 'Quick DASH',
                enableFiltering: false,
                field: 'data.scoreQuickDASH'
              }
            ],
            customAction: function (grid) {
              return new Promise(function (resolve) {

                var getPatientLineSubmissions = function (submissions, line) {
                  return submissions.filter(function (submission) {
                    return submission.data && submission.data.patient._id === line._id;
                  });
                }

                var getSubmissionsWithProperty = function (submissions, property) {
                  var ikdcSumbissions = _.filter(submissions, function (submission) {
                    return angular.isDefined(submission.data[property]);
                  });
                  if (ikdcSumbissions.length == 0) return [];
                  return ikdcSumbissions.map(function (submission) { return submission.data[property]; });
                }

                var setGridLineData = function (gridLine, property, submissions) {
                  var patientList = getSubmissionsWithProperty(submissions, property);
                  if (patientList.length > 0) {                  
                    gridLine.data[property] = patientList.join('/');
                  }
                }

                $scope.formsSrc = Formio.getProjectUrl() + '/form';
                
                var params = {
                  type: 'form',
                  tags: 'patient',
                  name__regex: '/^womacIndex|ikdc|quickDash|/i'
                };

                (new Formio($scope.formsSrc)).loadForms({ params: params }).then(function (forms) {
                  if (forms && forms.length > 0) {
                    var patientIds = grid.gridOptionsDef.data.map(function (patientLine) { return patientLine._id; });
                    var submissionQuery = {};
                    submissionQuery['data.patient._id__in'] = patientIds.join(',');

                    var promesses = [];
                    angular.forEach(forms, function (form) {
                      var formUrl = $scope.formsSrc + "/" + form._id;
                      var formio = new Formio(formUrl);
                      promesses.push(formio.loadSubmissions({ params: submissionQuery }, grid.gridOptionsDef.loadOptions));
                    });

                    Promise.all(promesses).then(function (formsSubmissions) {
                      if (formsSubmissions && formsSubmissions.length > 0) {
                        angular.forEach(grid.gridOptionsDef.data, function (gridLine) {
                          if (gridLine) {
                            angular.forEach(formsSubmissions, function (submissions) {
                              var patientSubmissions = getPatientLineSubmissions(submissions, gridLine);
                              setGridLineData(gridLine, 'score', patientSubmissions); // womac score
                              setGridLineData(gridLine, 'scoreIKDC', patientSubmissions);
                              setGridLineData(gridLine, 'scoreQuickDASH', patientSubmissions);
                            });
                          }
                        });
                      }
                      resolve();
                    });
                  }
                }); 
              });
            }
          };
        }],
        view: ['$scope', '$stateParams', 'Formio', 'i18nService', function ($scope, $stateParams, Formio, i18nService) {
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

          (new Formio($scope.formsSrc)).loadForms({ params: params }).then(function (forms) {
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
