import express, { NextFunction } from "express";
import StatsService from "../../stats/stats.service";

class ParamValidationMiddleWare {
    async validateRequiredParamId(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) {
        if (req.params && req.params.id) {
            next();
        } else {
            res.status(400).send({
                error: "Missing required fields: id",
            });
        }
    }
}

export default new ParamValidationMiddleWare();
