import { Hello } from '../../../domain/hello/hello';
import { HelloRepository } from '../../../infrastructure/adapters/repository/hello/helloRepository';

export class HelloUseCase {
  public async helloWorld(payload: any): Promise<void> {
    console.log({ payload });

    const helloRepository = new HelloRepository();

    const hello = new Hello(helloRepository);

    await hello.save(payload);
  }
}
