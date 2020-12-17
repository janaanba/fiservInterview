"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const toml_1 = __importDefault(require("toml"));
const fs_1 = __importDefault(require("fs"));
const api_1 = __importDefault(require("./routes/api"));
const apiWithoutRegex_1 = __importDefault(require("./routes/apiWithoutRegex"));
const body_parser_1 = __importDefault(require("body-parser"));
const constant_1 = __importDefault(require("./constant/constant"));
const app = express_1.default();
const config = toml_1.default.parse(fs_1.default.readFileSync('../config/config.toml', 'utf-8'));
app.use(body_parser_1.default.json());
app.use('/api', constant_1.default, api_1.default);
app.use('/apiTest', constant_1.default, apiWithoutRegex_1.default);
app.all('/*', (req, res) => {
    res.send({ statusCode: 404, message: 'Page Not Found' });
});
app.listen(config.port);
//# sourceMappingURL=server.js.map