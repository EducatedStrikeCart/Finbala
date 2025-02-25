import debug from "debug";
import StatsService from "./stats.service";
import express from "express";

const log: debug.IDebugger = debug("app:stats-controller");
class StatsController {
    async listStats(req: express.Request, res: express.Response) {
        const stats = await StatsService.list();
        res.status(200).send(stats);
    }

    async getStatById(req: express.Request, res: express.Response) {
        const stats = await StatsService.readById(req.params.id);
        res.status(200).send(stats);
    }

    async createStat(req: express.Request, res: express.Response) {
        const result = await StatsService.create(req.body);
        res.status(201).send(result);
    }

    async patchStat(req: express.Request, res: express.Response) {
        log(await StatsService.patchById(req.params.id, req.body));
        res.status(204).send();
    }

    async putStat(req: express.Request, res: express.Response) {
        log(await StatsService.putById(req.params.id, req.body));
        res.status(204).send();
    }

    async deleteStat(req: express.Request, res: express.Response) {
        var result = await StatsService.deleteById(req.params.id);
        log(result);
        res.status(204).send(result);
    }
}

export default new StatsController();
