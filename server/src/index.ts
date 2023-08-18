import { HelloUseCase } from './application/useCases/hello/helloUseCases';
import './config/environment';
import { Routes } from './infrastructure/routes/routes';
import { ExpressController } from './infrastructure/frameworks/express/expressController';

const port = process.env.CONFIG_SERVER_PORT!;

const helloUseCase = new HelloUseCase();

const routes = new Routes([
  {
    path: '/hello',
    verb: 'post',
    handler: helloUseCase.helloWorld.bind<any>(helloUseCase),
  },
]);

const expressController = new ExpressController(routes);

expressController.listen(Number(port));
