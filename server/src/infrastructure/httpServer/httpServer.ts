import { Route } from '../routes/routes.type';
import { createServer, IncomingMessage, Server } from 'http';
import url from 'url';
import util from 'util';

export class HTTPServer {
  private server: Server | undefined;

  private _routes: Map<string, Route> = new Map();

  private get routes(): Route[] {
    return Array.from(this._routes.values());
  }

  private buildBody(req: IncomingMessage): Promise<Record<string, string>> {
    return new Promise((resolve) => {
      let body = '';

      req.on('data', (chunk) => {
        body += chunk;
      });

      req.on('end', () => {
        resolve(JSON.parse(body));
      });
    });
  }

  private buildPathParams(req: IncomingMessage, path: string) {
    const parsedUrl = url.parse(req.url!, true);
    const pathParams: Record<string, string> = {};

    const key = path;
    const target = parsedUrl.pathname!;

    const keyParts = key.split('/');
    const targetParts = target.split('/');

    if (keyParts.length === targetParts.length) {
      for (let i = 0; i < keyParts.length; i++) {
        const keyPart = keyParts[i];
        const targetPart = targetParts[i];

        if (keyPart.startsWith(':')) {
          const paramName = keyPart.substr(1);
          pathParams[paramName] = targetPart;
        }
      }
    }

    return pathParams;
  }

  private async buildPayload(req: IncomingMessage, path: string) {
    const url = new URL(req.url!, `http://${req.headers.host}`);
    const queryParams = new URLSearchParams(url.search);

    const query: Record<string, string> = {};

    Array.from(queryParams.entries()).forEach(([key, value]) => {
      query[key] = value;
    });

    const body = await this.buildBody(req);
    const params = this.buildPathParams(req, path);

    return { ...query, ...params, ...body };
  }

  private targetRoute(req: IncomingMessage) {
    const parsedUrl = url.parse(req.url!, true);
    const pathname = parsedUrl.pathname!;

    return this.routes.find((route) => {
      return route.path === pathname && route.verb.toLowerCase() === req.method?.toLowerCase();
    });
  }

  private buildListenRoutes(): void {
    this.server = createServer(async (req, res) => {
      try {
        console.log(`${req.method} ${req.url}`);

        console.log(this.routes);

        const target = this.targetRoute(req);

        if (!target) {
          res.writeHead(404, { 'Content-Type': 'text/plain' });

          res.end(`Cannot ${req.method} ${req.url}`);

          return;
        }

        const payload = await this.buildPayload(req, target.path);

        const response = await target.handler(payload);

        if (!response) {
          res.writeHead(204, { 'Content-Type': 'text/plain' });

          res.end();

          return;
        }

        res.writeHead(200, { 'Content-Type': 'application/json' });
      } catch (error) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });

        res.end(util.format(error));
      }
    });
  }

  public configureRoutes(routes: Route[]): void {
    routes.forEach((route) => {
      this._routes.set(`${route.path}${route.verb}`, route);
    });

    this.buildListenRoutes();
  }

  public listen(port: number): void {
    if (this.server === undefined) throw new Error('Server not configured');

    this.server.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  }
}
