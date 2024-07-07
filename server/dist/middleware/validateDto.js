"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateDto = validateDto;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
function validateDto(dtoClass) {
    return (req, res, next) => {
        const output = (0, class_transformer_1.plainToInstance)(dtoClass, req.body);
        (0, class_validator_1.validate)(output).then((errors) => {
            if (errors.length > 0) {
                return res.status(400).json({
                    success: false,
                    message: "Validation failed",
                    errors: errors.map((error) => ({
                        property: error.property,
                        constraints: error.constraints,
                    })),
                });
            }
            else {
                req.body = output;
                next();
            }
        });
    };
}
