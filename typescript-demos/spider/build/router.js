"use strict";
/**
 * 路由文件
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var spider_1 = __importDefault(require("./spider"));
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var router = express_1.Router();
router.get('/', function (req, res) {
    res.send('hello world');
});
router.get('/setData', function (req, res) {
    new spider_1.default();
    res.send('setData');
});
router.get('/getData', function (req, res) {
    try {
        var filePath = path_1.default.resolve(__dirname, '../data/content.json');
        var result = fs_1.default.readFileSync(filePath, 'utf8');
        res.json(JSON.parse(result));
    }
    catch (e) {
        res.send('暂无数据');
    }
});
exports.default = router;
