import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices/client';

@Injectable()
export class AppService {

  constructor(
    @Inject('RMQ') private readonly client: ClientProxy,
  ) {}

  getHello(): string {
    this.client.emit('task', 'Hello from Nest');
    return 'Hello World!';
  }
}
