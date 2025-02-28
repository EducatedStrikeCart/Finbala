import StatsController from "../stats/stats.controller";
import { CommonRoutesConfig } from "../common/interfaces/common.routes.config";
import express from "express";
import { body, param, validationResult } from "express-validator";

const myValidationResult = validationResult.withDefaults({
    formatter: (error) => error.msg,
});

export class StatRoutes extends CommonRoutesConfig {
    constructor(app: express.Application) {
        super(app, "StatRoutes");
    }

    configureRoutes(): express.Application {
        this.app
            .route("/stats/")
            .get(StatsController.listStats)
            .post(
                body("type").notEmpty().withMessage("Type cannot be empty"),
                body("displayName")
                    .notEmpty()
                    .withMessage("Display name cannot be empty"),
                body("amount").notEmpty().withMessage("Amount Cannot be empty"),
                (req, res) => {
                    const err = myValidationResult(req);
                    if (!err.isEmpty()) {
                        console.log(err);
                        res.status(400).send(err.mapped());
                    } else {
                        StatsController.createStat(req, res);
                    }
                }
            );

        this.app
            .route("/stats/:id")
            .get(
                param("id").isHexadecimal().withMessage("Invalid format"),
                param("id")
                    .isLength({ min: 24, max: 24 })
                    .withMessage("Invalid id length"),
                (req, res) => {
                    const err = myValidationResult(req);
                    if (!err.isEmpty()) {
                        console.log(err);
                        res.status(404).send(err.mapped());
                    } else {
                        StatsController.getStatById(req, res);
                    }
                }
            )
            .put(
                param("id").isHexadecimal().withMessage("Invalid format"),
                param("id")
                    .isLength({ min: 24, max: 24 })
                    .withMessage("Invalid id length"),
                body("type").notEmpty().withMessage("Type cannot be empty"),
                body("displayName")
                    .notEmpty()
                    .withMessage("Display name cannot be empty"),
                body("amount").notEmpty().withMessage("Amount cannot be empty"),
                (req, res) => {
                    const err = myValidationResult(req);
                    if (!err.isEmpty()) {
                        console.log(err);
                        res.status(400).send(err.mapped());
                    } else {
                        StatsController.putStat(req, res);
                    }
                }
            )
            .patch(
                param("id").isHexadecimal().withMessage("Invalid format"),
                param("id")
                    .isLength({ min: 24, max: 24 })
                    .withMessage("Invalid id length"),
                (req, res) => {
                    const err = myValidationResult(req);
                    if (!err.isEmpty()) {
                        console.log(err);
                        res.status(400).send(err.mapped());
                    } else {
                        StatsController.patchStat(req, res);
                    }
                }
            )
            .delete(
                param("id").isHexadecimal().withMessage("Invalid format"),
                param("id")
                    .isLength({ min: 24, max: 24 })
                    .withMessage("Invalid id length"),
                (req, res) => {
                    const err = myValidationResult(req);
                    if (!err.isEmpty()) {
                        console.log(err);
                        res.status(404).send(err.mapped());
                    } else {
                        StatsController.deleteStat(req, res);
                    }
                }
            );

        return this.app;
    }
}
