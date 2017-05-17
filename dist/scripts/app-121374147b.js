!function(){"use strict";angular.module("patientforms",["ngSanitize","ngAria","ui.router","ui.bootstrap","toastr","pascalprecht.translate","ngMap","formio","ngFormioHelper"])}(),angular.module("patientforms").provider("PatientResource",function(){return{$get:function(){return null},templates:{create:"views/patient/create.html",index:"views/patient/index.html","abstract":"views/patient/patient.html",view:"views/patient/view.html"},controllers:{index:["$scope","i18nService",function(e,t){t.setCurrentLang("fr");var i='<formio-grid-cell class="ui-grid-cell-contents" data="COL_FIELD" component="col.colDef.component"></formio-grid-cell>';e.currentResource.gridOptions={columnDefs:[{cellTemplate:'<a style="cursor:pointer;" ng-click="grid.appScope.buttonClick(\'rowView\', row)">'+i+"</a>",displayName:"Prénom",enableFiltering:!0,field:"data.firstName"},{displayName:"Nom",enableFiltering:!0,field:"data.lastName"},{displayName:"Sexe",enableFiltering:!1,field:"data.gender"},{displayName:"Age",enableFiltering:!1,field:"data.age"},{displayName:"Taille",enableFiltering:!1,field:"data.height"},{displayName:"Poids",enableFiltering:!1,field:"data.weight"}]}}],view:["$scope","$stateParams","i18nService",function(e,t,i){i.setCurrentLang("fr"),e.submissionQuery={},e.submissionQuery["data.patient._id"]=t.patientId,e.currentForm={url:"http://localhost:3001/form/59086769c69c8a1a00e7e682"}}]}}}),function(){"use strict";function e(e,t,i,r){r.init(),t.config=i,angular.forEach(i.forms,function(e,i){t[i]=e}),e.debug("runBlock end")}e.$inject=["$log","$rootScope","AppConfig","FormioAuth"],angular.module("patientforms").run(e)}(),function(){"use strict";function e(e,t,i,r,a,n){e.state("home",{url:"/?",templateUrl:"views/home.html"}),angular.forEach(a.resources,function(e,t){i.register(t,e.form,n.get(e.resource+"Provider"))}),r.register("patient",a.appUrl,{field:[{name:"patient",stateParam:"patientId"}],base:"patient.",tag:"patient"}),t.otherwise("/")}e.$inject=["$stateProvider","$urlRouterProvider","FormioResourceProvider","FormioFormsProvider","AppConfig","$injector"],angular.module("patientforms").config(e)}(),function(){"use strict";angular.module("patientforms").constant("moment",moment)}(),function(){"use strict";function e(e,t,i,r,a,n){n.hashPrefix(""),t.setBaseUrl(r.apiUrl),t.setAppUrl(r.appUrl),i.setStates("auth.login","home"),i.setForceAuth(!0),i.register("login","user"),i.register("register","user"),e.allowHtml=!0,e.timeOut=3e3,e.positionClass="toast-top-right",e.preventDuplicates=!0,e.progressBar=!0,a.useStaticFilesLoader({prefix:"/languages/locale-",suffix:".json"}),a.preferredLanguage("fr"),a.useSanitizeValueStrategy("escape")}e.$inject=["toastrConfig","FormioProvider","FormioAuthProvider","AppConfig","$translateProvider","$locationProvider"],angular.module("patientforms").config(e)}();
//# sourceMappingURL=../maps/scripts/app-121374147b.js.map
