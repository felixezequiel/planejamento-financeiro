export type InstanceClient<Instance, Response, Session = unknown> = (db: Instance, session?: Session) => Promise<Response>;

export interface IConnectionDB<Instance = any, Transaction = any, Session = unknown> {
  connection<Response = void>(callback: InstanceClient<Instance, Response>): Promise<Response>;

  transaction<Response = void>(callback: InstanceClient<Transaction, Response, Session>): Promise<Response>;
}
