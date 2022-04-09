"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
require("reflect-metadata");
require("express-async-errors");
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const express_1 = __importDefault(require("express"));
require("./database");
const routes_1 = __importDefault(require("./routes"));
const AppError_1 = __importDefault(require("./errors/AppError"));
const app = (0, express_1.default)();
app.use(body_parser_1.default.json({
    limit: '20mb',
}));
app.use(body_parser_1.default.urlencoded({
    limit: '20mb',
    parameterLimit: 100000,
    extended: true,
}));
app.use((0, cors_1.default)());
app.use(routes_1.default);
app.use((err, request, response, _) => {
    if (err instanceof AppError_1.default) {
        return response
            .status(err.statusCode)
            .json({ status: 'error', message: err.message });
    }
    console.log(err);
    return response
        .status(500)
        .json({ status: 'error', message: 'Internal server error' });
});
app.listen(process.env.PORT || 3000, () => {
    console.log('Server started on port 3000');
});
