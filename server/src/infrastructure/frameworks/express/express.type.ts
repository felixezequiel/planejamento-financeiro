import { Express } from 'express';
import { IRoutes } from '../../../domain/routes/routes.type';

export interface IExpress {
  app: Express;

  routes: IRoutes;

  listen(port: number): void;
}
