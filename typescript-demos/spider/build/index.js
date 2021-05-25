"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
// 第一版
// import router from './router'
// 第二版
// import './controller/Controller'
// import { router } from './controller/decorator'
// 优化第三版
require("./controller");
var routers_1 = __importDefault(require("./routers"));
var app = express_1.default();
app.use(routers_1.default);
app.listen(3000, function () {
    console.log('server is running');
});
