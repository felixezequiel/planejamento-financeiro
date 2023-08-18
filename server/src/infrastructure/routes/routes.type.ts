export interface Route {
  verb: 'get' | 'post' | 'put' | 'delete';
  path: string;
  handler(payload: any): Promise<any>;
  middleware?(payload: any): Promise<void>;
}

export interface IRoutes {
  routes: Route[];
}
