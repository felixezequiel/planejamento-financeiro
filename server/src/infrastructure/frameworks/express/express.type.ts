import { Express } from 'express';
import { IRoutes } from '../../routes/routes.type';

export interface IExpress {
  app: Express;

  routes: IRoutes;

  listen(port: number): void;
}
