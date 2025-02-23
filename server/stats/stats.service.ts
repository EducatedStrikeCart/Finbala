import { CRUD } from "../common/interfaces/crud.interface";
import StatsDao from "./stats.dao";

class StatsService implements CRUD {
    // Create
    async create(stat: any) {
        return StatsDao.addStat(stat);
    }

    // Read
    async list(limit?: number, page?: number) {
        return StatsDao.getStats();
    }

    async readById(id: string) {
        return StatsDao.getStatById(id);
    }

    // Update
    async putById(id: string, stat: any) {
        return StatsDao.updateStatById(id, stat);
    }

    async patchById(id: string, stat: any) {
        return StatsDao.updateStatById(id, stat);
    }
    // Delete
    async deleteById(id: string) {
        return StatsDao.removeStatbyId(id);
    }
}

export default new StatsService();
