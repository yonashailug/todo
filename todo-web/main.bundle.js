webpackJsonp([1],{

/***/ "../../../../../src async recursive":
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = "../../../../../src async recursive";

/***/ }),

/***/ "../../../../../src/app/app.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"page-container\" [ngClass]=\"{'open': isMenuToggled}\">\n    <div class=\"page-border\"></div>\n    <header class=\"header\">\n        <div class=\"header-content-left\">\n            <button mat-icon-button class=\"icon-menu\" (click)=\"toggleMenu()\">\n                <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\"><path d=\"M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z\"/></svg>\n            </button>\n            <span class=\"medium\">my</span><span class=\"medium uppercase\">Todo</span>\n        </div>\n        <div class=\"header-content-right\" *ngIf=\"user?.getIsLoggedIn()\">\n            <p class=\"display-name\">{{ user?.getName() }}</p>\n            <button mat-icon-button [matMenuTriggerFor]=\"profileMenu\">\n                    <div class=\"avatar avatar--circle avatar--md\">\n                            <img [src]=\"user?.getPhotoUrl()\" />\n                        </div>\n                </button>\n            <mat-menu #profileMenu=\"matMenu\" [overlapTrigger]=\"false\">\n                <button mat-menu-item (click)=\"signOut()\">Logout</button>\n            </mat-menu>\n        </div>\n    </header>\n    <div class=\"side-menu\" *ngIf=\"isMenuToggled\">\n        <div class=\"side-menu-container\">\n            <button mat-menu-item (click)=\"changeLabel('home')\">\n                <span class=\"small\">Notes</span>\n            </button>\n            <button *ngFor=\"let label of labels\" mat-menu-item (click)=\"changeLabel(label)\">\n                <span class=\"small\">{{ label }}</span>\n            </button>\n        </div>\n    </div>\n    <router-outlet></router-outlet>\n</div>"

/***/ }),

/***/ "../../../../../src/app/app.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".header {\n  padding-top: 8px;\n  padding-bottom: 8px;\n  margin-bottom: 24px;\n  text-align: center;\n  color: #777;\n  display: -webkit-box;\n  display: -moz-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n  -ms-flex-align: center;\n  -moz-align-items: center;\n  align-items: center; }\n\n.header-content-left,\n.header-content-right {\n  display: -webkit-box;\n  display: -moz-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n  -ms-flex-align: center;\n  -moz-align-items: center;\n  align-items: center; }\n\n.header-content-left {\n  padding: 0 24px; }\n\n.header-content-right {\n  margin-left: auto;\n  padding: 0 24px; }\n\n.header-content-right > * {\n  display: inline-block; }\n\n.icon-chevron-left {\n  -webkit-transform: rotate(-90deg);\n          transform: rotate(-90deg); }\n\n.avatar,\n.avatar--circle,\n.avatar--md {\n  display: inline-block;\n  overflow: hidden;\n  line-height: 1;\n  vertical-align: middle;\n  margin-right: 5px;\n  height: 30px;\n  width: 30px; }\n\n.avatar img,\n.avatar--circle img,\n.avatar--md img {\n  width: 100%;\n  height: 100%; }\n\n.avatar--circle {\n  border-radius: 50%;\n  background: #A8B7C1; }\n\n.display-name {\n  white-space: nowrap; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/app.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shared_services_auth_service__ = __webpack_require__("../../../../../src/app/shared/services/auth.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angularfire2_auth__ = __webpack_require__("../../../../angularfire2/auth/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__shared_model_user__ = __webpack_require__("../../../../../src/app/shared/model/user.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var AppComponent = (function () {
    function AppComponent(authService, afAuth, router) {
        var _this = this;
        this.authService = authService;
        this.afAuth = afAuth;
        this.router = router;
        this.title = 'Angular 4 Todo App';
        this.isMenuToggled = false;
        this.labels = ['Work', 'Inspiration', 'Personal'];
        this.authService.getUser().subscribe(function (user) {
            if (user === null) {
                _this.user = new __WEBPACK_IMPORTED_MODULE_4__shared_model_user__["a" /* User */]();
                _this.router.navigate(['/signin']);
            }
            else {
                _this.user = new __WEBPACK_IMPORTED_MODULE_4__shared_model_user__["a" /* User */]();
                _this.user.setName(user.displayName);
                _this.user.setEmail(user.email);
                _this.user.setPhotoUrl(user.photoURL);
                _this.user.setIsLoggedIn(true);
                _this.router.navigate(['/todo']);
            }
        });
    }
    AppComponent.prototype.signOut = function () {
        this.authService.signOut();
        this.router.navigate(['/signin']);
    };
    AppComponent.prototype.toggleMenu = function () {
        if (this.isMenuToggled) {
            this.isMenuToggled = false;
        }
        else {
            this.isMenuToggled = true;
        }
    };
    AppComponent.prototype.changeLabel = function (label) {
        if (!label || label === 'home') {
            this.isMenuToggled = false;
            this.router.navigate(['/todo', 'home']);
        }
        else {
            this.isMenuToggled = false;
            this.router.navigate(['/todo', label]);
        }
    };
    return AppComponent;
}());
AppComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-root',
        template: __webpack_require__("../../../../../src/app/app.component.html"),
        styles: [__webpack_require__("../../../../../src/app/app.component.scss")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__shared_services_auth_service__["a" /* AuthService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__shared_services_auth_service__["a" /* AuthService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3_angularfire2_auth__["b" /* AngularFireAuth */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3_angularfire2_auth__["b" /* AngularFireAuth */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === "function" && _c || Object])
], AppComponent);

var _a, _b, _c;
//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ "../../../../../src/app/app.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__("../../../platform-browser/@angular/platform-browser.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser_animations__ = __webpack_require__("../../../platform-browser/@angular/platform-browser/animations.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_material__ = __webpack_require__("../../../material/esm5/material.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_ng2_dragula__ = __webpack_require__("../../../../ng2-dragula/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_ng2_dragula___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_ng2_dragula__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_angularfire2__ = __webpack_require__("../../../../angularfire2/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_angularfire2_database__ = __webpack_require__("../../../../angularfire2/database/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_angularfire2_auth__ = __webpack_require__("../../../../angularfire2/auth/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_angularfire2_firestore__ = __webpack_require__("../../../../angularfire2/firestore/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__app_component__ = __webpack_require__("../../../../../src/app/app.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__todo_todo_component__ = __webpack_require__("../../../../../src/app/todo/todo.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__todo_todo_service__ = __webpack_require__("../../../../../src/app/todo/todo.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__signin_signin_component__ = __webpack_require__("../../../../../src/app/signin/signin.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__shared_shared_module__ = __webpack_require__("../../../../../src/app/shared/shared.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__shared_services_guard_service__ = __webpack_require__("../../../../../src/app/shared/services/guard.service.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



















var routes = [
    {
        path: '',
        redirectTo: 'signin',
        pathMatch: 'full'
    }, {
        path: 'todo',
        component: __WEBPACK_IMPORTED_MODULE_13__todo_todo_component__["a" /* TodoComponent */],
        canActivate: [__WEBPACK_IMPORTED_MODULE_18__shared_services_guard_service__["a" /* GuardService */]]
    }, {
        path: 'todo/:id',
        component: __WEBPACK_IMPORTED_MODULE_13__todo_todo_component__["a" /* TodoComponent */],
        canActivate: [__WEBPACK_IMPORTED_MODULE_18__shared_services_guard_service__["a" /* GuardService */]]
    }, {
        path: 'signin',
        component: __WEBPACK_IMPORTED_MODULE_16__signin_signin_component__["a" /* SigninComponent */]
    }, {
        path: '**',
        component: __WEBPACK_IMPORTED_MODULE_13__todo_todo_component__["a" /* TodoComponent */]
    }
];
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["NgModule"])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_12__app_component__["a" /* AppComponent */],
            __WEBPACK_IMPORTED_MODULE_13__todo_todo_component__["a" /* TodoComponent */],
            __WEBPACK_IMPORTED_MODULE_16__signin_signin_component__["a" /* SigninComponent */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_3__angular_http__["a" /* HttpModule */],
            __WEBPACK_IMPORTED_MODULE_6__angular_router__["a" /* RouterModule */],
            __WEBPACK_IMPORTED_MODULE_4__angular_forms__["a" /* FormsModule */],
            __WEBPACK_IMPORTED_MODULE_4__angular_forms__["b" /* ReactiveFormsModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser_animations__["a" /* BrowserAnimationsModule */],
            __WEBPACK_IMPORTED_MODULE_5__angular_material__["a" /* MatInputModule */],
            __WEBPACK_IMPORTED_MODULE_5__angular_material__["b" /* MatButtonModule */],
            __WEBPACK_IMPORTED_MODULE_5__angular_material__["c" /* MatMenuModule */],
            __WEBPACK_IMPORTED_MODULE_5__angular_material__["d" /* MatCheckboxModule */],
            __WEBPACK_IMPORTED_MODULE_5__angular_material__["e" /* MatCardModule */],
            __WEBPACK_IMPORTED_MODULE_5__angular_material__["f" /* MatListModule */],
            __WEBPACK_IMPORTED_MODULE_5__angular_material__["g" /* MatSnackBarModule */],
            __WEBPACK_IMPORTED_MODULE_5__angular_material__["h" /* MatGridListModule */],
            __WEBPACK_IMPORTED_MODULE_6__angular_router__["a" /* RouterModule */].forRoot(routes),
            __WEBPACK_IMPORTED_MODULE_7_ng2_dragula__["DragulaModule"],
            __WEBPACK_IMPORTED_MODULE_8_angularfire2__["a" /* AngularFireModule */].initializeApp(__WEBPACK_IMPORTED_MODULE_15__environments_environment__["a" /* environment */].firebase),
            __WEBPACK_IMPORTED_MODULE_10_angularfire2_auth__["a" /* AngularFireAuthModule */],
            __WEBPACK_IMPORTED_MODULE_11_angularfire2_firestore__["a" /* AngularFirestoreModule */],
            __WEBPACK_IMPORTED_MODULE_9_angularfire2_database__["a" /* AngularFireDatabaseModule */],
            __WEBPACK_IMPORTED_MODULE_17__shared_shared_module__["a" /* SharedModule */]
        ],
        exports: [],
        providers: [__WEBPACK_IMPORTED_MODULE_14__todo_todo_service__["a" /* TodoService */]],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_12__app_component__["a" /* AppComponent */]]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ "../../../../../src/app/shared/component/global-notification/global-notification.component.html":
/***/ (function(module, exports) {

module.exports = "<ng-container *ngIf=\"messageInfo?.getIsError()\">\n    <div class=\"message-area\" *ngIf=\"!showMessage\" [@fadeInOut]>\n        <p>{{messageInfo?.getMessageBody()}}</p>\n        <span class=\"dismiss\" (click)=\"dismissMessage()\">\n      <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"18\" height=\"18\" viewBox=\"0 0 18 18\">\n          <path d=\"M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z\"/>\n      </svg>\n  </span>\n    </div>\n</ng-container>"

/***/ }),

/***/ "../../../../../src/app/shared/component/global-notification/global-notification.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/shared/component/global-notification/global-notification.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_animations__ = __webpack_require__("../../../animations/@angular/animations.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__model__ = __webpack_require__("../../../../../src/app/shared/model/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__global_notification_service__ = __webpack_require__("../../../../../src/app/shared/component/global-notification/global-notification.service.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GlobalNotificationComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var GlobalNotificationComponent = (function () {
    function GlobalNotificationComponent(globalNotificationService) {
        this.globalNotificationService = globalNotificationService;
        this.messageInfo = new __WEBPACK_IMPORTED_MODULE_2__model__["a" /* MessageInfo */]();
        this.showMessage = false;
    }
    GlobalNotificationComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.globalNotificationService.messageInfoChanges.subscribe(function (messageInfo) {
            _this.messageInfo = messageInfo;
            _this.showMessage = false;
        });
    };
    GlobalNotificationComponent.prototype.dismissMessage = function () {
        this.showMessage ? this.showMessage = false : this.showMessage = true;
    };
    return GlobalNotificationComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__model__["a" /* MessageInfo */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__model__["a" /* MessageInfo */]) === "function" && _a || Object)
], GlobalNotificationComponent.prototype, "messageInfo", void 0);
GlobalNotificationComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-global-notification',
        template: __webpack_require__("../../../../../src/app/shared/component/global-notification/global-notification.component.html"),
        styles: [__webpack_require__("../../../../../src/app/shared/component/global-notification/global-notification.component.scss")],
        animations: [
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["a" /* trigger */])('fadeInOut', [
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["d" /* transition */])(':enter', [
                    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["c" /* style */])({ opacity: 0, background: 'red' }),
                    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["e" /* animate */])(200, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["c" /* style */])({ opacity: 1, background: 'green' }))
                ]),
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["d" /* transition */])(':leave', [
                    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["e" /* animate */])(0, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["c" /* style */])({ opacity: 0, background: 'red' }))
                ])
            ])
        ]
    }),
    __metadata("design:paramtypes", [typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__global_notification_service__["a" /* GlobalNotificationService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__global_notification_service__["a" /* GlobalNotificationService */]) === "function" && _b || Object])
], GlobalNotificationComponent);

var _a, _b;
//# sourceMappingURL=global-notification.component.js.map

/***/ }),

