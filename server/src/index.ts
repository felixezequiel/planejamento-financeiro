import './config/environment';
import { Routes } from './domain/routes/routes';
import { ExpressController } from './infrastructure/frameworks/express/expressController';

const port = process.env.CONFIG_SERVER_PORT!;

const routes = new Routes([]);

const expressController = new ExpressController(routes);

expressController.listen(Number(port));
