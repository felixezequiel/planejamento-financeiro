import { IRoutes, Route } from './routes.type';

export class Routes implements IRoutes {
  constructor(public routes: Route[]) {}
}
