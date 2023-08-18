import express, { Express, NextFunction, Request, Response } from 'express';
import { IRoutes, Route } from '../../routes/routes.type';
import { IExpress } from './express.type';
import cors from 'cors';
import { configCors } from '../../../config/cors/configCors';

export class ExpressController implements IExpress {
  public app: Express;

  constructor() {
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

    this.app[route.verb](route.path, handleMiddlewares, async (req: Request, res: Response) => {
      try {
        const payload = { ...req.body, ...req.params, ...req.query };

        const response = await route.handler(payload);

        if (!response) return res.status(204).json();

        res.status(200).json(response);
      } catch (error) {
        res.status(500).json(error);
      }
    });
  }

  private executeWithoutMiddlewares(route: Route): void {
    this.app[route.verb](route.path, async (req: Request, res: Response) => {
      try {
        const payload = { ...req.body, ...req.params, ...req.query };

        const response = await route.handler(payload);

        if (!response) return res.status(204).json();

        res.status(200).json(response);
      } catch (error) {
        res.status(500).json(error);
      }
    });
  }

  public configureRoutes(routes: IRoutes): void {
    routes.routes.forEach((route) => {
      if (route.middleware) {
        this.executeWithMiddlewares(route);
      } else {
        this.executeWithoutMiddlewares(route);
      }
    });
  }

  public listen(port: number): void {
    this.app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  }
}
