import { HelloUseCase } from './application/useCases/hello/helloUseCases';
import './config/environment';
import { Routes } from './infrastructure/routes/routes';
import { ExpressController } from './infrastructure/frameworks/express/expressController';
import { TransactionUseCase } from './application/useCases/transaction/transactionUseCase';
import { HTTPServer } from './infrastructure/httpServer/httpServer';

const port = process.env.CONFIG_SERVER_PORT!;

const helloUseCase = new HelloUseCase();

const routesHello = new Routes([
  {
    path: '/hello',
    verb: 'post',
    handler: helloUseCase.helloWorld.bind<any>(helloUseCase),
  },
]);

const transactionUseCase = new TransactionUseCase();

const routesTransaction = new Routes([
  {
    path: '/transaction',
    verb: 'post',
    handler: transactionUseCase.save.bind(transactionUseCase),
  },
  {
    path: '/transaction/:id',
    verb: 'put',
    handler: transactionUseCase.update.bind(transactionUseCase),
  },
  {
    path: '/transaction/:id',
    verb: 'delete',
    handler: transactionUseCase.delete.bind(transactionUseCase),
  },
  {
    path: '/transaction/:id',
    verb: 'get',
    handler: transactionUseCase.get.bind(transactionUseCase),
  },
  {
    path: '/transaction',
    verb: 'get',
    handler: transactionUseCase.getAll.bind(transactionUseCase),
  },
]);

const expressController = new ExpressController();

expressController.configureRoutes(routesTransaction);

expressController.listen(Number(port));

const httpServer = new HTTPServer();

httpServer.configureRoutes(routesHello.routes);

httpServer.listen(Number(port) + 1);
