import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { CommonRoutesConfig } from './common/interfaces/common.routes.config';
import { StatRoutes } from './routes_v1/stat.routes_v1.config';

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json())
app.disable('x-powered-by')

const app_v1: express.Application = express();

// Configure
const PORT = 3000;
app.use("/api/v1", app_v1);

const routes: Array<CommonRoutesConfig> = [];
routes.push(new StatRoutes(app_v1));

app.listen(
    PORT, () => {
        return console.log(`Finbala Sever is listening at http://localhost:${PORT}`)
    }
)