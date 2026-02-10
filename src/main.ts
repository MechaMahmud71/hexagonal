import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule.register({
    driver: 'orm'
  }));

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://localhost:5672'],
      queue: 'alarms_queue',
      exchange: 'alarms_exchange',
      queueOptions: {
        durable: false,
      },
      exchangeType: 'direct',
      noAck: false,
      prefetchCount: 10,
    },
  });

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://localhost:5672'],
      queue: 'alarms_queue_1',
      exchange: 'alarms_exchange',
      queueOptions: {
        durable: false,
      },
      exchangeType: 'direct',
      noAck: false,
      prefetchCount: 10,
    },
  });

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://localhost:5672'],
      queue: 'alarms_queue_2',
      exchange: 'alarms_topic_exchange',
      queueOptions: {
        durable: false,
      },
      exchangeType: 'topic',
      noAck: false,
      prefetchCount: 10,
    },
  });
  await app.startAllMicroservices();
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
