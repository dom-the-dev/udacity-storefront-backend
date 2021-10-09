"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.authenticate = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1["default"].config();
var TOKEN_SECRET = process.env.TOKEN_SECRET;
var authenticate = function (req, res, next) {
    var authorizationHeader = req.headers.authorization;
    try {
        if (!authorizationHeader) {
            res.status(401);
            res.json("Access denied, no token");
        }
        else {
            var token = authorizationHeader.split(" ")[1];
            // @ts-ignore
            jsonwebtoken_1["default"].verify(token, TOKEN_SECRET);
            next();
        }
    }
    catch (err) {
        res.status(401);
        res.json("Access denied, invalid token");
    }
};
exports.authenticate = authenticate;
