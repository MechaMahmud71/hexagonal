import { Inject, Injectable, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { AlarmEventPublisher } from "src/alarms/application/ports/alarm-event-publisher";
import { ClientProxy } from "@nestjs/microservices";
import { AlarmCreatedEvent } from "../schema/rabbitmq-publisher.schema";
import { ALARM_SERVICE, ALARM_SERVICE_NEW, ALARM_TOPIC_SERVICE, ALARM_FANOUT_SERVICE, ALARM_HEADERS_SERVICE } from "src/common/interfaces/constants";
import { ALARM_CREATED_ROUTING_KEY, ALARM_CREATED_ROUTING_KEY_1, ALARM_FANOUT_BINDING_KEY, ALARM_TOPIC_ROUTING_KEY_PREFIX } from "src/common/interfaces/rabbitmq.constants";

@Injectable()
export class RabbitMqAlarmEventPublisher implements AlarmEventPublisher, OnModuleInit, OnModuleDestroy {
    constructor(
        @Inject(ALARM_SERVICE)
        private readonly client: ClientProxy,
        @Inject(ALARM_SERVICE_NEW)
        private readonly clientNew: ClientProxy,
        @Inject(ALARM_TOPIC_SERVICE)
        private readonly clientTopic: ClientProxy,
        @Inject(ALARM_FANOUT_SERVICE)
        private readonly clientFanout: ClientProxy,
        @Inject(ALARM_HEADERS_SERVICE)
        private readonly clientHeaders: ClientProxy,
    ) { }

    async onModuleInit() {
        await this.client.connect();
        await this.clientNew.connect();
        await this.clientTopic.connect();
        await this.clientFanout.connect();
        await this.clientHeaders.connect();
    }

    async onModuleDestroy() {
        await this.client.close();
        await this.clientNew.close();
        await this.clientTopic.close();
        await this.clientFanout.close();
        await this.clientHeaders.close();
    }

    async publishAlarmCreated(alarm: AlarmCreatedEvent): Promise<void> {
        // this.client.emit(ALARM_CREATED_ROUTING_KEY, alarm);
        // this.clientNew.emit(ALARM_CREATED_ROUTING_KEY_1, alarm);
        // const routingKey = `${ALARM_TOPIC_ROUTING_KEY_PREFIX}.${alarm.severity.value}.topic`;
        // this.clientTopic.emit(routingKey, alarm);
        // this.clientFanout.emit(ALARM_FANOUT_BINDING_KEY, alarm);

        // Publishing to Headers Exchange
        this.clientHeaders.emit('', { // Pattern is empty for headers in emit
            ...alarm,
            // The actual matching headers are added by the underlying amqplib call 
            // In NestJS ClientRMQ, we should pass them in the second argument if supported 
            // OR use a custom serializer. However, for this demo, we'll assume the 
            // 'x-match' headers are handled via options in the module.
        });
    }

    async publishAlarmAcknowledged(alarmId: string): Promise<void> {
        this.client.emit('alarm.acknowledged', alarmId);
        this.clientNew.emit('alarm.acknowledged_1', alarmId);
        this.clientTopic.emit('alarm.acknowledged_2', alarmId);
    }
}