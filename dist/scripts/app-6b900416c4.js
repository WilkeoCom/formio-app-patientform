!function(){"use strict";angular.module("patientforms",["ngSanitize","ngAria","ui.router","ui.bootstrap","toastr","pascalprecht.translate","ngMap","formio","ngFormioHelper"])}(),angular.module("patientforms").provider("PatientResource",function(){return{$get:function(){return null},templates:{create:"views/patient/create.html",index:"views/patient/index.html","abstract":"views/patient/patient.html",view:"views/patient/view.html"},controllers:{index:["$scope","i18nService",function(e,t){t.setCurrentLang("fr");var r='<formio-grid-cell class="ui-grid-cell-contents" data="COL_FIELD" component="col.colDef.component"></formio-grid-cell>';e.currentResource.gridOptions={columnDefs:[{cellTemplate:'<a style="cursor:pointer;" ng-click="grid.appScope.buttonClick(\'rowView\', row)">'+r+"</a>",displayName:"Prénom",enableFiltering:!0,field:"data.firstName"},{displayName:"Nom",enableFiltering:!0,field:"data.lastName"},{displayName:"Sexe",enableFiltering:!1,field:"data.gender"},{displayName:"Age",enableFiltering:!1,field:"data.age"},{displayName:"Taille",enableFiltering:!1,field:"data.height"},{displayName:"Poids",enableFiltering:!1,field:"data.weight"}]}}],view:["$scope","$stateParams","Formio","i18nService",function(e,t,r,i){i.setCurrentLang("fr"),e.kneeInterventionForm=null,e.formsSrc=r.getProjectUrl()+"/form";var n={type:"form",limit:1,tags:"patient",name__regex:"/^kneeIntervention/i"};new r(e.formsSrc).loadForms({params:n}).then(function(t){t&&t.length>0&&(e.kneeInterventionForm=t[0],e.kneeInterventionForm.url=e.formsSrc+"/"+e.kneeInterventionForm._id)}),e.submissionQuery={},e.submissionQuery["data.patient._id"]=t.patientId}]}}}),function(){"use strict";function e(e,t,r,i){i.init(),t.config=r,angular.forEach(r.forms,function(e,r){t[r]=e}),e.debug("runBlock end")}e.$inject=["$log","$rootScope","AppConfig","FormioAuth"],angular.module("patientforms").run(e)}(),function(){"use strict";function e(e,t,r,i,n,o){e.state("home",{url:"/?",templateUrl:"views/home.html"}),angular.forEach(n.resources,function(e,t){r.register(t,e.form,o.get(e.resource+"Provider"))}),i.register("patient",n.appUrl,{field:[{name:"patient",stateParam:"patientId"}],base:"patient.",tag:"patient"}),t.otherwise("/")}e.$inject=["$stateProvider","$urlRouterProvider","FormioResourceProvider","FormioFormsProvider","AppConfig","$injector"],angular.module("patientforms").config(e)}(),function(){"use strict";angular.module("patientforms").constant("moment",moment)}(),function(){"use strict";function e(e,t,r,i,n,o){o.hashPrefix(""),t.setBaseUrl(i.apiUrl),t.setAppUrl(i.appUrl),r.setStates("auth.login","home"),r.setForceAuth(!0),r.register("login","user"),r.register("register","user"),e.allowHtml=!0,e.timeOut=3e3,e.positionClass="toast-top-right",e.preventDuplicates=!0,e.progressBar=!0,n.useStaticFilesLoader({prefix:"/languages/locale-",suffix:".json"}),n.preferredLanguage("fr"),n.useSanitizeValueStrategy("escape")}e.$inject=["toastrConfig","FormioProvider","FormioAuthProvider","AppConfig","$translateProvider","$locationProvider"],angular.module("patientforms").config(e)}();
//# sourceMappingURL=../maps/scripts/app-6b900416c4.js.map