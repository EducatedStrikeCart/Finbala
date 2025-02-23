import express from "express";
import { Result, validationResult } from "express-validator";
import StatsService from "../../stats/stats.service";

class BodyValidationMiddleware {
    verifyBodyFieldErrors(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) {
        const result: Result = validationResult(req);
        if (!result.isEmpty()) {
            return res.status(400).send({ errors: result.array() });
        } else {
            next();
        }
    }

    async verifyStatBodyFieldErrors(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) {
        if (req.body && req.body.type && req.body.name && req.body.displayName && req.body.date ) {
            next();
        } else {
            res.status(400).send({
                error: "Missing required fields",
            });
        }
    }
}

export default new BodyValidationMiddleware();
