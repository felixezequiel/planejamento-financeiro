export interface Route {
  verb: 'get' | 'post' | 'put' | 'delete';
  path: string;
  handler<Payload = any, Response = any>(payload: Payload): Promise<Response>;
  middleware?<Payload = any>(payload: Payload): Promise<void>;
}

export interface IRoutes {
  routes: Route[];
}
