import { RabbitMqModuleOptions } from "src/alarms/infrustructure/queues/rabbitmq/rabbitmq-module-options.interface";

export interface ApplicationBootstrapOptions {
  driver: 'orm' | 'in-memory';
  rabbitMqOptions?: RabbitMqModuleOptions;
}