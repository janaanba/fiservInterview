"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
let joiValidation = (req, res, next) => {
    const schema = joi_1.default.object().keys({
        data: joi_1.default.string().required()
    });
    const { error, value } = schema.validate(req.body);
    if (error) {
        return res.send({ statusCode: 400, message: 'Illegal Argument' });
    }
    next();
};
exports.default = joiValidation;
//# sourceMappingURL=constant.js.map