/***/ "../../../../../src/app/shared/component/global-notification/global-notification.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_BehaviorSubject__ = __webpack_require__("../../../../rxjs/BehaviorSubject.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_BehaviorSubject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_BehaviorSubject__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GlobalNotificationService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var GlobalNotificationService = (function () {
    function GlobalNotificationService() {
        this.messageInfo = new __WEBPACK_IMPORTED_MODULE_1_rxjs_BehaviorSubject__["BehaviorSubject"](null);
        this.messageInfoChanges = this.messageInfo.asObservable();
    }
    GlobalNotificationService.prototype.getNotificationMessage = function () {
        return this.messageInfo.value;
    };
    GlobalNotificationService.prototype.setNotificationMessage = function (messageInfo) {
        this.messageInfo.next(messageInfo);
    };
    return GlobalNotificationService;
}());
GlobalNotificationService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [])
], GlobalNotificationService);

//# sourceMappingURL=global-notification.service.js.map

/***/ }),

/***/ "../../../../../src/app/shared/config/index.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Config; });
var Config = (function () {
    function Config() {
    }
    return Config;
}());

Config.themes = [{
        themeName: 'themeWhite',
        className: 'theme--white',
        colorValue: '#fff'
    }, {
        themeName: 'themeCyan',
        className: 'theme--cyan',
        colorValue: '#a7ffeb'
    }, {
        themeName: 'themeYellowLight',
        className: 'theme--yellow-light',
        colorValue: '#ffff8d'
    }, {
        themeName: 'themeRedLight',
        className: 'theme--red-light',
        colorValue: '#ff8a80'
    }];
Config.defaultLabels = ['Inspiration', 'Personal', 'Work'];
Config.DB_PATH = 'todos';
Config.FORM_CONTROL_NAME = 'todos';
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "../../../../../src/app/shared/model/abstract.model.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AbstractModel; });
var AbstractModel = (function () {
    function AbstractModel() {
    }
    return AbstractModel;
}());

//# sourceMappingURL=abstract.model.js.map

/***/ }),

/***/ "../../../../../src/app/shared/model/index.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__abstract_model__ = __webpack_require__("../../../../../src/app/shared/model/abstract.model.ts");
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__media__ = __webpack_require__("../../../../../src/app/shared/model/media.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_1__media__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__message_info__ = __webpack_require__("../../../../../src/app/shared/model/message-info.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_2__message_info__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__user__ = __webpack_require__("../../../../../src/app/shared/model/user.ts");
/* unused harmony namespace reexport */




//# sourceMappingURL=index.js.map

/***/ }),

/***/ "../../../../../src/app/shared/model/media.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Media; });
var Media = (function () {
    function Media(file) {
        this.file = file;
    }
    return Media;
}());

//# sourceMappingURL=media.js.map

/***/ }),

/***/ "../../../../../src/app/shared/model/message-info.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MessageInfo; });
var MessageInfo = (function () {
    function MessageInfo() {
    }
    MessageInfo.prototype.getMessageBody = function () { return this.messageBody; };
    MessageInfo.prototype.setMessageBody = function (value) { this.messageBody = value; };
    MessageInfo.prototype.getMessageCode = function () { return this.messageCode; };
    MessageInfo.prototype.setMessageCode = function (value) { this.messageCode = value; };
    MessageInfo.prototype.getIsError = function () { return this.isError; };
    MessageInfo.prototype.setIsError = function (value) { this.isError = value; };
    return MessageInfo;
}());

//# sourceMappingURL=message-info.js.map

/***/ }),

/***/ "../../../../../src/app/shared/model/user.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return User; });
var User = (function () {
    function User() {
    }
    User.fromObject = function (obj) {
        var userRef = new User();
        return Object.assign(userRef, obj);
    };
    User.prototype.getName = function () { return this.name; };
    User.prototype.setName = function (value) { this.name = value; };
    User.prototype.getEmail = function () { return this.email; };
    User.prototype.setEmail = function (value) { this.email = value; };
    User.prototype.getIsLoggedIn = function () { return this.isLoggedIn; };
    User.prototype.setIsLoggedIn = function (value) { this.isLoggedIn = value; };
    User.prototype.getPhotoUrl = function () { return this.photoUrl; };
    User.prototype.setPhotoUrl = function (value) { this.photoUrl = value; };
    return User;
}());

//# sourceMappingURL=user.js.map

/***/ }),

/***/ "../../../../../src/app/shared/pipes/media.url.pipe.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_firebase_storage_service__ = __webpack_require__("../../../../../src/app/shared/services/firebase.storage.service.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MediaUrlPipe; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var MediaUrlPipe = (function () {
    function MediaUrlPipe(firebaseStorageService) {
        this.firebaseStorageService = firebaseStorageService;
    }
    MediaUrlPipe.prototype.transform = function (filename, type) {
        if (!filename) {
            return '';
        }
        return this.firebaseStorageService.getImageUrl(filename);
    };
    return MediaUrlPipe;
}());
MediaUrlPipe = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Pipe"])({ name: 'mediaUrl' }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_firebase_storage_service__["a" /* FirebaseStorageService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_firebase_storage_service__["a" /* FirebaseStorageService */]) === "function" && _a || Object])
], MediaUrlPipe);

var _a;
//# sourceMappingURL=media.url.pipe.js.map

/***/ }),

/***/ "../../../../../src/app/shared/services/auth.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angularfire2_auth__ = __webpack_require__("../../../../angularfire2/auth/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_firebase_app__ = __webpack_require__("../../../../firebase/app/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_firebase_app___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_firebase_app__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AuthService = (function () {
    function AuthService(afAuth) {
        this.afAuth = afAuth;
    }
    AuthService.prototype.signInWithGoogle = function () {
        return this.afAuth.auth.signInWithPopup(new __WEBPACK_IMPORTED_MODULE_2_firebase_app__["auth"].GoogleAuthProvider());
    };
    AuthService.prototype.getUser = function () {
        return this.afAuth.authState;
    };
    AuthService.prototype.getCurrentUser = function () {
        this.initCurrentUser();
        return this.user;
    };
    AuthService.prototype.initCurrentUser = function () {
        this.user = this.afAuth.auth.currentUser;
    };
    AuthService.prototype.signOut = function () {
        this.afAuth.auth.signOut();
    };
    return AuthService;
}());
AuthService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_angularfire2_auth__["b" /* AngularFireAuth */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_angularfire2_auth__["b" /* AngularFireAuth */]) === "function" && _a || Object])
], AuthService);

var _a;
//# sourceMappingURL=auth.service.js.map

/***/ }),

/***/ "../../../../../src/app/shared/services/event-emitter.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_BehaviorSubject__ = __webpack_require__("../../../../rxjs/BehaviorSubject.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_BehaviorSubject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_BehaviorSubject__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EventEmitterService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


var EventEmitterService = (function () {
    function EventEmitterService() {
        this.uploadProgress = new __WEBPACK_IMPORTED_MODULE_1_rxjs_BehaviorSubject__["BehaviorSubject"](0);
        this.uploadProgressChanges = this.uploadProgress.asObservable();
    }
    EventEmitterService.prototype.setUploadProgress = function (value) {
        this.uploadProgress.next(value);
    };
    EventEmitterService.prototype.getUploadProgress = function () {
        return this.uploadProgress.value;
    };
    return EventEmitterService;
}());
EventEmitterService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])()
], EventEmitterService);

//# sourceMappingURL=event-emitter.service.js.map

/***/ }),

/***/ "../../../../../src/app/shared/services/firebase.storage.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FirebaseStorageService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var FirebaseStorageService = (function () {
    function FirebaseStorageService() {
        this.FIREBASE_STORAGE_API_URL = 'https://storage.googleapis.com/';
    }
    FirebaseStorageService.prototype.getImagesUrl = function () {
        return "" + this.FIREBASE_STORAGE_API_URL + __WEBPACK_IMPORTED_MODULE_1__environments_environment__["a" /* environment */].firebase.storageBucket;
    };
    FirebaseStorageService.prototype.getImageUrl = function (filename) {
        return this.getImagesUrl() + "/" + filename;
    };
    return FirebaseStorageService;
}());
FirebaseStorageService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [])
], FirebaseStorageService);

//# sourceMappingURL=firebase.storage.service.js.map

/***/ }),

/***/ "../../../../../src/app/shared/services/guard.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_auth__ = __webpack_require__("../../../../angularfire2/auth/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_take__ = __webpack_require__("../../../../rxjs/add/operator/take.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_take___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_take__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GuardService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var GuardService = (function () {
    function GuardService(afAuth, router) {
        this.afAuth = afAuth;
        this.router = router;
    }
    GuardService.prototype.canActivate = function (next, state) {
        return this.afAuth.authState.map(function (userAuthState) {
            if (!userAuthState) {
                return false;
            }
            return true;
        }).take(1);
    };
    return GuardService;
}());
GuardService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2_angularfire2_auth__["b" /* AngularFireAuth */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2_angularfire2_auth__["b" /* AngularFireAuth */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === "function" && _b || Object])
], GuardService);

var _a, _b;
//# sourceMappingURL=guard.service.js.map

/***/ }),

/***/ "../../../../../src/app/shared/services/snackbar.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_material__ = __webpack_require__("../../../material/esm5/material.es5.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SnackBarService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var SnackBarService = (function () {
    function SnackBarService(snackBar) {
        this.snackBar = snackBar;
    }
    SnackBarService.prototype.openSnackBar = function (message) {
        this.snackBarRef = this.snackBar.open(message, '', { duration: 3000 });
    };
    return SnackBarService;
}());
SnackBarService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_material__["i" /* MatSnackBar */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_material__["i" /* MatSnackBar */]) === "function" && _a || Object])
], SnackBarService);

var _a;
//# sourceMappingURL=snackbar.service.js.map

/***/ }),

/***/ "../../../../../src/app/shared/shared.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("../../../common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__pipes_media_url_pipe__ = __webpack_require__("../../../../../src/app/shared/pipes/media.url.pipe.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_firebase_storage_service__ = __webpack_require__("../../../../../src/app/shared/services/firebase.storage.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_auth_service__ = __webpack_require__("../../../../../src/app/shared/services/auth.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_guard_service__ = __webpack_require__("../../../../../src/app/shared/services/guard.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__services_event_emitter_service__ = __webpack_require__("../../../../../src/app/shared/services/event-emitter.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__services_snackbar_service__ = __webpack_require__("../../../../../src/app/shared/services/snackbar.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__component_global_notification_global_notification_component__ = __webpack_require__("../../../../../src/app/shared/component/global-notification/global-notification.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__component_global_notification_global_notification_service__ = __webpack_require__("../../../../../src/app/shared/component/global-notification/global-notification.service.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SharedModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};










var SharedModule = (function () {
    function SharedModule() {
    }
    return SharedModule;
}());
SharedModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_common__["a" /* CommonModule */]
        ],
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__pipes_media_url_pipe__["a" /* MediaUrlPipe */],
            __WEBPACK_IMPORTED_MODULE_8__component_global_notification_global_notification_component__["a" /* GlobalNotificationComponent */]
        ],
        providers: [
            __WEBPACK_IMPORTED_MODULE_3__services_firebase_storage_service__["a" /* FirebaseStorageService */],
            __WEBPACK_IMPORTED_MODULE_4__services_auth_service__["a" /* AuthService */],
            __WEBPACK_IMPORTED_MODULE_5__services_guard_service__["a" /* GuardService */],
            __WEBPACK_IMPORTED_MODULE_6__services_event_emitter_service__["a" /* EventEmitterService */],
            __WEBPACK_IMPORTED_MODULE_7__services_snackbar_service__["a" /* SnackBarService */],
            __WEBPACK_IMPORTED_MODULE_9__component_global_notification_global_notification_service__["a" /* GlobalNotificationService */]
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_2__pipes_media_url_pipe__["a" /* MediaUrlPipe */],
            __WEBPACK_IMPORTED_MODULE_8__component_global_notification_global_notification_component__["a" /* GlobalNotificationComponent */]
        ]
    })
], SharedModule);

//# sourceMappingURL=shared.module.js.map

/***/ }),

