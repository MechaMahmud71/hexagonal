// src/alarms/infrastructure/queues/rabbitmq/alarm-message.consumer.ts
import { Controller, Logger } from '@nestjs/common';
import { EventPattern, Payload, Ctx, RmqContext, MessagePattern } from '@nestjs/microservices';
import { AlarmMessageHander } from 'src/alarms/application/event-handlers/alarm.message-handler';

@Controller()
export class RabbitMqAlarmMessageConsumer {
    private readonly logger = new Logger(RabbitMqAlarmMessageConsumer.name);

    constructor(
        private readonly alarmMessageHandler: AlarmMessageHander,
    ) { }

    @MessagePattern('alarm.created')
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
    @MessagePattern('alarm.created_1')
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

    @MessagePattern('alarm.save.topic')
    async handleAlarmCreated_2(@Payload() data: any, @Ctx() context: RmqContext) {
        const channel = context.getChannelRef();
        const originalMsg = context.getMessage();

        try {
            this.logger.log(`📨 Received alarm.save.topic event: ${JSON.stringify(data)}`);

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

}