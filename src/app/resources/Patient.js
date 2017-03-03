angular.module('servicetracker')
  .provider('PatientResource', function() {
    return {
      $get: function() { return null; },
      templates: {
        abstract: 'views/patient/patient.html',
        view: 'views/patient/view.html'
      }
    };
  });