/***/ "../../../../../src/app/signin/signin.component.html":
/***/ (function(module, exports) {

module.exports = "<app-global-notification [messageInfo]=\"messageInfo\"></app-global-notification>\n<div class=\"signin-container\">\n    <div class=\"signin-content\">\n        <div class=\"title\">\n            <!-- <div class=\"signin-text\">\n                <span class=\"medium\">my</span><span class=\"medium uppercase\">Todo</span>\n            </div> -->\n            <div class=\"p\">Create &amp; complete your daily tasks.</div>\n        </div>\n        <button mat-raised-button (click)=\"signin();\">\n                <svg width=\"46px\" height=\"46px\" viewBox=\"0 0 46 46\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" xmlns:sketch=\"http://www.bohemiancoding.com/sketch/ns\">\n                    <defs>\n                        <filter x=\"-50%\" y=\"-50%\" width=\"200%\" height=\"200%\" filterUnits=\"objectBoundingBox\" id=\"filter-1\">\n                            <feOffset dx=\"0\" dy=\"1\" in=\"SourceAlpha\" result=\"shadowOffsetOuter1\"></feOffset>\n                            <feGaussianBlur stdDeviation=\"0.5\" in=\"shadowOffsetOuter1\" result=\"shadowBlurOuter1\"></feGaussianBlur>\n                            <feColorMatrix values=\"0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.168 0\" in=\"shadowBlurOuter1\" type=\"matrix\" result=\"shadowMatrixOuter1\"></feColorMatrix>\n                            <feOffset dx=\"0\" dy=\"0\" in=\"SourceAlpha\" result=\"shadowOffsetOuter2\"></feOffset>\n                            <feGaussianBlur stdDeviation=\"0.5\" in=\"shadowOffsetOuter2\" result=\"shadowBlurOuter2\"></feGaussianBlur>\n                            <feColorMatrix values=\"0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.084 0\" in=\"shadowBlurOuter2\" type=\"matrix\" result=\"shadowMatrixOuter2\"></feColorMatrix>\n                            <feMerge>\n                                <feMergeNode in=\"shadowMatrixOuter1\"></feMergeNode>\n                                <feMergeNode in=\"shadowMatrixOuter2\"></feMergeNode>\n                                <feMergeNode in=\"SourceGraphic\"></feMergeNode>\n                            </feMerge>\n                        </filter>\n                        <rect id=\"path-2\" x=\"0\" y=\"0\" width=\"40\" height=\"40\" rx=\"2\"></rect>\n                    </defs>\n                    <g id=\"Google-Button\" stroke=\"none\" stroke-width=\"1\" fill=\"none\" fill-rule=\"evenodd\" sketch:type=\"MSPage\">\n                        <g id=\"9-PATCH\" sketch:type=\"MSArtboardGroup\" transform=\"translate(-608.000000, -160.000000)\"></g>\n                        <g id=\"btn_google_light_normal\" sketch:type=\"MSArtboardGroup\" transform=\"translate(-1.000000, -1.000000)\">\n                            <g id=\"button\" sketch:type=\"MSLayerGroup\" transform=\"translate(4.000000, 4.000000)\">\n                                <g id=\"button-bg\">\n                                    <use fill=\"#FFFFFF\" fill-rule=\"evenodd\" sketch:type=\"MSShapeGroup\" xlink:href=\"#path-2\"></use>\n                                    <use fill=\"none\" xlink:href=\"#path-2\"></use>\n                                    <use fill=\"none\" xlink:href=\"#path-2\"></use>\n                                    <use fill=\"none\" xlink:href=\"#path-2\"></use>\n                                </g>\n                            </g>\n                            <g id=\"logo_googleg_48dp\" sketch:type=\"MSLayerGroup\" transform=\"translate(15.000000, 15.000000)\">\n                                <path d=\"M17.64,9.20454545 C17.64,8.56636364 17.5827273,7.95272727 17.4763636,7.36363636 L9,7.36363636 L9,10.845 L13.8436364,10.845 C13.635,11.97 13.0009091,12.9231818 12.0477273,13.5613636 L12.0477273,15.8195455 L14.9563636,15.8195455 C16.6581818,14.2527273 17.64,11.9454545 17.64,9.20454545 L17.64,9.20454545 Z\" id=\"Shape\" fill=\"#4285F4\" sketch:type=\"MSShapeGroup\"></path>\n                                <path d=\"M9,18 C11.43,18 13.4672727,17.1940909 14.9563636,15.8195455 L12.0477273,13.5613636 C11.2418182,14.1013636 10.2109091,14.4204545 9,14.4204545 C6.65590909,14.4204545 4.67181818,12.8372727 3.96409091,10.71 L0.957272727,10.71 L0.957272727,13.0418182 C2.43818182,15.9831818 5.48181818,18 9,18 L9,18 Z\" id=\"Shape\" fill=\"#34A853\" sketch:type=\"MSShapeGroup\"></path>\n                                <path d=\"M3.96409091,10.71 C3.78409091,10.17 3.68181818,9.59318182 3.68181818,9 C3.68181818,8.40681818 3.78409091,7.83 3.96409091,7.29 L3.96409091,4.95818182 L0.957272727,4.95818182 C0.347727273,6.17318182 0,7.54772727 0,9 C0,10.4522727 0.347727273,11.8268182 0.957272727,13.0418182 L3.96409091,10.71 L3.96409091,10.71 Z\" id=\"Shape\" fill=\"#FBBC05\" sketch:type=\"MSShapeGroup\"></path>\n                                <path d=\"M9,3.57954545 C10.3213636,3.57954545 11.5077273,4.03363636 12.4404545,4.92545455 L15.0218182,2.34409091 C13.4631818,0.891818182 11.4259091,0 9,0 C5.48181818,0 2.43818182,2.01681818 0.957272727,4.95818182 L3.96409091,7.29 C4.67181818,5.16272727 6.65590909,3.57954545 9,3.57954545 L9,3.57954545 Z\" id=\"Shape\" fill=\"#EA4335\" sketch:type=\"MSShapeGroup\"></path>\n                                <path d=\"M0,0 L18,0 L18,18 L0,18 L0,0 Z\" id=\"Shape\" sketch:type=\"MSShapeGroup\"></path>\n                            </g>\n                            <g id=\"handles_square\" sketch:type=\"MSLayerGroup\"></g>\n                        </g>\n                    </g>\n                </svg> Login with Google</button>\n    </div>\n</div>"

/***/ }),

/***/ "../../../../../src/app/signin/signin.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".signin-container {\n  position: fixed;\n  left: 0;\n  right: 0;\n  width: 100%;\n  height: 100%;\n  text-align: center;\n  display: -webkit-box;\n  display: -moz-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n  -ms-flex-align: center;\n  -moz-align-items: center;\n  align-items: center;\n  -webkit-box-pack: center;\n  -ms-flex-pack: center;\n  -moz-justify-content: center;\n  justify-content: center;\n  bottom: 40px; }\n\n.signin-content {\n  display: block;\n  margin: 24px 0;\n  padding: 48px 24px;\n  border-radius: 8px; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/signin/signin.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__shared_services_auth_service__ = __webpack_require__("../../../../../src/app/shared/services/auth.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__shared_component_global_notification_global_notification_service__ = __webpack_require__("../../../../../src/app/shared/component/global-notification/global-notification.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__shared_model__ = __webpack_require__("../../../../../src/app/shared/model/index.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SigninComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var SigninComponent = (function () {
    function SigninComponent(authService, globalNotificationService, router) {
        var _this = this;
        this.authService = authService;
        this.globalNotificationService = globalNotificationService;
        this.router = router;
        this.globalNotificationService.messageInfoChanges.subscribe(function (messageInfo) {
            _this.messageInfo = messageInfo;
        });
    }
    SigninComponent.prototype.ngOnInit = function () {
    };
    SigninComponent.prototype.signin = function () {
        var _this = this;
        this.authService.signInWithGoogle().then(function (data) {
            _this.authService.initCurrentUser();
            _this.router.navigate(['/todo']);
        }).catch(function (error) {
            _this.messageInfo = new __WEBPACK_IMPORTED_MODULE_4__shared_model__["a" /* MessageInfo */]();
            var message = '';
            switch (error.code) {
                case 'auth/network-request-failed':
                    message = 'A network error has occurred.';
                    break;
            }
            if (message) {
                _this.messageInfo.setMessageBody(message);
                _this.messageInfo.setIsError(true);
                _this.setNotificationMessage(_this.messageInfo);
            }
        });
    };
    SigninComponent.prototype.setNotificationMessage = function (messageInfo) {
        this.globalNotificationService.setNotificationMessage(messageInfo);
    };
    return SigninComponent;
}());
SigninComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-signin',
        template: __webpack_require__("../../../../../src/app/signin/signin.component.html"),
        styles: [__webpack_require__("../../../../../src/app/signin/signin.component.scss")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__shared_services_auth_service__["a" /* AuthService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__shared_services_auth_service__["a" /* AuthService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__shared_component_global_notification_global_notification_service__["a" /* GlobalNotificationService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__shared_component_global_notification_global_notification_service__["a" /* GlobalNotificationService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */]) === "function" && _c || Object])
], SigninComponent);

var _a, _b, _c;
//# sourceMappingURL=signin.component.js.map

/***/ }),

