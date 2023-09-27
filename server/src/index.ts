import './config/environment';
import { HelloUseCase } from './application/useCases/hello/helloUseCases';
import { Routes } from './infrastructure/routes/routes';
import { ExpressController } from './infrastructure/frameworks/express/expressController';
import { TransactionUseCase } from './application/useCases/transaction/transactionUseCase';

const port = process.env.CONFIG_SERVER_PORT!;

const helloUseCase = new HelloUseCase();

const routesHello = new Routes([
  {
    path: '/hello',
    verb: 'post',
    handler: helloUseCase.helloWorld.bind(helloUseCase),
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

expressController.configureRoutes(routesHello);

expressController.listen(Number(port));
