import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices/client';

@Injectable()
export class AppService {

  constructor(
    @Inject('RMQ') private readonly client: ClientProxy,
  ) {}

  getHello(): string {
    this.client.emit('task', new Date().toISOString());
    return 'Hello World!';
  }
}