/***/ "../../../../../src/app/todo/todo.component.html":
/***/ (function(module, exports) {

module.exports = "<app-global-notification [messageInfo]=\"messageInfo\"></app-global-notification>\n<div class=\"wrapper\" *ngIf=\"!showLoder\" [ngClass]=\"{'full-screen': fullScreenClass}\">\n    <ul class=\"header-search\">\n        <li>\n            <span>\n                    <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\"><path d=\"M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z\"/></svg>\n            </span>\n            <span class=\"search-container\">\n                <mat-input-container floatPlaceholder=\"never\">\n                    <input (focus)=\"fullScreenSearch();\" autocomplete=\"off\" (keydown)=\"searchTodos($event)\" [formControl]=\"filterTodosFormControl\" matInput matTextareaAutosize type=\"text\" placeholder=\"Search\">\n                </mat-input-container>\n            </span>\n        </li>\n        <li *ngIf=\"!fullScreenClass\" class=\"new-list  link\" (click)=\"addNewTodo()\">\n            <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\">\n                <path d=\"M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z\" />\n            </svg>\n        </li>\n        <li class=\"icon-close\" *ngIf=\"fullScreenClass\" (click)=\"closeFullScreenSearch();\">\n            <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\">\n                <path d=\"M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z\" />\n            </svg>\n        </li>\n    </ul>\n    <ul class=\"theme-container\" *ngIf=\"fullScreenClass\">\n        <li *ngFor=\"let theme of themes\" class=\"theme\" [ngClass]=\"theme.className\" (click)=\"changeColorByFilter(theme.className)\">\n        </li>\n    </ul>\n    <div class=\"container\">\n        <!-- <ul class=\"main-menu\">\n            <li class=\"label-menu-item\">\n                <button mat-menu-item (click)=\"showTodosByLabel('')\">\n                <span class=\"small\">Notes</span>\n            </button>\n                <button mat-menu-item *ngFor=\"let label of availableLabels\" (click)=\"showTodosByLabel(label)\">\n                <span class=\"small\">{{ label }}</span>\n            </button>\n            </li>\n        </ul> -->\n        <p class=\"text-center\" *ngIf=\"!todosFA?.controls.length\">\n            You don't have any notes.\n        </p>\n        <form [formGroup]=\"todosFormGroup\">\n            <!-- <mat-grid-list cols=\"4\" formArrayName=\"todos\">\n                <mat-grid-tile *ngFor=\"let todo of todosFA?.controls;let i = index\" [formGroupName]=\"i\">\n                    <mat-card class=\"todos-container\" [ngClass]=\"todo?.controls?.color?.value\">\n                        <div class=\"loading\" *ngIf=\"uploadId == todo?.controls?.id?.value && uploadProgress<=100 && uploadProgress>0\">\n                            <div class=\"loading__line line-grey\"></div>\n                            <div class=\"loading__line line-red\"></div>\n                        </div>\n                        <div class=\"image-container\" *ngIf=\"todo?.controls?.mediaUrl?.value\">\n                            <img [src]=\"todo?.controls?.mediaUrl?.value | mediaUrl\">\n                        </div>\n                        <div class=\"card-style card-{{i}}\" #card [ngStyle]=\"{'transform': cardListInfo[i]?.transformLeft}\">\n                            <mat-input-container floatPlaceholder=\"never\" class=\"form-group\">\n                                <textarea #textArea formControlName=\"name\" class=\"textArea name\" matInput matTextareaAutosize type=\"text\" value=\"{{ todo?.controls?.name?.value }}\" (change)=\"changeTodo(todo?.controls?.id?.value, todo)\" placeholder=\"Title\"></textarea>\n                            </mat-input-container>\n                            <ul class=\"todos\" formArrayName=\"unCompletedTasks\">\n                                <li *ngFor=\"let task of todo?.controls?.unCompletedTasks?.controls; let x = index;\" [formGroupName]=\"x\">\n                                    <mat-checkbox color=\"primary\" class=\"checkbox\" (change)=\"markTaskAsCompleted(todo, task, x, $event)\">\n                                    </mat-checkbox>\n                                    <mat-input-container>\n                                        <textarea #textArea formControlName=\"title\" class=\"textArea\" matInput matTextareaAutosize type=\"text\" value=\"{{ task?.controls?.title?.value }}\" (change)=\"changeTodo(todo?.controls?.id?.value, todo)\" (keydown)=\"removeTask($event, todo, x)\"></textarea>\n                                    </mat-input-container>\n                                    <span class=\"icon-delete\" (click)=\"removeUnCompletedTask(todo, x)\">\n                                    <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"14\" height=\"14\" viewBox=\"0 0 24 24\">\n                                        <path d=\"M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z\" />\n                                    </svg>\n                                </span>\n                                </li>\n                                <li (click)=\"addUnCompletedTasks(todo, i)\" class=\"add-todo\">\n                                    <span class=\"icon-add checkbox\"><svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\">\n                                    <path d=\"M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z\"/><path d=\"M0 0h24v24H0z\" fill=\"none\"/></svg>\n                                </span>\n                                    <span class=\"icon-add\">List item</span>\n                                </li>\n                            </ul>\n                            <div class=\"task-progress\" *ngIf=\"(todo.controls.completedTasks.controls.length/todo.controls.tasks.controls.length)*100\">\n                                <span class=\"task-progress-bar\" [style.width]=\"(todo.controls.completedTasks.controls.length/(todo.controls.tasks.controls.length || 1))*100 + '%'\"></span>\n                                <span class=\"task-progress-percent small\">{{ (todo.controls.completedTasks.controls.length/(todo.controls.tasks.controls.length || 1))*100 | number : '1.0-0' }} %</span>\n                            </div>\n                            <ul class=\"todos todos__completed\" *ngIf=\"todo.controls.completedTasks.controls.length>0\">\n                                <div class=\"title-container\" [ngClass]=\"{'collapsed': todo.controls.hideCheckedItems.value}\" (click)=\"hideCompletedTasks(todo)\">\n                                    <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\"><path d=\"M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z\"/></svg>\n                                    <div class=\"title\" *ngIf=\"todo.controls.completedTasks.controls.length == 1\">{{todo?.controls.completedTasks.controls.length}} Completed item</div>\n                                    <div class=\"title\" *ngIf=\"todo.controls.completedTasks.controls.length > 1\">{{todo?.controls.completedTasks.controls.length}} Completed items</div>\n                                </div>\n                                <div class=\"todos__list\" [ngClass]=\"{'hide': todo?.controls?.hideCheckedItems?.value}\">\n                                    <div formArrayName=\"completedTasks\" *ngFor=\"let task of todo?.controls?.completedTasks?.controls; let i = index;\">\n                                        <li [formGroupName]=\"i\" class=\"completed\">\n                                            <mat-checkbox color=\"primary\" class=\"checkbox\" checked=\"checked\" (change)=\"markTaskAsCompleted(todo, task, i, $event)\">\n                                            </mat-checkbox>\n                                            <mat-input-container>\n                                                <textarea formControlName=\"title\" class=\"textArea\" matInput matTextareaAutosize type=\"text\" value=\"{{ task?.controls?.title?.value }}\" (change)=\"changeTodo(task?.controls)\">\n                                            </textarea>\n                                            </mat-input-container>\n                                            <span class=\"icon-delete\" (click)=\"removeCompletedTask(todo, i)\">\n                                            <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"14\" height=\"14\" viewBox=\"0 0 24 24\">\n                                                <path d=\"M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z\" />\n                                            </svg>\n                                        </span>\n                                        </li>\n                                    </div>\n                                </div>\n                            </ul>\n                            <ul class=\"todos todos__actions\">\n                                <li class=\"theme-more\">\n                                    <button mat-icon-button [matMenuTriggerFor]=\"themeMore\">\n                                        <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\"><path d=\"M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9c.83 0 1.5-.67 1.5-1.5 0-.39-.15-.74-.39-1.01-.23-.26-.38-.61-.38-.99 0-.83.67-1.5 1.5-1.5H16c2.76 0 5-2.24 5-5 0-4.42-4.03-8-9-8zm-5.5 9c-.83 0-1.5-.67-1.5-1.5S5.67 9 6.5 9 8 9.67 8 10.5 7.33 12 6.5 12zm3-4C8.67 8 8 7.33 8 6.5S8.67 5 9.5 5s1.5.67 1.5 1.5S10.33 8 9.5 8zm5 0c-.83 0-1.5-.67-1.5-1.5S13.67 5 14.5 5s1.5.67 1.5 1.5S15.33 8 14.5 8zm3 4c-.83 0-1.5-.67-1.5-1.5S16.67 9 17.5 9s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z\"/></svg>\n                                    </button>\n                                    <mat-menu #themeMore=\"matMenu\" [overlapTrigger]=\"false\">\n                                        <ul class=\"theme-container\">\n                                            <li *ngFor=\"let theme of themes\" class=\"theme\" [ngClass]=\"theme.className\" (click)=\"changeTheme(todo, theme.className)\">\n                                                <svg *ngIf=\"todo?.controls?.color?.value == theme.className\" xmlns=\"http://www.w3.org/2000/svg\" width=\"18\" height=\"18\" viewBox=\"0 0 24 24\">\n                                                    <path d=\"M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z\"/>\n                                                </svg>\n                                            </li>\n                                        </ul>\n                                    </mat-menu>\n                                </li>\n                                <li class=\"browse-image\">\n                                    <button mat-icon-button (click)=\"imgFileInput.click();\">\n                                            <input hidden type=\"file\" #imgFileInput (change)=\"uploadMedia(todo?.controls?.id?.value, $event)\"/>\n                                            <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\"><path d=\"M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z\"/></svg>                                    \n                                    </button>\n                                </li>\n                                <li class=\"menu-more\">\n                                    <button mat-icon-button [matMenuTriggerFor]=\"menuMore\">\n                                    <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\"><path d=\"M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z\"/></svg>\n                                </button>\n                                    <mat-menu #menuMore=\"matMenu\" [overlapTrigger]=\"false\" [ngClass]=\"todo.controls.color.value\">\n                                        <button mat-menu-item (click)=\"markAllTasksAsCompleted(todo)\" class=\"icon-mark-all\" *ngIf=\"todo?.controls?.unCompletedTasks?.controls?.length>0\">\n                                                <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 48 48\">\n                                                <path d=\"M0 0h48v48H0z\" fill=\"none\"/>\n                                                <path d=\"M36 14l-2.83-2.83-12.68 12.69 2.83 2.83L36 14zm8.49-2.83L23.31 32.34 14.97 24l-2.83 2.83L23.31 38l24-24-2.82-2.83zM.83 26.83L12 38l2.83-2.83L3.66 24 .83 26.83z\"/>\n                                            </svg><span class=\"small\">Check Items</span>\n                                        </button>\n                                        <button mat-menu-item (click)=\"markAllTaslsAsInCompleted(todo)\" class=\"icon-mark-all\" *ngIf=\"todo?.controls?.completedTasks?.controls?.length > 0\">\n                                                <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\"><path d=\"M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z\"/></svg>\n                                                <span class=\"small\">Uncheck Items</span>\n                                            </button>\n                                        <button mat-menu-item (click)=\"deleteCompletedTasks(todo)\" class=\"icon-mark-all\" *ngIf=\"todo?.controls?.completedTasks?.controls?.length > 0\">\n                                                <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\">\n                                                    <path d=\"M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z\" />\n                                                </svg>\n                                                <span class=\"small\">Delete checked Items</span>\n                                            </button>\n                                        <button mat-menu-item (click)=\"deleteTodo(todo?.controls?.id?.value, i)\" class=\"icon-mark-all\">\n                                                <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\">\n                                                <path d=\"M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z\"/>\n                                                <path d=\"M0 0h24v24H0z\" fill=\"none\"/>\n                                            </svg>\n                                                <span class=\"small\">Delete</span>\n                                            </button>\n                                        <button mat-menu-item (click)=\"makeTodoCopy(todo, i)\" class=\"icon-mark-all\">\n                                                <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\"><path d=\"M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z\"/></svg>\n                                                <span class=\"small\">Make a copy</span>\n                                            </button>\n                                        <button mat-menu-item (click)=\"openLabelMenu(todo?.controls?.id?.value)\" class=\"icon-mark-all\">\n                                                <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\"><path d=\"M17.63 5.84C17.27 5.33 16.67 5 16 5L5 5.01C3.9 5.01 3 5.9 3 7v10c0 1.1.9 1.99 2 1.99L16 19c.67 0 1.27-.33 1.63-.84L22 12l-4.37-6.16z\"/></svg>\n                                                <span class=\"small\">Labels</span>\n                                        </button>\n                                    </mat-menu>\n                                </li>\n                            </ul>\n                            <div class=\"todos todos__actions labels\" *ngIf=\"todo?.controls?.label?.controls?.length\">\n                                <span *ngFor=\"let label of todo?.controls?.label?.controls\">{{ label.value }}</span>\n                            </div>\n                            <div class=\"todos todos__actions updated-time\">\n                                <div class=\"small grey\">{{ todo?.controls?.dateCreated?.value?.time | date:'EEEE, h:mm a' }}</div>\n                            </div>\n                            <div class=\"labels-container\" *ngIf=\"todo?.controls?.id?.value === labelId\">\n                                <div class=\"label-header\">\n                                    <button mat-icon-button (click)=\"changeTodo(todo?.controls?.id?.value, todo);openLabelMenu('')\">\n                                        <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\"><path d=\"M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z\"/></svg>\n                                </button>\n                                    <mat-input-container floatPlaceholder=\"never\">\n                                        <input matInput (keydown)=\"startFilter()\" type=\"text\" autocomplete=\"off\" [formControl]=\"filterLabelsFormControl\" placeholder=\"Enter label name\">\n                                    </mat-input-container>\n                                </div>\n                                <ng-container *ngFor=\"let label of filteredLabels; let i = index;\">\n                                    <div class=\"form-group\">\n                                        <mat-checkbox class=\"label\" checked=\"{{ -1 !== todo?.controls?.label?.value.indexOf(label) ? 'checked' : '' }}\" color=\"primary\" class=\"checkbox\" (change)=\"updateLabels(todo?.controls?.id?.value, todo, $event, label)\"></mat-checkbox>{{ label }}\n                                    </div>\n                                </ng-container>\n                                <button class=\"create-label-btn\" mat-menu-item *ngIf=\"!filteredLabels.length\" (click)=\"addToLabel(todo, labelToAdd);\">\n                                    <span class=\"icon-add checkbox\"><svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\">\n                                        <path d=\"M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z\"/><path d=\"M0 0h24v24H0z\" fill=\"none\"/></svg>\n                                    </span><span class=\"create-label-link\">create </span> \"{{ labelToAdd }}\"\n                                </button>\n                            </div>\n                        </div>\n                    </mat-card>\n                </mat-grid-tile>\n            </mat-grid-list> -->\n            <div formArrayName=\"todos\" class=\"todos-wrapper\" #cardWrapper>\n                <mat-card *ngFor=\"let todo of todosFA?.controls;let i = index\" [formGroupName]=\"i\" class=\"todos-container\" [ngClass]=\"todo?.controls?.color?.value\">\n                    <div class=\"loading\" *ngIf=\"uploadId == todo?.controls?.id?.value && uploadProgress<=100 && uploadProgress>0\">\n                        <div class=\"loading__line line-grey\"></div>\n                        <div class=\"loading__line line-red\"></div>\n                    </div>\n                    <div class=\"image-container\" *ngIf=\"todo?.controls?.mediaUrl?.value\">\n                        <img [src]=\"todo?.controls?.mediaUrl?.value | mediaUrl\">\n                    </div>\n                    <div class=\"card-style card-{{i}}\" #card [ngStyle]=\"{'transform': cardListInfo[i]?.transformLeft}\">\n                        <mat-input-container floatPlaceholder=\"never\" class=\"form-group\">\n                            <textarea #textArea formControlName=\"name\" class=\"textArea name\" matInput matTextareaAutosize type=\"text\" value=\"{{ todo?.controls?.name?.value }}\" (change)=\"changeTodo(todo?.controls?.id?.value, todo)\" placeholder=\"Title\"></textarea>\n                        </mat-input-container>\n                        <ul class=\"todos\" formArrayName=\"unCompletedTasks\">\n                            <li *ngFor=\"let task of todo?.controls?.unCompletedTasks?.controls; let x = index;\" [formGroupName]=\"x\">\n                                <mat-checkbox color=\"primary\" class=\"checkbox\" (change)=\"markTaskAsCompleted(todo, task, x, $event)\">\n                                </mat-checkbox>\n                                <mat-input-container>\n                                    <textarea #textArea formControlName=\"title\" class=\"textArea\" matInput matTextareaAutosize type=\"text\" value=\"{{ task?.controls?.title?.value }}\" (change)=\"changeTodo(todo?.controls?.id?.value, todo)\" (keydown)=\"removeTask($event, todo, x)\"></textarea>\n                                </mat-input-container>\n                                <span class=\"icon-delete\" (click)=\"removeUnCompletedTask(todo, x)\">\n                            <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"14\" height=\"14\" viewBox=\"0 0 24 24\">\n                                <path d=\"M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z\" />\n                            </svg>\n                        </span>\n                            </li>\n                            <li (click)=\"addUnCompletedTasks(todo, i)\" class=\"add-todo\">\n                                <span class=\"icon-add checkbox\"><svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\">\n                            <path d=\"M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z\"/><path d=\"M0 0h24v24H0z\" fill=\"none\"/></svg>\n                        </span>\n                                <span class=\"icon-add\">List item</span>\n                            </li>\n                        </ul>\n                        <div class=\"task-progress\" *ngIf=\"(todo.controls.completedTasks.controls.length/todo.controls.tasks.controls.length)*100\">\n                            <span class=\"task-progress-bar\" [style.width]=\"(todo.controls.completedTasks.controls.length/(todo.controls.tasks.controls.length || 1))*100 + '%'\"></span>\n                            <span class=\"task-progress-percent small\">{{ (todo.controls.completedTasks.controls.length/(todo.controls.tasks.controls.length || 1))*100 | number : '1.0-0' }} %</span>\n                        </div>\n                        <ul class=\"todos todos__completed\" *ngIf=\"todo.controls.completedTasks.controls.length>0\">\n                            <div class=\"title-container\" [ngClass]=\"{'collapsed': todo.controls.hideCheckedItems.value}\" (click)=\"hideCompletedTasks(todo)\">\n                                <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\"><path d=\"M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z\"/></svg>\n                                <div class=\"title\" *ngIf=\"todo.controls.completedTasks.controls.length == 1\">{{todo?.controls.completedTasks.controls.length}} Completed item</div>\n                                <div class=\"title\" *ngIf=\"todo.controls.completedTasks.controls.length > 1\">{{todo?.controls.completedTasks.controls.length}} Completed items</div>\n                            </div>\n                            <div class=\"todos__list\" [ngClass]=\"{'hide': todo?.controls?.hideCheckedItems?.value}\">\n                                <div formArrayName=\"completedTasks\" *ngFor=\"let task of todo?.controls?.completedTasks?.controls; let i = index;\">\n                                    <li [formGroupName]=\"i\" class=\"completed\">\n                                        <mat-checkbox color=\"primary\" class=\"checkbox\" checked=\"checked\" (change)=\"markTaskAsCompleted(todo, task, i, $event)\">\n                                        </mat-checkbox>\n                                        <mat-input-container>\n                                            <textarea formControlName=\"title\" class=\"textArea\" matInput matTextareaAutosize type=\"text\" value=\"{{ task?.controls?.title?.value }}\" (change)=\"changeTodo(task?.controls)\">\n                                    </textarea>\n                                        </mat-input-container>\n                                        <span class=\"icon-delete\" (click)=\"removeCompletedTask(todo, i)\">\n                                    <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"14\" height=\"14\" viewBox=\"0 0 24 24\">\n                                        <path d=\"M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z\" />\n                                    </svg>\n                                </span>\n                                    </li>\n                                </div>\n                            </div>\n                        </ul>\n                        <ul class=\"todos todos__actions\">\n                            <li class=\"theme-more\">\n                                <button mat-icon-button [matMenuTriggerFor]=\"themeMore\">\n                                <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\"><path d=\"M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9c.83 0 1.5-.67 1.5-1.5 0-.39-.15-.74-.39-1.01-.23-.26-.38-.61-.38-.99 0-.83.67-1.5 1.5-1.5H16c2.76 0 5-2.24 5-5 0-4.42-4.03-8-9-8zm-5.5 9c-.83 0-1.5-.67-1.5-1.5S5.67 9 6.5 9 8 9.67 8 10.5 7.33 12 6.5 12zm3-4C8.67 8 8 7.33 8 6.5S8.67 5 9.5 5s1.5.67 1.5 1.5S10.33 8 9.5 8zm5 0c-.83 0-1.5-.67-1.5-1.5S13.67 5 14.5 5s1.5.67 1.5 1.5S15.33 8 14.5 8zm3 4c-.83 0-1.5-.67-1.5-1.5S16.67 9 17.5 9s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z\"/></svg>\n                            </button>\n                                <mat-menu #themeMore=\"matMenu\" [overlapTrigger]=\"false\">\n                                    <ul class=\"theme-container\">\n                                        <li *ngFor=\"let theme of themes\" class=\"theme\" [ngClass]=\"theme.className\" (click)=\"changeTheme(todo, theme.className)\">\n                                            <svg *ngIf=\"todo?.controls?.color?.value == theme.className\" xmlns=\"http://www.w3.org/2000/svg\" width=\"18\" height=\"18\" viewBox=\"0 0 24 24\">\n                                            <path d=\"M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z\"/>\n                                        </svg>\n                                        </li>\n                                    </ul>\n                                </mat-menu>\n                            </li>\n                            <li class=\"browse-image\">\n                                <button mat-icon-button (click)=\"imgFileInput.click();\">\n                                    <input hidden type=\"file\" #imgFileInput (change)=\"uploadMedia(todo?.controls?.id?.value, $event)\"/>\n                                    <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\"><path d=\"M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z\"/></svg>                                    \n                            </button>\n                            </li>\n                            <li class=\"menu-more\">\n                                <button mat-icon-button [matMenuTriggerFor]=\"menuMore\">\n                            <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\"><path d=\"M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z\"/></svg>\n                        </button>\n                                <mat-menu #menuMore=\"matMenu\" [overlapTrigger]=\"false\" [ngClass]=\"todo.controls.color.value\">\n                                    <button mat-menu-item (click)=\"markAllTasksAsCompleted(todo)\" class=\"icon-mark-all\" *ngIf=\"todo?.controls?.unCompletedTasks?.controls?.length>0\">\n                                        <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 48 48\">\n                                        <path d=\"M0 0h48v48H0z\" fill=\"none\"/>\n                                        <path d=\"M36 14l-2.83-2.83-12.68 12.69 2.83 2.83L36 14zm8.49-2.83L23.31 32.34 14.97 24l-2.83 2.83L23.31 38l24-24-2.82-2.83zM.83 26.83L12 38l2.83-2.83L3.66 24 .83 26.83z\"/>\n                                    </svg><span class=\"small\">Check Items</span>\n                                </button>\n                                    <button mat-menu-item (click)=\"markAllTaslsAsInCompleted(todo)\" class=\"icon-mark-all\" *ngIf=\"todo?.controls?.completedTasks?.controls?.length > 0\">\n                                        <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\"><path d=\"M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z\"/></svg>\n                                        <span class=\"small\">Uncheck Items</span>\n                                    </button>\n                                    <button mat-menu-item (click)=\"deleteCompletedTasks(todo)\" class=\"icon-mark-all\" *ngIf=\"todo?.controls?.completedTasks?.controls?.length > 0\">\n                                        <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\">\n                                            <path d=\"M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z\" />\n                                        </svg>\n                                        <span class=\"small\">Delete checked Items</span>\n                                    </button>\n                                    <button mat-menu-item (click)=\"deleteTodo(todo?.controls?.id?.value, i)\" class=\"icon-mark-all\">\n                                        <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\">\n                                        <path d=\"M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z\"/>\n                                        <path d=\"M0 0h24v24H0z\" fill=\"none\"/>\n                                    </svg>\n                                        <span class=\"small\">Delete</span>\n                                    </button>\n                                    <button mat-menu-item (click)=\"makeTodoCopy(todo, i)\" class=\"icon-mark-all\">\n                                        <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\"><path d=\"M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z\"/></svg>\n                                        <span class=\"small\">Make a copy</span>\n                                    </button>\n                                    <button mat-menu-item (click)=\"openLabelMenu(todo?.controls?.id?.value)\" class=\"icon-mark-all\">\n                                        <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\"><path d=\"M17.63 5.84C17.27 5.33 16.67 5 16 5L5 5.01C3.9 5.01 3 5.9 3 7v10c0 1.1.9 1.99 2 1.99L16 19c.67 0 1.27-.33 1.63-.84L22 12l-4.37-6.16z\"/></svg>\n                                        <span class=\"small\">Labels</span>\n                                </button>\n                                </mat-menu>\n                            </li>\n                        </ul>\n                        <div class=\"todos todos__actions labels\" *ngIf=\"todo?.controls?.label?.controls?.length\">\n                            <span *ngFor=\"let label of todo?.controls?.label?.controls\">{{ label.value }}</span>\n                        </div>\n                        <div class=\"todos todos__actions updated-time\">\n                            <div class=\"small grey\">{{ todo?.controls?.dateCreated?.value?.time | date:'EEEE, h:mm a' }}</div>\n                        </div>\n                        <div class=\"labels-container\" *ngIf=\"todo?.controls?.id?.value === labelId\">\n                            <div class=\"label-header\">\n                                <button mat-icon-button (click)=\"changeTodo(todo?.controls?.id?.value, todo);openLabelMenu('')\">\n                                <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\"><path d=\"M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z\"/></svg>\n                        </button>\n                                <mat-input-container floatPlaceholder=\"never\">\n                                    <input matInput (keydown)=\"startFilter()\" type=\"text\" autocomplete=\"off\" [formControl]=\"filterLabelsFormControl\" placeholder=\"Enter label name\">\n                                </mat-input-container>\n                            </div>\n                            <ng-container *ngFor=\"let label of filteredLabels; let i = index;\">\n                                <div class=\"form-group\">\n                                    <mat-checkbox class=\"label\" checked=\"{{ -1 !== todo?.controls?.label?.value.indexOf(label) ? 'checked' : '' }}\" color=\"primary\" class=\"checkbox\" (change)=\"updateLabels(todo?.controls?.id?.value, todo, $event, label)\"></mat-checkbox>{{ label }}\n                                </div>\n                            </ng-container>\n                            <button class=\"create-label-btn\" mat-menu-item *ngIf=\"!filteredLabels.length\" (click)=\"addToLabel(todo, labelToAdd);\">\n                            <span class=\"icon-add checkbox\"><svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\">\n                                <path d=\"M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z\"/><path d=\"M0 0h24v24H0z\" fill=\"none\"/></svg>\n                            </span><span class=\"create-label-link\">create </span> \"{{ labelToAdd }}\"\n                        </button>\n                        </div>\n                    </div>\n                </mat-card>\n            </div>\n        </form>\n    </div>\n</div>\n<div class=\"container-loader\" *ngIf=\"showLoder\">\n    <svg class=\"spinner\" width=\"45px\" height=\"45px\" viewBox=\"0 0 66 66\" xmlns=\"http://www.w3.org/2000/svg\">\n        <circle class=\"path\" fill=\"none\" stroke-width=\"6\" stroke-linecap=\"round\" cx=\"33\" cy=\"33\" r=\"30\"></circle>\n    </svg>\n</div>"

/***/ }),

