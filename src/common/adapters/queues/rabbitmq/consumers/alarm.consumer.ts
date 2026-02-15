// src/alarms/infrastructure/queues/rabbitmq/alarm-message.consumer.ts
import { ALARM_CREATED_BINDING_KEY, ALARM_CREATED_BINDING_KEY_1, ALARM_FANOUT_BINDING_KEY, ALARM_TOPIC_BINDING_KEY_PATTERN, ALARM_TOPIC_EVENT_PATTERNS } from 'src/common/interfaces/rabbitmq.constants';
import { Controller, Logger } from '@nestjs/common';

import { EventPattern, Payload, Ctx, RmqContext, MessagePattern } from '@nestjs/microservices';
import { AlarmMessageHander } from 'src/alarms/application/event-handlers/alarm.message-handler';

@Controller()
export class RabbitMqAlarmMessageConsumer {
    private readonly logger = new Logger(RabbitMqAlarmMessageConsumer.name);

    constructor(
        private readonly alarmMessageHandler: AlarmMessageHander,
    ) { }

    @EventPattern(ALARM_CREATED_BINDING_KEY)
    async handleAlarmCreated(@Payload() data: any, @Ctx() context: RmqContext) {
        const channel = context.getChannelRef();
        const originalMsg = context.getMessage();

        try {
            this.logger.log(`📨 Received alarm.created event: ${JSON.stringify(data)}`);

            // Update the materialized view (read model)
            await this.alarmMessageHandler.handle(data)

            this.logger.log(`✅ Materialized view updated for alarm: ${data.alarmId}`);

            // Acknowledge the message
            channel.ack(originalMsg);
        } catch (error) {
            this.logger.error(`❌ Error processing alarm.created: ${error.message}`, error.stack);

            // Reject and don't requeue (send to DLQ if configured)
            // Use true as 3rd param to requeue on failure
            channel.nack(originalMsg, false, false);
        }
    }
    @EventPattern(ALARM_CREATED_BINDING_KEY_1)
    async handleAlarmCreated_1(@Payload() data: any, @Ctx() context: RmqContext) {
        const channel = context.getChannelRef();
        const originalMsg = context.getMessage();

        try {
            this.logger.log(`📨 Received alarm.created_1 event: ${JSON.stringify(data)}`);

            // Update the materialized view (read model)
            await this.alarmMessageHandler.handle(data)

            this.logger.log(`✅ Materialized view updated for alarm: ${data.alarmId}`);

            // Acknowledge the message
            channel.ack(originalMsg);
        } catch (error) {
            this.logger.error(`❌ Error processing alarm.created: ${error.message}`, error.stack);

            // Reject and don't requeue (send to DLQ if configured)
            // Use true as 3rd param to requeue on failure
            channel.nack(originalMsg, false, false);
        }
    }

    @EventPattern(ALARM_TOPIC_EVENT_PATTERNS)
    async handleAlarmCreated_topic(
        @Payload() data: any,
        @Ctx() context: RmqContext,
    ) {
        const channel = context.getChannelRef();
        const msg = context.getMessage();

        try {
            // this.logger.log(`📨 Received alarm.topic event (${msg.fields.routingKey}): ${JSON.stringify(data)}`);
            this.logger.log(`📢 Received topic event (Queue: ${msg.fields.consumerTag}): ${JSON.stringify(data)}`);
            await this.alarmMessageHandler.handle(data);
            this.logger.log(`✅ Materialized view updated for alarm (topic): ${data.id}`);
            channel.ack(msg);
        } catch (e) {
            this.logger.error(`❌ Error processing alarm.topic: ${e.message}`, e.stack);
            channel.nack(msg, false, false);
        }
    }

    @MessagePattern(ALARM_FANOUT_BINDING_KEY)
    async handleAlarmCreated_fanout(@Payload() data: any, @Ctx() context: RmqContext) {
        const channel = context.getChannelRef();
        const msg = context.getMessage();

        try {
            this.logger.log(`📢 Received fanout event (Queue: ${msg.fields.consumerTag}): ${JSON.stringify(data)}`);
            channel.ack(msg);
        } catch (e) {
            this.logger.error(`❌ Error processing fanout event: ${e.message}`, e.stack);
            channel.nack(msg, false, false);
        }
    }
    @EventPattern({}) // Header exchanges match on headers, so the pattern is empty
    async handleAlarmCreated_header(@Payload() data: any, @Ctx() context: RmqContext) {
        const channel = context.getChannelRef();
        const msg = context.getMessage();

        try {
            this.logger.log(`🎩 Received headers event (Headers: ${JSON.stringify(msg.properties.headers)}): ${JSON.stringify(data)}`);
            await this.alarmMessageHandler.handle(data);
            this.logger.log(`✅ Materialized view updated for alarm (header): ${data.id}`);
            channel.ack(msg);
        } catch (e) {
            this.logger.error(`❌ Error processing headers event: ${e.message}`, e.stack);
            channel.nack(msg, false, false);
        }
    }



}