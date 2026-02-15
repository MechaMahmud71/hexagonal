import { RabbitMqModuleOptions } from "src/common/adapters/queues/rabbitmq/rabbitmq-module-options.interface";

export interface ApplicationBootstrapOptions {
  driver: 'orm' | 'in-memory';
  rabbitMqOptions?: RabbitMqModuleOptions;
}