/***/ "../../../../../src/app/todo/todo.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".container {\n  margin: 0 20px 100px;\n  position: relative;\n  -webkit-box-pack: center;\n  -ms-flex-pack: center;\n  -moz-justify-content: center;\n  justify-content: center; }\n\n.container,\n.todos-wrapper {\n  display: -webkit-box;\n  display: -moz-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-wrap: wrap;\n  flex-wrap: wrap; }\n\n.todos-wrapper {\n  -webkit-box-align: start;\n  -ms-flex-align: start;\n  -moz-align-items: flex-start;\n  align-items: flex-start;\n  position: relative;\n  box-sizing: border-box;\n  -webkit-box-pack: center;\n  -ms-flex-pack: center;\n  -moz-justify-content: center;\n  justify-content: center; }\n\n.todos-container {\n  min-width: 280px;\n  width: 100%;\n  display: inline-block;\n  vertical-align: top;\n  margin: 16px 0;\n  background: #fff;\n  box-sizing: border-box; }\n\n.card-style {\n  padding: 24px; }\n\nul,\nli {\n  list-style: none;\n  display: block;\n  margin-bottom: 10px;\n  display: -webkit-box;\n  display: -moz-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-direction: normal;\n  -webkit-box-orient: vertical;\n  -moz-flex-direction: column;\n  -ms-flex-direction: column;\n  flex-direction: column; }\n\nli {\n  color: #777;\n  -webkit-box-direction: normal;\n  -webkit-box-orient: horizontal;\n  -moz-flex-direction: row;\n  -ms-flex-direction: row;\n  flex-direction: row;\n  -webkit-box-align: start;\n  -ms-flex-align: start;\n  -moz-align-items: flex-start;\n  align-items: flex-start; }\n\n.checkbox {\n  margin-right: 24px; }\n\n.completed textarea {\n  text-decoration: line-through; }\n\n.todos__completed {\n  padding-top: 20px; }\n\n.todos__actions,\n.todos__completed {\n  border-top: 1px solid rgba(0, 0, 0, 0.15); }\n\n.todos__actions.labels,\n.todos__actions.updated-time {\n  border: 0; }\n\n.todos__actions {\n  padding-top: 12px;\n  display: -webkit-box;\n  display: -moz-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-direction: normal;\n  -webkit-box-orient: horizontal;\n  -moz-flex-direction: row;\n  -ms-flex-direction: row;\n  flex-direction: row;\n  -ms-flex-wrap: wrap;\n  flex-wrap: wrap;\n  -webkit-box-align: center;\n  -ms-flex-align: center;\n  -moz-align-items: center;\n  align-items: center;\n  margin-bottom: 0; }\n\n.todos__actions li svg,\n.menu-more svg,\nbutton svg,\n.icon-close svg {\n  fill: rgba(0, 0, 0, 0.54); }\n\n.icon-delete {\n  -ms-flex-line-pack: right;\n      align-content: right;\n  height: 18px;\n  width: 18px;\n  border-radius: 11px;\n  background: rgba(0, 0, 0, 0.54);\n  -webkit-box-align: center;\n  -ms-flex-align: center;\n  -moz-align-items: center;\n  align-items: center;\n  -webkit-box-pack: center;\n  -ms-flex-pack: center;\n  -moz-justify-content: center;\n  justify-content: center;\n  display: none; }\n\n.icon-mark-all,\n.icon-delete {\n  cursor: pointer; }\n\n.icon-delete svg {\n  fill: #fff;\n  height: 14px;\n  width: inherit; }\n\nli:hover .icon-delete {\n  display: -webkit-box;\n  display: -moz-flex;\n  display: -ms-flexbox;\n  display: flex; }\n\n.title {\n  font-size: 12px;\n  color: rgba(0, 0, 0, 0.4); }\n\n.title-container {\n  display: -webkit-box;\n  display: -moz-flex;\n  display: -ms-flexbox;\n  display: flex;\n  position: relative;\n  -webkit-box-align: center;\n  -ms-flex-align: center;\n  -moz-align-items: center;\n  align-items: center;\n  cursor: pointer; }\n\n.title-container svg {\n  -webkit-transform: rotate(90deg);\n          transform: rotate(90deg);\n  margin-right: 20px; }\n\n.todos__list {\n  padding-top: 24px; }\n\n.todos__list.hide {\n  display: none; }\n\n.add-todo {\n  cursor: pointer;\n  color: rgba(0, 0, 0, 0.4); }\n\n.icon-add svg {\n  fill: rgba(0, 0, 0, 0.54); }\n\n.collapsed svg {\n  -webkit-transform: rotate(-90deg);\n          transform: rotate(-90deg); }\n\n.theme-container {\n  display: -webkit-box;\n  display: -moz-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-direction: normal;\n  -webkit-box-orient: horizontal;\n  -moz-flex-direction: row;\n  -ms-flex-direction: row;\n  flex-direction: row;\n  -webkit-box-pack: center;\n  -ms-flex-pack: center;\n  -moz-justify-content: center;\n  justify-content: center;\n  margin-bottom: 0;\n  padding: 8px 12px 8px;\n  background: #fff; }\n\n.theme-container li {\n  -webkit-box-align: center;\n  -ms-flex-align: center;\n  -moz-align-items: center;\n  align-items: center;\n  margin-bottom: 0; }\n\n.theme {\n  height: 24px;\n  width: 24px;\n  border-radius: 24px;\n  margin-right: 4px;\n  cursor: pointer;\n  border: 1px solid rgba(0, 0, 0, 0.15);\n  background: transparent;\n  display: -webkit-box;\n  display: -moz-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n  -ms-flex-pack: center;\n  -moz-justify-content: center;\n  justify-content: center;\n  -webkit-box-align: center;\n  -ms-flex-align: center;\n  -moz-align-items: center;\n  align-items: center; }\n\n.todos__actions li {\n  margin-right: 8px; }\n\n.theme--green {\n  background: #a8ffa8; }\n\n.theme--blue {\n  background: #d9eeff; }\n\n.theme--red-light {\n  background: #ff8a80; }\n\n.theme--yellow-light {\n  background: #ffff8d; }\n\n.theme--cyan {\n  background: #a7ffeb; }\n\n.theme--white {\n  background: white; }\n\n.small {\n  display: inline-block;\n  font-size: 12px;\n  white-space: nowrap; }\n\nbutton .small {\n  margin-left: 12px; }\n\n.updated-time .small {\n  font-style: italic; }\n\n.icon-mark-all {\n  display: -webkit-box;\n  display: -moz-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n  -ms-flex-align: center;\n  -moz-align-items: center;\n  align-items: center; }\n\n.menu-more {\n  margin-left: auto; }\n\n.menu-more,\n.theme-more,\n.browse-image {\n  margin-bottom: 0;\n  margin-right: 0 !important; }\n\n.todos__actions .menu-more {\n  margin-right: 0; }\n\n.action-container {\n  padding: 8px 12px 8px;\n  margin-bottom: 0; }\n\n.main-menu {\n  position: fixed;\n  bottom: 0;\n  left: 0;\n  width: 100%;\n  z-index: 1;\n  display: -webkit-box;\n  display: -moz-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n  -ms-flex-pack: center;\n  -moz-justify-content: center;\n  justify-content: center;\n  -webkit-box-direction: normal;\n  -webkit-box-orient: horizontal;\n  -moz-flex-direction: row;\n  -ms-flex-direction: row;\n  flex-direction: row;\n  -webkit-box-align: center;\n  -ms-flex-align: center;\n  -moz-align-items: center;\n  align-items: center;\n  margin-bottom: 0; }\n\n.main-menu li {\n  display: -webkit-inline-box;\n  display: -moz-inline-flex;\n  display: -ms-inline-flexbox;\n  display: inline-flex;\n  margin: 10px;\n  margin-bottom: 0; }\n\n.main-menu span {\n  display: inline-block; }\n\n.link {\n  cursor: pointer; }\n\n.form-group {\n  margin-bottom: 20px; }\n\n.form-group .name {\n  font-size: 14px;\n  font-weight: 700;\n  color: #222; }\n\n.mat-input-element {\n  color: rgba(0, 0, 0, 0.54); }\n\n.container-loader {\n  position: fixed;\n  left: 50%;\n  right: 0;\n  top: 50%;\n  display: -webkit-box;\n  display: -moz-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n  -ms-flex-pack: center;\n  -moz-justify-content: center;\n  justify-content: center;\n  -webkit-transform: translate(-50%, -50%);\n  transform: translate(-50%, -50%); }\n\n.labels span {\n  display: inline-block;\n  margin-right: 8px;\n  margin-bottom: 4px;\n  color: rgba(0, 0, 0, 0.65);\n  font-size: 12px;\n  background: rgba(0, 0, 0, 0.1);\n  padding: 2px 4px;\n  border-radius: 4px; }\n\n.create-label-btn {\n  display: -webkit-box;\n  display: -moz-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n  -ms-flex-align: center;\n  -moz-align-items: center;\n  align-items: center; }\n\n.create-label-link {\n  color: rgba(0, 0, 0, 0.54); }\n\n.create-label-btn .icon-add {\n  line-height: 0; }\n\n.image-container img {\n  width: 100%; }\n\n.header-search {\n  max-width: 500px;\n  background: #fff;\n  margin: 0 20px;\n  padding: 12px 24px;\n  margin-bottom: 32px;\n  box-shadow: 0px 10px 50px 0 rgba(0, 0, 0, 0.1);\n  display: -webkit-box;\n  display: -moz-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-direction: normal;\n  -webkit-box-orient: horizontal;\n  -moz-flex-direction: row;\n  -ms-flex-direction: row;\n  flex-direction: row; }\n\n.header-search:before {\n  content: '';\n  position: fixed;\n  z-index: -10;\n  height: 100%;\n  width: 100%;\n  left: 0;\n  top: 0;\n  display: block;\n  -webkit-transform: scale(0);\n  transform: scale(0);\n  -webkit-transform-origin: center top;\n          transform-origin: center top;\n  background: #f2f5f7;\n  transition: -webkit-transform 1s;\n  transition: transform 1s;\n  transition: transform 1s, -webkit-transform 1s; }\n\n.header-search li {\n  margin-bottom: 0; }\n\n.header-search li span {\n  height: 24px; }\n\n.header-search li > * {\n  vertical-align: middle; }\n\n.header-search li span svg {\n  fill: rgba(0, 0, 0, 0.54); }\n\n.search-container {\n  margin-left: 24px; }\n\n.new-list {\n  margin-left: auto; }\n\n.task-progress {\n  height: 2px;\n  position: relative; }\n\n.task-progress .task-progress-percent {\n  position: absolute;\n  right: 0;\n  bottom: 0;\n  color: rgba(0, 0, 0, 0.54);\n  padding-bottom: 4px; }\n\n.full-screen .header-search {\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  max-width: 700px;\n  transition: 0.5s;\n  z-index: 10; }\n\n.full-screen .header-search:before {\n  -webkit-transform: scale(1);\n  transform: scale(1); }\n\n.full-screen .container {\n  z-index: 10; }\n\n.full-screen .main-menu {\n  display: none; }\n\n.full-screen .theme-container {\n  z-index: 11;\n  position: relative;\n  background: transparent; }\n\n.task-progress-bar {\n  width: 0%;\n  background: rgba(0, 0, 0, 0.54);\n  height: 100%;\n  display: inline-block;\n  position: absolute; }\n\n.icon-close {\n  cursor: pointer;\n  margin-left: auto; }\n\n.spinner {\n  -webkit-animation: rotator 1.4s linear infinite;\n          animation: rotator 1.4s linear infinite; }\n\n@-webkit-keyframes rotator {\n  0% {\n    -webkit-transform: rotate(0deg);\n            transform: rotate(0deg); }\n  100% {\n    -webkit-transform: rotate(270deg);\n            transform: rotate(270deg); } }\n\n@keyframes rotator {\n  0% {\n    -webkit-transform: rotate(0deg);\n            transform: rotate(0deg); }\n  100% {\n    -webkit-transform: rotate(270deg);\n            transform: rotate(270deg); } }\n\n.path {\n  stroke-dasharray: 187;\n  stroke-dashoffset: 0;\n  -webkit-transform-origin: center;\n          transform-origin: center;\n  -webkit-animation: dash 1.4s ease-in-out infinite, colors 5.6s ease-in-out infinite;\n          animation: dash 1.4s ease-in-out infinite, colors 5.6s ease-in-out infinite; }\n\n.label-header {\n  display: -webkit-box;\n  display: -moz-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-direction: normal;\n  -webkit-box-orient: horizontal;\n  -moz-flex-direction: row;\n  -ms-flex-direction: row;\n  flex-direction: row;\n  -webkit-box-align: center;\n  -ms-flex-align: center;\n  -moz-align-items: center;\n  align-items: center;\n  margin-bottom: 24px; }\n\n@-webkit-keyframes colors {\n  0% {\n    stroke: #4285F4; }\n  25% {\n    stroke: #4285F4; }\n  50% {\n    stroke: #4285F4; }\n  75% {\n    stroke: #4285F4; }\n  100% {\n    stroke: #4285F4; } }\n\n@keyframes colors {\n  0% {\n    stroke: #4285F4; }\n  25% {\n    stroke: #4285F4; }\n  50% {\n    stroke: #4285F4; }\n  75% {\n    stroke: #4285F4; }\n  100% {\n    stroke: #4285F4; } }\n\n@-webkit-keyframes dash {\n  0% {\n    stroke-dashoffset: 187; }\n  50% {\n    stroke-dashoffset: 46.75;\n    -webkit-transform: rotate(135deg);\n            transform: rotate(135deg); }\n  100% {\n    stroke-dashoffset: 187;\n    -webkit-transform: rotate(450deg);\n            transform: rotate(450deg); } }\n\n@keyframes dash {\n  0% {\n    stroke-dashoffset: 187; }\n  50% {\n    stroke-dashoffset: 46.75;\n    -webkit-transform: rotate(135deg);\n            transform: rotate(135deg); }\n  100% {\n    stroke-dashoffset: 187;\n    -webkit-transform: rotate(450deg);\n            transform: rotate(450deg); } }\n\n@media screen and (min-width: 756px) {\n  .header-search {\n    margin: 0 auto 30px; }\n  .full-screen .header-search {\n    width: 100%; }\n  .todos-container {\n    max-width: 280px;\n    margin: 16px; } }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/todo/todo.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_animations__ = __webpack_require__("../../../animations/@angular/animations.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_angularfire2_database__ = __webpack_require__("../../../../angularfire2/database/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_finally__ = __webpack_require__("../../../../rxjs/add/operator/finally.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_finally___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_finally__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_startWith__ = __webpack_require__("../../../../rxjs/add/operator/startWith.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_startWith___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_startWith__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_firebase__ = __webpack_require__("../../../../firebase/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__todo_service__ = __webpack_require__("../../../../../src/app/todo/todo.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__todo_model__ = __webpack_require__("../../../../../src/app/todo/todo.model.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__shared_config__ = __webpack_require__("../../../../../src/app/shared/config/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__shared_model__ = __webpack_require__("../../../../../src/app/shared/model/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__shared_services_auth_service__ = __webpack_require__("../../../../../src/app/shared/services/auth.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__shared_services_event_emitter_service__ = __webpack_require__("../../../../../src/app/shared/services/event-emitter.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__shared_services_snackbar_service__ = __webpack_require__("../../../../../src/app/shared/services/snackbar.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__shared_component_global_notification_global_notification_service__ = __webpack_require__("../../../../../src/app/shared/component/global-notification/global-notification.service.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TodoComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
















var TodoComponent = (function () {
    function TodoComponent(route, router, db, todoService, authService, snackBarService, globalNotificationService, fb, eventEmitterService) {
        var _this = this;
        this.route = route;
        this.router = router;
        this.db = db;
        this.todoService = todoService;
        this.authService = authService;
        this.snackBarService = snackBarService;
        this.globalNotificationService = globalNotificationService;
        this.fb = fb;
        this.eventEmitterService = eventEmitterService;
        this.todoArray = [];
        this.todoArrayForFilter = [];
        this.hideTasks = '';
        this.nameChangeLog = [];
        this.themes = __WEBPACK_IMPORTED_MODULE_10__shared_config__["a" /* Config */].themes;
        this.cardListInfo = [];
        this.filteredLabels = __WEBPACK_IMPORTED_MODULE_10__shared_config__["a" /* Config */].defaultLabels;
        this.defaultLabels = __WEBPACK_IMPORTED_MODULE_10__shared_config__["a" /* Config */].defaultLabels;
        this.availableLabels = [];
        this.showLoder = true;
        this.labelId = '';
        this.labelToAdd = '';
        this.routeId = '';
        this.fullScreenClass = false;
        this.FORM_CONTROL_NAME = __WEBPACK_IMPORTED_MODULE_10__shared_config__["a" /* Config */].FORM_CONTROL_NAME;
        // uploadProgress: any = { percent: 0,  key: '' };
        this.uploadProgress = 0;
        this.uploadId = '';
        this.globalNotificationService.messageInfoChanges.subscribe(function (messageInfo) {
            _this.messageInfo = messageInfo;
        });
    }
    TodoComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.createForm();
        this.filterLabelsFormControl = new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["j" /* FormControl */]();
        this.filterTodosFormControl = new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["j" /* FormControl */]();
        this.todosSubscription = this.router.params.subscribe(function (params) {
            _this.routeId = params['id'];
            if (_this.routeId) {
                _this.showTodosByLabel(_this.routeId);
            }
        });
        this.getTodos();
        // this.logChange();
    };
    TodoComponent.prototype.createForm = function () {
        this.todosFormGroup = this.fb.group({
            todos: this.fb.array([]),
        });
    };
    TodoComponent.prototype.getTodos = function () {
        var _this = this;
        this.todoService.getTodos().subscribe(function (todos) {
            _this.showLoder = false;
            _this.todoArray = todos.reverse();
            _this.todoArrayForFilter = todos.reverse();
            _this.showTodosByLabel(_this.routeId);
        }, function (error) {
            _this.messageInfo = new __WEBPACK_IMPORTED_MODULE_11__shared_model__["a" /* MessageInfo */]();
            var message = '';
            switch (error.code) {
                case 'auth/network-request-failed':
                    message = 'A network error has occurred.';
                    break;
            }
            _this.messageInfo.setMessageBody(message);
            _this.messageInfo.setIsError(true);
            _this.setNotificationMessage(_this.messageInfo);
        });
        // TODO: remove me please just for debugging purpose
        // this.todoService.getLocalData().subscribe((todos: Todo[]) => {
        //   this.showLoder = false;
        //   this.todoArray = todos.reverse();
        //   this.todoArrayForFilter = todos.reverse();
        //   this.showTodosByLabel(this.routeId);
        // });
    };
    TodoComponent.prototype.getLabels = function (todos) {
        var labels = this.filteredLabels;
        todos.forEach(function (todo) {
            if (!todo.label) {
                return [];
            }
            todo.label.forEach(function (label) {
                if (-1 === labels.indexOf(label)) {
                    labels.push(label);
                }
            });
        });
        this.availableLabels = labels;
        return labels;
    };
    TodoComponent.prototype.getTask = function (key) {
        this.db.object("tasks/" + key).snapshotChanges().subscribe(function (task) {
            console.log(task.payload.val());
            return task.payload.val();
        });
    };
    TodoComponent.prototype.setTodos = function (todos) {
        var _this = this;
        var todoFGs = todos.map(function (todo) { return _this.fb.group({
            id: todo.key,
            color: todo.color,
            name: todo.name,
            uid: todo.uid,
            mediaUrl: todo.mediaUrl || '',
            label: _this.setTodoLabels(todo.label),
            hideCheckedItems: todo.hideCheckedItems,
            tasks: _this.setTodoTasks(todo.tasks),
            unCompletedTasks: _this.setUncompletedTasks(todo.tasks),
            completedTasks: _this.setCompletedTasks(todo.tasks),
            dateUpdated: todo.dateUpdated,
            dateCreated: todo.dateCreated
        }); });
        var todoArray = this.fb.array(todoFGs);
        this.todosCtrl = todoArray;
        // console.log(this.getTask(todos[0].id));
        // setTimeout(() => {
        //   if (this.getTask(todos[0].id)) {
        //     console.log(this.getTask(todos[0].id));
        //   }
        // }, 500);
        // this.cardLayout();
    };
    TodoComponent.prototype.addEmptyTodo = function (todo) {
        var todoFG = this.fb.group({
            id: todo.id,
            color: this.themes[0].className,
            name: todo.name,
            uid: this.authService.getCurrentUser().uid,
            mediaUrl: todo.mediaUrl || '',
            label: this.setTodoLabels(this.routeId === 'home' ? [] : [this.routeId]),
            hideCheckedItems: todo.hideCheckedItems,
            tasks: this.setTodoTasks([]),
            unCompletedTasks: this.setUncompletedTasks([]),
            completedTasks: this.setCompletedTasks([])
        });
        this.todosFA.insert(0, todoFG);
        var todoCopyFG = todoFG.getRawValue();
        delete todoCopyFG.unCompletedTasks;
        delete todoCopyFG.completedTasks;
        todoCopyFG.dateUpdated = {};
        todoCopyFG.dateCreated = {};
        todoCopyFG.dateUpdated.time = __WEBPACK_IMPORTED_MODULE_7_firebase__["database"].ServerValue.TIMESTAMP;
        todoCopyFG.dateCreated.time = __WEBPACK_IMPORTED_MODULE_7_firebase__["database"].ServerValue.TIMESTAMP;
        this.todoService.createTodo(todoCopyFG);
    };
    TodoComponent.prototype.makeTodoCopy = function (todo, index) {
        var copyTodo = todo.getRawValue();
        var todoFG = this.fb.group({
            id: null,
            color: copyTodo.color,
            name: copyTodo.name,
            uid: copyTodo.uid,
            mediaUrl: copyTodo.mediaUrl,
            label: this.setTodoLabels(copyTodo.label),
            tasks: this.setTodoTasks(copyTodo.tasks),
            hideCheckedItems: copyTodo.hideCheckedItems,
            unCompletedTasks: this.setUncompletedTasks(copyTodo.unCompletedTasks),
            completedTasks: this.setCompletedTasks(copyTodo.completedTasks),
            dateCreated: copyTodo.dateCreated,
            dateUpdated: {
                time: __WEBPACK_IMPORTED_MODULE_7_firebase__["database"].ServerValue.TIMESTAMP
            }
        });
        // TODO: update db
        this.todosFA.insert(index, todoFG);
        delete copyTodo.unCompletedTasks;
        delete copyTodo.completedTasks;
        this.todoService.createTodo(copyTodo);
    };
    TodoComponent.prototype.updateLabels = function (key, todo, event, label) {
        if (event.checked) {
            todo.controls.label.value.push(label);
            todo.controls.label.controls.push(this.fb.control(label));
        }
        else {
            todo.controls.label.controls.forEach(function (labelRef, index) {
                if (labelRef.value === label) {
                    todo.controls.label.controls.splice(index, 1);
                }
            });
            todo.controls.label.value.forEach(function (labelRef, index) {
                if (labelRef === label) {
                    todo.controls.label.value.splice(index, 1);
                }
            });
        }
    };
    TodoComponent.prototype.addToLabel = function (todo, label) {
        todo.controls.label.controls.push(this.fb.control(label));
        todo.controls.label.value.push(label);
        this.availableLabels.push(label);
        this.filteredLabels = this.availableLabels;
    };
    TodoComponent.prototype.searchTodos = function (keyword) {
        var _this = this;
        // console.log(keyword);
        this.filterTodosFormControl.valueChanges
            .startWith(null)
            .subscribe(function (label) { _this.setTodos(_this.filterTodos(label)); });
    };
    TodoComponent.prototype.changeColorByFilter = function (colorName) {
        this.setTodos(this.filterByColor(colorName));
    };
    TodoComponent.prototype.filterByColor = function (colorName) {
        if (colorName) {
            return this.todoArrayForFilter.filter(function (filter) { return new RegExp("^" + colorName, 'gi').test(filter.color); });
        }
        else {
            return this.todoArrayForFilter;
        }
    };
    // TODO: filter by label with ui init
    TodoComponent.prototype.filterByLabel = function () { };
    TodoComponent.prototype.filterTodos = function (keyword) {
        if (keyword) {
            return this.todoArrayForFilter.filter(function (filter) {
                var name = new RegExp("^" + keyword, 'gi').test(filter.name);
                // const label = filter.label.filter(label => new RegExp(`${keyword}`, 'gi').test(label));
                if (name) {
                    return name;
                }
                // if (label) {
                //   return label;
                // }
            });
        }
        else {
            return this.todoArrayForFilter;
        }
    };
    TodoComponent.prototype.startFilter = function () {
        var _this = this;
        this.filterLabelsFormControl.valueChanges
            .startWith(null)
            .subscribe(function (label) { _this.filteredLabels = _this.filterLabels(label); });
    };
    TodoComponent.prototype.filterLabels = function (label) {
        this.labelToAdd = label;
        return label ? this.defaultLabels.filter(function (filter) { return new RegExp("^" + label, 'gi').test(filter); }) : this.defaultLabels;
    };
    TodoComponent.prototype.addNewTodo = function () {
        this.addEmptyTodo(new __WEBPACK_IMPORTED_MODULE_9__todo_model__["b" /* Todo */]());
        // this.cardLayout();
    };
    TodoComponent.prototype.setTodoTasks = function (tasks) {
        var _this = this;
        if (!tasks) {
            return this.fb.array([]);
        }
        var taskFGs = tasks.map(function (task) { return _this.fb.group(task); });
        var taskArray = this.fb.array(taskFGs);
        return taskArray;
    };
    TodoComponent.prototype.setTodoLabels = function (labels) {
        var _this = this;
        if (!labels) {
            return this.fb.array([]);
        }
        var taskFGs = labels.map(function (label) { return _this.fb.control(label); });
        var taskArray = this.fb.array(taskFGs);
        return taskArray;
    };
    TodoComponent.prototype.setUncompletedTasks = function (tasks) {
        var _this = this;
        if (!tasks) {
            return this.fb.array([]);
        }
        var unCompletedTasks = [];
        tasks.forEach(function (task) {
            if (!task.completed) {
                unCompletedTasks.push(task);
            }
        });
        var taskFGs = unCompletedTasks.map(function (task) { return _this.fb.group(task); });
        var taskArray = this.fb.array(taskFGs);
        return taskArray;
    };
    TodoComponent.prototype.setCompletedTasks = function (tasks) {
        var _this = this;
        if (!tasks) {
            return this.fb.array([]);
        }
        var completedTasks = [];
        tasks.forEach(function (task) {
            if (task.completed) {
                completedTasks.push(task);
            }
        });
        var taskFGs = completedTasks.map(function (task) { return _this.fb.group(task); });
        var taskArray = this.fb.array(taskFGs);
        return taskArray;
    };
    Object.defineProperty(TodoComponent.prototype, "todosFA", {
        get: function () {
            return this.todosFormGroup.get(this.FORM_CONTROL_NAME);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TodoComponent.prototype, "todosCtrl", {
        set: function (todoArray) {
            this.todosFormGroup.setControl(this.FORM_CONTROL_NAME, todoArray);
        },
        enumerable: true,
        configurable: true
    });
    TodoComponent.prototype.addUnCompletedTasks = function (todo, index) {
        var textAreas = this.textArea.toArray();
        todo.controls.unCompletedTasks.controls.push(this.fb.group(new __WEBPACK_IMPORTED_MODULE_9__todo_model__["c" /* Task */]()));
        this.setFocus(textAreas);
    };
    TodoComponent.prototype.addToCompletedTasks = function (todo, task) {
        todo.controls.completedTasks.controls.push(task);
    };
    TodoComponent.prototype.addToUnCompletedTasks = function (todo, task) {
        todo.controls.unCompletedTasks.controls.push(task);
    };
    TodoComponent.prototype.removeUnCompletedTask = function (todo, index) {
        this.removeFromUnCompletedTask(todo, index);
    };
    TodoComponent.prototype.removeCompletedTask = function (todo, index) {
        this.removeFromCompletedTasks(todo, index);
    };
    TodoComponent.prototype.removeTask = function (event, todo, index) {
        if (event.keyCode === 8) {
            if (!event.srcElement.value) {
                this.removeUnCompletedTask(todo, index);
            }
        }
    };
    TodoComponent.prototype.changeTodo = function (key, todo) {
        var copyTodo = todo.getRawValue();
        var todoConcat = copyTodo.unCompletedTasks.concat(copyTodo.completedTasks);
        delete copyTodo.unCompletedTasks;
        delete copyTodo.completedTasks;
        delete copyTodo.key;
        copyTodo.tasks = todoConcat;
        copyTodo.dateUpdated = {};
        copyTodo.dateUpdated.time = __WEBPACK_IMPORTED_MODULE_7_firebase__["database"].ServerValue.TIMESTAMP;
        this.todoService.updateTodo(key, copyTodo);
    };
    TodoComponent.prototype.markTaskAsCompleted = function (todo, task, index, event) {
        if (event.checked) {
            todo.controls.completedTasks.push(task);
            task.controls.completed.setValue(true);
            this.removeFromUnCompletedTask(todo, index);
        }
        else {
            todo.controls.unCompletedTasks.push(task);
            task.controls.completed.setValue(false);
            this.removeFromCompletedTasks(todo, index);
        }
    };
    TodoComponent.prototype.removeFromUnCompletedTask = function (todo, index) {
        todo.controls.unCompletedTasks.controls.splice(index, 1);
        if (todo) {
            this.changeTodo(todo.controls.id.value, todo);
        }
    };
    TodoComponent.prototype.removeFromCompletedTasks = function (todo, index) {
        todo.controls.completedTasks.controls.splice(index, 1);
        if (todo) {
            this.changeTodo(todo.controls.id.value, todo);
        }
    };
    TodoComponent.prototype.deleteUnCompletedTasksFromTodo = function (todo) {
        if (todo.unCompletedTasks) {
            return delete todo.unCompletedTasks;
        }
        else {
            return todo;
        }
    };
    TodoComponent.prototype.deleteCompletedTasksFromTodo = function (todo) {
        if (todo.completedTasks) {
            return delete todo.completedTasks;
        }
        else {
            return todo;
        }
    };
    TodoComponent.prototype.changeTheme = function (todo, color) {
        todo.controls.color.setValue(color);
        this.changeTodo(todo.controls.id.value, todo);
    };
    TodoComponent.prototype.setFocus = function (textAreas) {
        var textAreasCopy = [];
        this.textArea.changes.subscribe(function (data) {
            textAreasCopy = data.toArray();
        });
        var ids = [];
        textAreas.forEach(function (item) {
            ids.push(item.nativeElement.id);
        });
        setTimeout(function () {
            textAreasCopy.forEach(function (item, index) {
                if (ids.indexOf(item.nativeElement.id) === -1) {
                    textAreasCopy[index].nativeElement.focus();
                }
            });
        }, 200);
    };
    TodoComponent.prototype.markAllTasksAsCompleted = function (todo) {
        var _this = this;
        todo.controls.unCompletedTasks.controls.map(function (task) {
            task.controls.completed.setValue(true);
        });
        todo.controls.unCompletedTasks.controls.map(function (task) {
            _this.addToCompletedTasks(todo, task);
        });
        var index = todo.controls.unCompletedTasks.controls.length - 1;
        while (index >= 0) {
            this.removeFromUnCompletedTask(todo, index);
            index = todo.controls.unCompletedTasks.controls.length - 1;
        }
        if (todo) {
            this.changeTodo(todo.controls.id.value, todo);
        }
    };
    TodoComponent.prototype.markAllTaslsAsInCompleted = function (todo) {
        var _this = this;
        todo.controls.completedTasks.controls.map(function (task) {
            task.controls.completed.setValue(false);
        });
        todo.controls.completedTasks.controls.map(function (task) {
            _this.addToUnCompletedTasks(todo, task);
        });
        var index = todo.controls.completedTasks.controls.length - 1;
        while (index >= 0) {
            this.removeFromCompletedTasks(todo, index);
            index = todo.controls.completedTasks.controls.length - 1;
        }
        if (todo) {
            this.changeTodo(todo.controls.id.value, todo);
        }
    };
    TodoComponent.prototype.deleteCompletedTasks = function (todo) {
        var index = todo.controls.completedTasks.controls.length - 1;
        while (index >= 0) {
            this.removeFromCompletedTasks(todo, index);
            index = todo.controls.completedTasks.controls.length - 1;
        }
        if (todo) {
            this.changeTodo(todo.controls.id.value, todo);
        }
    };
    TodoComponent.prototype.deleteTodo = function (key, index) {
        this.todosFA.removeAt(index);
        this.todoService.removeTodo(key);
        // this.cardLayout();
    };
    TodoComponent.prototype.hideCompletedTasks = function (todo) {
        if (todo.controls.hideCheckedItems.value) {
            todo.controls.hideCheckedItems.setValue(false);
        }
        else {
            todo.controls.hideCheckedItems.setValue(true);
        }
        if (todo) {
            this.changeTodo(todo.controls.id.value, todo);
        }
    };
    TodoComponent.prototype.logChange = function () {
        var _this = this;
        var nameControl = this.todosFormGroup.get(this.FORM_CONTROL_NAME);
        nameControl.valueChanges.forEach(function (value) {
            console.log(value);
            _this.nameChangeLog.push(value);
        });
    };
    TodoComponent.prototype.cardLayout = function () {
        var _this = this;
        var cardList = [];
        this.cards.changes.subscribe(function (data) {
            cardList = data.toArray();
        });
        setTimeout(function () {
            // console.log(cardList);
            cardList.forEach(function (item, index) {
                _this.cardListInfo.push({
                    index: index,
                    width: item.nativeElement.offsetWidth,
                    height: item.nativeElement.offsetHeight,
                    transformLeft: "translate(" + index * item.nativeElement.offsetWidth + ", 0)",
                    className: item.nativeElement.classList.value
                });
                // item.nativeElement = `translate(${index*item.nativeElement.offsetWidth},0)`;
            });
        }, 100);
    };
    TodoComponent.prototype.openLabelMenu = function (id) {
        this.filterLabelsFormControl.setValue('');
        this.labelId === id ? this.labelId = '' : this.labelId = id;
    };
    TodoComponent.prototype.showTodosByLabel = function (label) {
        var _this = this;
        var todoArrayFiltered = [];
        if (!label || label === 'home') {
            this.setTodos(this.todoArray);
            this.filteredLabels = this.getLabels(this.todoArray);
            this.route.navigate(['/todo', 'home']);
        }
        else {
            this.route.navigate(['/todo', label]);
            this.todoArray.forEach(function (todo) {
                if (todo.label && -1 !== todo.label.indexOf(label)) {
                    todoArrayFiltered.push(todo);
                    _this.setTodos(todoArrayFiltered);
                    _this.filteredLabels = _this.getLabels(_this.todoArray);
                }
            });
        }
    };
    TodoComponent.prototype.uploadMedia = function (key, event) {
        var _this = this;
        var fileList = event.target.files;
        var file = fileList.item(0);
        var media = new __WEBPACK_IMPORTED_MODULE_11__shared_model__["b" /* Media */](file);
        this.uploadProgress = 1;
        this.uploadId = key;
        this.todoService.uploadMedia(key, media);
        this.eventEmitterService.uploadProgressChanges.subscribe(function (progress) {
            _this.uploadProgress += progress;
        });
    };
    TodoComponent.prototype.fullScreenSearch = function () {
        this.fullScreenClass = true;
    };
    TodoComponent.prototype.closeFullScreenSearch = function () {
        this.fullScreenClass = false;
        this.filterTodosFormControl.reset('');
        this.setTodos(this.todoArray);
    };
    TodoComponent.prototype.setNotificationMessage = function (messageInfo) {
        this.globalNotificationService.setNotificationMessage(messageInfo);
    };
    return TodoComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChildren"])('textArea'),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["QueryList"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["QueryList"]) === "function" && _a || Object)
], TodoComponent.prototype, "textArea", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChildren"])('card'),
    __metadata("design:type", typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["QueryList"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["QueryList"]) === "function" && _b || Object)
], TodoComponent.prototype, "cards", void 0);
TodoComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-todo',
        template: __webpack_require__("../../../../../src/app/todo/todo.component.html"),
        styles: [__webpack_require__("../../../../../src/app/todo/todo.component.scss")],
        animations: [
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__angular_animations__["a" /* trigger */])('fadeIn', [
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__angular_animations__["d" /* transition */])(':enter', [
                    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__angular_animations__["c" /* style */])({ opacity: 0 }),
                    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__angular_animations__["e" /* animate */])('0.5s ease', __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__angular_animations__["c" /* style */])({ opacity: 1 }))
                ]),
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__angular_animations__["d" /* transition */])(':leave', [
                    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__angular_animations__["c" /* style */])({ opacity: 1 }),
                    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__angular_animations__["e" /* animate */])('0.15s ease', __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__angular_animations__["c" /* style */])({ opacity: 0 }))
                ])
            ])
        ]
    }),
    __metadata("design:paramtypes", [typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["c" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["c" /* ActivatedRoute */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_4_angularfire2_database__["b" /* AngularFireDatabase */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4_angularfire2_database__["b" /* AngularFireDatabase */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_8__todo_service__["a" /* TodoService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_8__todo_service__["a" /* TodoService */]) === "function" && _f || Object, typeof (_g = typeof __WEBPACK_IMPORTED_MODULE_12__shared_services_auth_service__["a" /* AuthService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_12__shared_services_auth_service__["a" /* AuthService */]) === "function" && _g || Object, typeof (_h = typeof __WEBPACK_IMPORTED_MODULE_14__shared_services_snackbar_service__["a" /* SnackBarService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_14__shared_services_snackbar_service__["a" /* SnackBarService */]) === "function" && _h || Object, typeof (_j = typeof __WEBPACK_IMPORTED_MODULE_15__shared_component_global_notification_global_notification_service__["a" /* GlobalNotificationService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_15__shared_component_global_notification_global_notification_service__["a" /* GlobalNotificationService */]) === "function" && _j || Object, typeof (_k = typeof __WEBPACK_IMPORTED_MODULE_1__angular_forms__["k" /* FormBuilder */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_forms__["k" /* FormBuilder */]) === "function" && _k || Object, typeof (_l = typeof __WEBPACK_IMPORTED_MODULE_13__shared_services_event_emitter_service__["a" /* EventEmitterService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_13__shared_services_event_emitter_service__["a" /* EventEmitterService */]) === "function" && _l || Object])
], TodoComponent);

var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
//# sourceMappingURL=todo.component.js.map

/***/ }),

