import ValidationMiddleware from "../common/middlewares/query.validation.middleware";
import StatsController from "../stats/stats.controller";
import { CommonRoutesConfig } from "../common/interfaces/common.routes.config";
import express from "express";
import { body, checkExact, query } from "express-validator";
import BodyValidationMiddleware from "../common/middlewares/body.validation.middleware";

export class StatRoutes extends CommonRoutesConfig {
    constructor(app: express.Application) {
        super(app, "StatRoutes");
    }

    configureRoutes(): express.Application {
        this.app
            .route("/stats/")
            .get(query("id").isNumeric(), StatsController.getStatById)
            .post(StatsController.createStat);

        this.app
            .route("/stats/:id")
            .get(
                body().notEmpty(),
                body("id").notEmpty(),
                body("id").isNumeric(),
                StatsController.getStatById
            )
            .put(
                body().notEmpty(),
                BodyValidationMiddleware.verifyStatBodyFieldErrors,
                StatsController.putStat
            )
            .patch(
                body().notEmpty(),
                BodyValidationMiddleware.verifyStatBodyFieldErrors,
                StatsController.patchStat
            )
            .delete(StatsController.deleteStat);

        return this.app;
    }
}
