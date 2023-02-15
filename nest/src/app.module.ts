import { Module } from '@nestjs/common';
import { Transport } from '@nestjs/microservices/enums';
import { ClientsModule } from '@nestjs/microservices/module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ClientsModule.register([
      { 
        name: 'RMQ',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: 'task_queue',
          persistent: true,
          serializer: {
            serialize(value) {
              return value.data;
            },
          },
          queueOptions: {
            durable: true,
          },
        },
      },
    ])
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