/***/ "../../../../../src/app/todo/todo.model.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__shared_model_abstract_model__ = __webpack_require__("../../../../../src/app/shared/model/abstract.model.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return Todo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return Task; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return todos; });
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

var Todo = (function (_super) {
    __extends(Todo, _super);
    function Todo() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.id = 0;
        _this.uid = '';
        _this.color = '';
        _this.name = '';
        _this.mediaUrl = '';
        _this.label = [];
        _this.hideCheckedItems = false;
        return _this;
    }
    return Todo;
}(__WEBPACK_IMPORTED_MODULE_0__shared_model_abstract_model__["a" /* AbstractModel */]));

var Task = (function () {
    function Task() {
        this.id = 0;
        this.completed = false;
        this.archived = false;
        this.title = '';
    }
    return Task;
}());

var todos = [{
        'color': 'theme--white',
        'hideCheckedItems': false,
        'id': '-Ky_ahV7RERew_ixkY_B',
        'key': '-Ky_ahV7RERew_ixkY_B',
        'label': ['Personal', 'Work'],
        'name': 'Tommorows task',
        'mediaUrl': ''
    }, {
        'color': 'theme--white',
        'hideCheckedItems': false,
        'id': '-KydmuEkCq1eUqsGszec',
        'key': '-KydmuEkCq1eUqsGszec',
        'label': ['Work', 'Inspiration', 'Personal'],
        'name': 'Todays task',
        'mediaUrl': '',
        'tasks': [{
                'archived': false,
                'completed': false,
                'id': 0,
                'title': 'I am inserting this shit'
            }, {
                'archived': false,
                'completed': false,
                'id': 0,
                'title': 'hello oword'
            }, {
                'archived': false,
                'completed': true,
                'id': 0,
                'title': 'who cares about the dead fish'
            }]
    }, {
        'color': 'theme--red-light',
        'hideCheckedItems': false,
        'id': '-KydmwwGOtBkQblRysim',
        'key': '-KydmwwGOtBkQblRysim',
        'label': ['Work', 'Inspiration'],
        'name': 'Todays task',
        'mediaUrl': '',
        'tasks': [{
                'archived': false,
                'completed': false,
                'id': 0,
                'title': 'I am inserting this shit'
            }, {
                'archived': false,
                'completed': true,
                'id': 0,
                'title': 'hello oword'
            }, {
                'archived': false,
                'completed': true,
                'id': 0,
                'title': 'who cares about the dead fish'
            }]
    }];
