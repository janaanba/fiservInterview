"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const apiRoute = express_1.default.Router();
apiRoute.post('/v1/parse', (req, res) => {
    const value = req.body;
    let parsedResult = value.data.match(/(\w+[0]{4,4})|(\w+[0]{3,3})|([0-9]{7,7}$)/gi);
    if (parsedResult && parsedResult.length === 3) {
        let [firstName, lastName, clientId] = parsedResult;
        return res.send({ statusCode: 200, data: {
                firstName,
                lastName,
                clientId
            } });
    }
    return res.send({ statusCode: 400, message: 'Illegal Argument' });
});
apiRoute.post('/v2/parse', (req, res) => {
    const value = req.body;
    let parsedResult = value.data.match(/([0-9]{7,7})$|([a-z]+)|([0]+)/gi);
    if (parsedResult && parsedResult.length === 5) {
        return res.send({ statusCode: 200, data: {
                firstName: parsedResult[0],
                lastName: parsedResult[2],
                clientId: parsedResult[4].replace(/([0-9]{3,3})([0-9]{4,4})$/gi, '$1-$2')
            } });
    }
    return res.send({ statusCode: 400, message: 'Illegal Argument' });
});
apiRoute.all('/*', (req, res) => {
    res.send({ statusCode: 404, message: 'Page Not Found' });
});
exports.default = apiRoute;
//# sourceMappingURL=api.js.map