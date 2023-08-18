export type InstanceClient<Instance, Response> = (db: Instance) => Promise<Response>;

export interface IConnectionDB<Instance = any, Transaction = any> {
  connection<Response = void>(callback: InstanceClient<Instance, Response>): Promise<Response>;

  transaction<Response = void>(callback: InstanceClient<Transaction, Response>): Promise<Response>;
}
