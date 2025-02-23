import MongooseService from "../common/services/mongoose.service";
import debug from "debug";

const log: debug.IDebugger = debug("app:stats-dao");
class StatsDao {
    /**
     * @constructor
     */
    constructor() {
        log("Created new instance of StatsDao");
    }

    Schema = MongooseService.getMongoose().Schema;

    statsSchema = new this.Schema(
        {
            id: String, 
            type: String, // Income or expense
            displayName: String, // Name to be displayed to users
            date: Date,
            
        }
    );

    Stat = MongooseService.getMongoose().model("Stats", this.statsSchema);

    async addStat(statFields: any) {
        try {
            const stat = new this.Stat({
                ...statFields,
            });

            await stat.save();
            return `Added #${statFields.npi} : ${statFields.displayName}`;
        } catch (error) {
            log(error);
            return `Internal server error`;
        }
    }

    async getStatByNpi(statNpi: string) {
        try {
            return this.Stat.find({ npi: statNpi }).select("-__v").exec();
        } catch (error) {
            log(error);
        }
    }

    async getStatById(statId: string) {
        try {
            return this.Stat.findById(statId).select("-__v").exec();
        } catch (error) {
            log(error);
        }
    }

    async getStatByName(statName: string) {
        return this.Stat.find({ name: statName }).select("-__v").exec();
    }

    async getStats(limit = 25, page = 0) {
        return this.Stat.find()
            .limit(limit)
            .skip(limit * page)
            .select("-__v")
            .exec();
    }

    async updateStatById(statId: string, statFields: any) {
        const query = statId;
        const existingStat = await this.Stat.findByIdAndUpdate(
            query,
            { $set: statFields },
            { new: true }
        )
            .select("-__v")
            .exec();

        return existingStat?.id;
    }

    async removeStatbyId(statId: string) {
        return this.Stat.findByIdAndDelete(statId).exec();
    }
}
export default new StatsDao();
