import { DynamicModule, Module, Type } from "@nestjs/common";
import { OrmAlarmPersistenceModule } from "./persistance/orm/orm-persistance.module";
import { InMemoryAlarmPersistenceModule } from "./persistance/in-memory/in-memory-persistence.module";
import { RabbitMqAlarmEventPublisher } from "./queues/rabbitmq/publishers/alarm.publisher";
import { AlarmEventPublisher } from "../application/ports/alarm-event-publisher";
import { RabbitMqModule } from "./queues/rabbitmq/rabbitmq.module";
import { AlarmMessageHander } from "../application/event-handlers/alarm.message-handler";
import { RabbitMqAlarmMessageConsumer } from "./queues/rabbitmq/consumers/alarm.consumer";
import { ALARM_SERVICE, ALARM_SERVICE_NEW, ALARM_TOPIC_SERVICE } from "src/common/interfaces/constants";

@Module({})
export class AlarmsInfrastructureModule {
    static use(driver: 'orm' | 'in-memory'): DynamicModule {
        const persistanceModule = driver === "orm" ? OrmAlarmPersistenceModule : InMemoryAlarmPersistenceModule

        const imports: Array<Type<any> | DynamicModule> = [persistanceModule];

        imports.push(
            RabbitMqModule.register({
                serviceName: ALARM_SERVICE,
                queueName: 'alarms_queue',
                exchangeName: 'alarms_exchange',
                routingKey: 'alarm.created',
                url: 'amqp://localhost:5672',
                exchangeType: 'direct',
                // bindingKey: 'alarm.created',
            }),
            RabbitMqModule.register({
                serviceName: ALARM_SERVICE_NEW,
                queueName: 'alarms_queue_1',
                exchangeName: 'alarms_exchange',
                routingKey: 'alarms.created_1',
                url: 'amqp://localhost:5672',
                exchangeType: 'direct'
            }),
            RabbitMqModule.register({
                serviceName: ALARM_TOPIC_SERVICE,
                queueName: 'alarms_queue_2',
                exchangeName: 'alarms_topic_exchange',
                url: 'amqp://localhost:5672',
                exchangeType: 'topic',
            })
        )

        return {
            module: AlarmsInfrastructureModule,
            imports,
            controllers: [RabbitMqAlarmMessageConsumer],
            providers: [
                AlarmMessageHander,
                {
                    provide: AlarmEventPublisher,
                    useClass: RabbitMqAlarmEventPublisher
                }
            ],
            exports: [persistanceModule, AlarmEventPublisher]
        }
    }
}