import { Inject, Injectable, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { AlarmEventPublisher } from "src/alarms/application/ports/alarm-event-publisher";
import { ClientProxy } from "@nestjs/microservices";
import { AlarmCreatedEvent } from "../schema/rabbitmq-publisher.schema";
import { ALARM_SERVICE, ALARM_SERVICE_NEW, ALARM_TOPIC_SERVICE } from "src/common/interfaces/constants";

@Injectable()
export class RabbitMqAlarmEventPublisher implements AlarmEventPublisher, OnModuleInit, OnModuleDestroy {
    constructor(
        @Inject(ALARM_SERVICE)
        private readonly client: ClientProxy,
        @Inject(ALARM_SERVICE_NEW)
        private readonly clientNew: ClientProxy,
        @Inject(ALARM_TOPIC_SERVICE)
        private readonly clientTopic: ClientProxy,
    ) { }

    async onModuleInit() {
        await this.client.connect();
        await this.clientNew.connect();
        await this.clientTopic.connect();
    }

    async onModuleDestroy() {
        await this.client.close();
        await this.clientNew.close();
        await this.clientTopic.close();
    }

    async publishAlarmCreated(alarm: AlarmCreatedEvent): Promise<void> {
        // this.client.emit('alarm.created', alarm);
        // this.clientNew.emit('alarm.created_1', alarm);
        const routingKey = `alarm.${alarm.severity.value}.topic`;
        this.clientTopic.emit(routingKey, alarm);
    }

    async publishAlarmAcknowledged(alarmId: string): Promise<void> {
        this.client.emit('alarm.acknowledged', alarmId);
        this.clientNew.emit('alarm.acknowledged_1', alarmId);
        this.clientTopic.emit('alarm.acknowledged_2', alarmId);
    }
}