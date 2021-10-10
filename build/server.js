"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var dotenv_1 = __importDefault(require("dotenv"));
var body_parser_1 = __importDefault(require("body-parser"));
var products_1 = __importDefault(require("./handlers/products"));
var users_1 = __importDefault(require("./handlers/users"));
var orders_1 = __importDefault(require("./handlers/orders"));
dotenv_1["default"].config();
var app = (0, express_1["default"])();
app.use(body_parser_1["default"].json());
app.get("/", function (req, res) {
    res.send("Storefront Backend Project");
});
// Routes
app.use("/api/products", products_1["default"]);
app.use("/api/users", users_1["default"]);
app.use("/api/orders", orders_1["default"]);
// Start
app.listen(process.env.APP_PORT, function () {
    console.log("starting app on: http://localhost:3000");
});
exports["default"] = app;