//# sourceMappingURL=todo.model.js.map

/***/ }),

/***/ "../../../../../src/app/todo/todo.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_observable_of__ = __webpack_require__("../../../../rxjs/observable/of.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_observable_of___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_observable_of__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_delay__ = __webpack_require__("../../../../rxjs/add/operator/delay.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_delay___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_delay__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_firebase_app__ = __webpack_require__("../../../../firebase/app/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_firebase_app___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_firebase_app__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_angularfire2_database__ = __webpack_require__("../../../../angularfire2/database/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__todo_model__ = __webpack_require__("../../../../../src/app/todo/todo.model.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__shared_config__ = __webpack_require__("../../../../../src/app/shared/config/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__shared_services_event_emitter_service__ = __webpack_require__("../../../../../src/app/shared/services/event-emitter.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__shared_services_snackbar_service__ = __webpack_require__("../../../../../src/app/shared/services/snackbar.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__shared_services_auth_service__ = __webpack_require__("../../../../../src/app/shared/services/auth.service.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TodoService; });
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










var TodoService = (function () {
    function TodoService(db, authService, snackBarService, eventEmitterService) {
        this.db = db;
        this.authService = authService;
        this.snackBarService = snackBarService;
        this.eventEmitterService = eventEmitterService;
        this.delay = 100;
        this.mediaPath = '';
        this.dbPath = __WEBPACK_IMPORTED_MODULE_6__shared_config__["a" /* Config */].DB_PATH;
        this.userUID = '';
    }
    TodoService.prototype.getModelPath = function () {
        return this.db.list(this.dbPath);
    };
    TodoService.prototype.getLocalData = function () {
        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_rxjs_observable_of__["of"])(__WEBPACK_IMPORTED_MODULE_5__todo_model__["a" /* todos */]).delay(this.delay);
    };
    TodoService.prototype.getTodos = function () {
        var _this = this;
        var todos = this.db.list(this.dbPath, function (ref) { return ref.orderByChild('uid').equalTo(_this.authService.getCurrentUser().uid); });
        return todos.snapshotChanges().map(function (changes) {
            return changes.map(function (change) { return (__assign({ key: change.payload.key }, change.payload.val())); });
        });
    };
    TodoService.prototype.updateTodo = function (key, todo) {
        this.getModelPath().update(key, todo).catch(function (error) {
            console.log('error updating: ', error);
        });
    };
    TodoService.prototype.createTodo = function (todo) {
        this.getModelPath().push(todo); // TODO: handle error
    };
    TodoService.prototype.removeTodo = function (key) {
        this.getModelPath().remove(key).catch(function (error) {
            console.log('error deleting..', error);
        });
    };
    TodoService.prototype.uploadMedia = function (key, media) {
        var _this = this;
        var storageRef = __WEBPACK_IMPORTED_MODULE_3_firebase_app__["storage"]().ref();
        var uploadTask = storageRef.child("" + key).put(media.file);
        uploadTask.on(__WEBPACK_IMPORTED_MODULE_3_firebase_app__["storage"].TaskEvent.STATE_CHANGED, function (snapshot) {
            media.progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            _this.eventEmitterService.setUploadProgress(media.progress);
        }, function (error) {
            _this.eventEmitterService.setUploadProgress(0);
            var message = '';
            switch (error.code) {
                case 'storage/unauthorized':
                    message = "User doesn't have permission";
                    break;
                case 'storage/canceled':
                    message = 'User canceled the upload';
                    break;
                case 'storage/unknown':
                    message = 'Unknown error occured';
                    break;
            }
            _this.snackBarService.openSnackBar(message);
        }, function () {
            _this.eventEmitterService.setUploadProgress(0);
            _this.saveMedia(key);
        });
    };
    TodoService.prototype.saveMedia = function (key) {
        this.db.list(this.dbPath).update(key, {
            mediaUrl: key
        });
    };
    TodoService.prototype.deleteMedia = function (key) {
        var storageRef = __WEBPACK_IMPORTED_MODULE_3_firebase_app__["storage"]().ref();
        storageRef.child("" + key).delete();
    };
    return TodoService;
}());
TodoService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_4_angularfire2_database__["b" /* AngularFireDatabase */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4_angularfire2_database__["b" /* AngularFireDatabase */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_9__shared_services_auth_service__["a" /* AuthService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_9__shared_services_auth_service__["a" /* AuthService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_8__shared_services_snackbar_service__["a" /* SnackBarService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_8__shared_services_snackbar_service__["a" /* SnackBarService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_7__shared_services_event_emitter_service__["a" /* EventEmitterService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_7__shared_services_event_emitter_service__["a" /* EventEmitterService */]) === "function" && _d || Object])
], TodoService);

var _a, _b, _c, _d;
//# sourceMappingURL=todo.service.js.map

/***/ }),

/***/ "../../../../../src/environments/environment.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
// The file contents for the current environment will overwrite these during build.
var environment = {
    production: false,
    BASEURL: 'http://localhost:3000',
    firebase: {
        apiKey: 'AIzaSyCkTH_tba9fvXxD7h7Yxj-6WvtN_NQHtFo',
        authDomain: 'todo-f3651.firebaseapp.com',
        databaseURL: 'https://todo-f3651.firebaseio.com',
        projectId: 'todo-f3651',
        storageBucket: 'todo-f3651.appspot.com',
        messagingSenderId: '951040107681'
    }
};
//# sourceMappingURL=environment.js.map

/***/ }),

/***/ "../../../../../src/main.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__("../../../platform-browser-dynamic/@angular/platform-browser-dynamic.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__("../../../../../src/app/app.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["enableProdMode"])();
}
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("../../../../../src/main.ts");


/***/ })

},[0]);
//# sourceMappingURL=main.bundle.js.map