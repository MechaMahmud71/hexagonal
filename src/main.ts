import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { RabbitMqMicroserviceOptions } from './common/adapters/queues/rabbitmq/rabbitmq.registry';

async function bootstrap() {
  const app = await NestFactory.create(AppModule.register({
    driver: 'orm'
  }));

  RabbitMqMicroserviceOptions.forEach((option) => {
    app.connectMicroservice(option);
  });
  await app.startAllMicroservices();
  const port = process.env.PORT ?? 3001;
  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}`);
}
bootstrap();
