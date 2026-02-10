import { DynamicModule, Module } from "@nestjs/common";
import { RabbitMqModuleOptions } from "./rabbitmq-module-options.interface";
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({})
export class RabbitMqModule {
    static register(options: RabbitMqModuleOptions): DynamicModule {

        const serviceName = options.serviceName;
        const queueName = options.queueName;
        const exchangeName = options.exchangeName;
        const routingKey = options.routingKey;
        const url = options.url;
        const exchangeType = options.exchangeType;
        const bindingKey = options.bindingKey;

        const imports = [
            ClientsModule.register([
                {
                    name: serviceName,
                    transport: Transport.RMQ,
                    options: {
                        urls: [url || "amqp://localhost:5672"],
                        queue: queueName,
                        queueOptions: {
                            durable: false
                        },
                        exchange: exchangeName,
                        routingKey: routingKey,
                        exchangeType: exchangeType,
                        bindingKey: bindingKey
                    }
                }
            ])
        ]

        return {
            module: RabbitMqModule,
            imports,
            providers: [],
            exports: [ClientsModule]
        }
    }
}