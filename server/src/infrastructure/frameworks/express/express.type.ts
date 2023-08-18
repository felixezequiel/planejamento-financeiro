import { Express } from 'express';
import { IRoutes } from '../../routes/routes.type';

export interface IExpress {
  app: Express;

  listen(port: number): void;

  configureRoutes(routes: IRoutes): void;
}
