"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.checkPassword = exports.hashPassword = void 0;
var bcrypt_1 = __importDefault(require("bcrypt"));
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1["default"].config();
// @ts-ignore
var saltRounds = process.env.SALT_ROUNDS;
// @ts-ignore
var pepper = process.env.BCRYPT_PASSWORD;
var hashPassword = function (password) {
    return bcrypt_1["default"].hashSync(password + pepper, parseInt(saltRounds));
};
exports.hashPassword = hashPassword;
var checkPassword = function (password, hashedPassword) {
    return bcrypt_1["default"].compare(password + pepper, hashedPassword);
};
exports.checkPassword = checkPassword;
