import express, { NextFunction } from "express";
import StatsService from "../../stats/stats.service";

class QueryValidationMiddleWare {
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

    async validateStatRequiredQueryFields(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) {
        if (req.query && req.query.id) {
            next();
        } else {
            if (req.query.npi && !req.query.id) {
                res.status(400).send({ error: "Missing required field: id" });
            }
        }
    }
}

export default new QueryValidationMiddleWare();
