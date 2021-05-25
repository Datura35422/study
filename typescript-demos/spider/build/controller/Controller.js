"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
// 第二版
// import { controller, get } from './decorator'
// 第三版优化版本
var decorators_1 = require("../decorators");
var util_1 = require("../utils/util");
var testMiddleware = function (req, res, next) {
    console.log('testMiddleware');
    next();
};
var testMiddleware2 = function (req, res, next) {
    console.log('testMiddleware2');
    next();
};
var HomeController = /** @class */ (function () {
    function HomeController() {
    }
    HomeController.prototype.home = function (req, res) {
        res.send('hello world');
    };
    HomeController.prototype.getData = function (req, res) {
        res.json(util_1.getResponseData('hello world getData'));
    };
    __decorate([
        decorators_1.get('/'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], HomeController.prototype, "home", null);
    __decorate([
        decorators_1.get('/getData'),
        decorators_1.use(testMiddleware),
        decorators_1.use(testMiddleware2),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], HomeController.prototype, "getData", null);
    HomeController = __decorate([
        decorators_1.controller('/')
    ], HomeController);
    return HomeController;
}());
