"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b;
exports.__esModule = true;
exports.checkPassword = exports.hashPassword = void 0;
var bcrypt_1 = __importDefault(require("bcrypt"));
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1["default"].config();
var saltRounds = (_a = process.env.SALT_ROUNDS) !== null && _a !== void 0 ? _a : "10";
var pepper = (_b = process.env.BCRYPT_PASSWORD) !== null && _b !== void 0 ? _b : "default";
var hashPassword = function (password) {
    return bcrypt_1["default"].hashSync(password + pepper, parseInt(saltRounds));
};
exports.hashPassword = hashPassword;
var checkPassword = function (password, hashedPassword) {
    return bcrypt_1["default"].compare(password + pepper, hashedPassword);
};
exports.checkPassword = checkPassword;
