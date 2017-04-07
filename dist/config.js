var APP_URL = 'http://localhost:3001';
var API_URL = 'http://localhost:3001';

// Parse query string
var query = {};
location.search.substr(1).split("&").forEach(function(item) {
  query[item.split("=")[0]] = item.split("=")[1] && decodeURIComponent(item.split("=")[1]);
});

var appUrl = query.appUrl || APP_URL;
var apiUrl = query.apiUrl || API_URL;
angular.module('patientforms').constant('AppConfig', {
  appUrl: appUrl,
  apiUrl: apiUrl,
  company: query.company || 'Patient Forms',
  icon: query.icon || 'assets/images/logo.png',
  forms: {
    userForm: appUrl + '/user',
    userLoginForm: appUrl + '/user/login',
    userRegisterForm: appUrl + '/user/register',
    patientForm: appUrl + '/patient'
  },
  roles: [
    'Authenticated'
  ],
  resources: {
    patient: {
      form: appUrl + '/patient',
      resource: 'PatientResource'
    }
  }
});
