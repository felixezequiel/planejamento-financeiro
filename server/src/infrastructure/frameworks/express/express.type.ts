import { IRoutes } from '../../routes/routes.type';

export interface IServerConfig {
  listen(port: number): void;

  configureRoutes(routes: IRoutes): void;
}
