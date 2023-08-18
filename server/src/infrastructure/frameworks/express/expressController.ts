import express, { Express, NextFunction, Request, Response } from 'express';
import { IRoutes, Route } from '../../../domain/routes/routes.type';
import { IExpress } from './express.type';
import cors from 'cors';
import { configCors } from '../../../config/cors/configCors';

export class ExpressController implements IExpress {
  public app: Express;

  constructor(public routes: IRoutes) {
    this.app = express();

    this.app.use(express.json());

    this.app.use(express.urlencoded({ extended: true }));

    this.app.use(cors(configCors));
  }

  private executeWithMiddlewares(route: Route): void {
    const handleMiddlewares = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
        const payload = { ...req.body, ...req.params, ...req.query };

        await route.middleware!(payload);

        next();
      } catch (error) {
        res.status(500).json(error);
      }
    };

    this.app[route.verb](route.path, handleMiddlewares, route.handler);
  }

  private executeWithoutMiddlewares(route: Route): void {
    this.app[route.verb](route.path, route.handler);
  }

  private configureRoutes(): void {
    this.routes.routes.forEach((route) => {
      if (route.middleware) {
        this.executeWithMiddlewares(route);
      } else {
        this.executeWithoutMiddlewares(route);
      }
    });
  }

  listen(port: number): void {
    this.configureRoutes();

    this.app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  }
}
