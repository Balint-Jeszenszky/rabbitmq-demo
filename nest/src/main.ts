import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const rabbitMQMicroservice = app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://localhost:5672'],
      queue: 'task_queue',
      noAck: false,
      persistent: true,
      prefetchCount: 1,
      deserializer: {
        deserialize(value) {
          return ({pattern: 'task', data: value});
        },
      },
      queueOptions: {
        durable: true,
      },
    },
  });

  await app.startAllMicroservices();
  await app.listen(3000);
}
bootstrap();
