!function(){"use strict";function e(e,t){return{getCurrentPosition:function(){var r=e.defer();return t.navigator.geolocation?(t.navigator.geolocation.getCurrentPosition(function(e){r.resolve(e)},function(e){r.reject(e)}),r.promise):r.reject("Geolocation not supported.")}}}e.$inject=["$q","$window"],angular.module("servicetracker",["ngSanitize","ngAria","ui.router","ui.bootstrap","toastr","pascalprecht.translate","ngMap","formio","ngFormioHelper"]).factory("Geolocation",e)}(),angular.module("servicetracker").provider("TimeClockResource",function(){return{$get:function(){return null},parent:"appointment",base:"dealer.customer.appointment.",templates:{view:"views/timeclock/view.html"},controllers:{create:["$scope","Geolocation",function(e,t){t.getCurrentPosition().then(function(t){t&&t.coords&&t.coords.longitude&&t.coords.latitude&&(e.submission.data.location=[t.coords.latitude,t.coords.longitude])})["catch"](function(){e.submission.data.location=[0,0]})}]}}}),angular.module("servicetracker").provider("ServiceResource",function(){return{$get:function(){return null},parent:"appointment",base:"dealer.customer.appointment.",templates:{view:"views/service/view.html"}}}),angular.module("servicetracker").provider("PatientResource",function(){return{$get:function(){return null},templates:{"abstract":"views/patient/patient.html",view:"views/patient/view.html"},controllers:{index:["$scope","i18nService",function(e,t){t.setCurrentLang("fr");var r='<formio-grid-cell class="ui-grid-cell-contents" data="COL_FIELD" component="col.colDef.component"></formio-grid-cell>';e.currentResource.gridOptions={columnDefs:[{cellTemplate:'<a style="cursor:pointer;" ng-click="grid.appScope.buttonClick(\'rowView\', row)">'+r+"</a>",displayName:"Prénom",enableFiltering:!0,field:"data.firstName"},{displayName:"Nom",enableFiltering:!0,field:"data.lastName"},{displayName:"Sexe",enableFiltering:!1,field:"data.gender"},{displayName:"Age",enableFiltering:!1,field:"data.age"},{displayName:"Taille",enableFiltering:!1,field:"data.height"},{displayName:"Poids",enableFiltering:!1,field:"data.weight"}]}}]}}}),angular.module("servicetracker").provider("EquipmentResource",function(){return{$get:function(){return null},parent:"customer",base:"dealer.customer.",templates:{view:"views/equipment/view.html"}}}),angular.module("servicetracker").provider("DealerResource",function(){return{$get:function(){return null},templates:{"abstract":"views/dealer/dealer.html",view:"views/dealer/view.html"}}}),angular.module("servicetracker").provider("CustomerResource",function(){return{$get:function(){return null},parent:"dealer",base:"dealer.",templates:{"abstract":"views/customer/customer.html",view:"views/customer/view.html"},controllers:{view:["$scope",function(e){e.position={lat:"40.74",lng:"-74.18"},e.customer.loadSubmissionPromise.then(function(t){t.data.address&&t.data.address.geometry&&t.data.address.geometry.location&&(e.position.lat=t.data.address.geometry.location.lat,e.position.lng=t.data.address.geometry.location.lng)})}]}}}),angular.module("servicetracker").provider("ContractorResource",function(){return{$get:function(){return null},parent:"dealer",base:"dealer."}}),angular.module("servicetracker").provider("AppointmentResource",function(){return{$get:function(){return null},parent:"customer",base:"dealer.customer.",templates:{"abstract":"views/appointment/appointment.html",view:"views/appointment/view.html"}}}),function(){"use strict";function e(e,t,r,o){o.init(),t.config=r,angular.forEach(r.forms,function(e,r){t[r]=e}),e.debug("runBlock end")}e.$inject=["$log","$rootScope","AppConfig","FormioAuth"],angular.module("servicetracker").run(e)}(),function(){"use strict";function e(e,t,r,o,n,i){e.state("home",{url:"/?",templateUrl:"views/home.html"}).state("appointments",{url:"/appointments",templateUrl:"views/appointment/all.html",controllerAs:"appointments",controller:["$scope","$state","$rootScope",function(e,t,r){e.$on("rowView",function(e,o){t.go("dealer.customer.appointment.view",{dealerId:r.user.data.dealer._id,customerId:o.data.customer._id,appointmentId:o._id})})}]}),angular.forEach(n.resources,function(e,t){r.register(t,e.form,i.get(e.resource+"Provider"))}),o.register("customer",n.appUrl,{field:[{name:"customer",stateParam:"customerId"}],base:"dealer.customer.",tag:"customer"}),o.register("patient",n.appUrl,{field:[{name:"patient",stateParam:"patientId"}],base:"patient.",tag:"patient"}),t.otherwise("/")}e.$inject=["$stateProvider","$urlRouterProvider","FormioResourceProvider","FormioFormsProvider","AppConfig","$injector"],angular.module("servicetracker").config(e)}(),function(){"use strict";angular.module("servicetracker").constant("moment",moment)}(),function(){"use strict";function e(e,t,r,o,n,i){i.hashPrefix(""),t.setBaseUrl(o.apiUrl),t.setAppUrl(o.appUrl),r.setStates("auth.login","home"),r.setForceAuth(!0),r.register("login","user"),e.allowHtml=!0,e.timeOut=3e3,e.positionClass="toast-top-right",e.preventDuplicates=!0,e.progressBar=!0,n.useStaticFilesLoader({prefix:"/languages/locale-",suffix:".json"}),n.preferredLanguage("fr"),n.useSanitizeValueStrategy("escape")}e.$inject=["toastrConfig","FormioProvider","FormioAuthProvider","AppConfig","$translateProvider","$locationProvider"],angular.module("servicetracker").config(e)}();
//# sourceMappingURL=../maps/scripts/app-866abd09b4.js.map
