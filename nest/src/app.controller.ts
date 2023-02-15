import { Controller, Get } from '@nestjs/common';
import { Ctx, MessagePattern, Payload, RmqContext } from '@nestjs/microservices';
import { Transport } from '@nestjs/microservices/enums';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @MessagePattern('task', Transport.RMQ)
  getNotifications(@Payload() data: string, @Ctx() context: RmqContext) {
    console.log(`message: ${data}`);

    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();
    channel.ack(originalMsg);
  }
}
