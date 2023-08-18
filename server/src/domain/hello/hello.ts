import { IHello } from './hello.type';

export class Hello implements IHello {
  constructor(public repository: IHello) {}

  public async save(payload: any): Promise<void> {
    await this.repository.save(payload);
  }
}
