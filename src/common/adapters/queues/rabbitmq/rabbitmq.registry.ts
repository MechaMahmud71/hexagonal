
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ALARMS_EXCHANGE, ALARMS_FANOUT_EXCHANGE, ALARMS_HEADER_EXCHANGE, ALARMS_QUEUE, ALARMS_QUEUE_1, ALARMS_QUEUE_2, ALARMS_QUEUE_FANOUT_1, ALARMS_QUEUE_FANOUT_2, ALARMS_QUEUE_HEADER, ALARMS_TOPIC_EXCHANGE } from 'src/common/interfaces/rabbitmq.constants';

export const RabbitMqMicroserviceOptions: MicroserviceOptions[] = [
    {
        transport: Transport.RMQ,
        options: {
            urls: ['amqp://localhost:5672'],
            queue: ALARMS_QUEUE,
            exchange: ALARMS_EXCHANGE,
            queueOptions: {
                durable: false,
            },
            exchangeType: 'direct',
            noAck: false,
            prefetchCount: 10,
        },
    },
    {
        transport: Transport.RMQ,
        options: {
            urls: ['amqp://localhost:5672'],
            queue: ALARMS_QUEUE_1,
            exchange: ALARMS_EXCHANGE,
            queueOptions: {
                durable: false,
            },
            exchangeType: 'direct',
            noAck: false,
            prefetchCount: 10,
        },
    },
    {
        transport: Transport.RMQ,
        options: {
            urls: ['amqp://localhost:5672'],
            queue: ALARMS_QUEUE_2,
            exchange: ALARMS_TOPIC_EXCHANGE,
            exchangeType: 'topic',
            wildcards: true,
            noAck: false,
            queueOptions: { durable: false },
        },
    },
    {
        transport: Transport.RMQ,
        options: {
            urls: ['amqp://localhost:5672'],
            queue: ALARMS_QUEUE_FANOUT_1,
            exchange: ALARMS_FANOUT_EXCHANGE,
            exchangeType: 'fanout',
            noAck: false,
            queueOptions: { durable: false },
        },
    },
    {
        transport: Transport.RMQ,
        options: {
            urls: ['amqp://localhost:5672'],
            queue: ALARMS_QUEUE_FANOUT_2,
            exchange: ALARMS_FANOUT_EXCHANGE,
            exchangeType: 'fanout',
            noAck: false,
            queueOptions: { durable: false },
        },
    },
    {
        transport: Transport.RMQ,
        options: {
            urls: ['amqp://localhost:5672'],
            queue: ALARMS_QUEUE_HEADER,
            exchange: ALARMS_HEADER_EXCHANGE,
            exchangeType: 'headers',
            noAck: false,
            queueOptions: { durable: false },
        },
    },
];
