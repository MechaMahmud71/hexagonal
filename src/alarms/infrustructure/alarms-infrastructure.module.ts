import { DynamicModule, Module, Type } from "@nestjs/common";
import { OrmAlarmPersistenceModule } from "./persistance/orm/orm-persistance.module";
import { InMemoryAlarmPersistenceModule } from "./persistance/in-memory/in-memory-persistence.module";
import { RabbitMqAlarmEventPublisher } from "src/common/adapters/queues/rabbitmq/publishers/alarm.publisher";
import { AlarmEventPublisher } from "../application/ports/alarm-event-publisher";
import { RabbitMqModule } from "src/common/adapters/queues/rabbitmq/rabbitmq.module";
import { AlarmMessageHander } from "../application/event-handlers/alarm.message-handler";
import { RabbitMqAlarmMessageConsumer } from "src/common/adapters/queues/rabbitmq/consumers/alarm.consumer";
import { ALARM_SERVICE, ALARM_SERVICE_NEW, ALARM_TOPIC_SERVICE, ALARM_FANOUT_SERVICE, ALARM_HEADERS_SERVICE } from "src/common/interfaces/constants";
import { ALARMS_EXCHANGE, ALARMS_FANOUT_EXCHANGE, ALARMS_HEADER_EXCHANGE, ALARMS_QUEUE, ALARMS_QUEUE_1, ALARMS_QUEUE_2, ALARMS_QUEUE_FANOUT_1, ALARMS_QUEUE_FANOUT_2, ALARMS_QUEUE_HEADER, ALARMS_TOPIC_EXCHANGE, ALARM_CREATED_BINDING_KEY, ALARM_CREATED_BINDING_KEY_1, ALARM_CREATED_ROUTING_KEY, ALARM_CREATED_ROUTING_KEY_1, ALARM_FANOUT_BINDING_KEY, ALARM_TOPIC_BINDING_KEY_PATTERN } from "src/common/interfaces/rabbitmq.constants";


@Module({})
export class AlarmsInfrastructureModule {
    static use(driver: 'orm' | 'in-memory'): DynamicModule {
        const persistanceModule = driver === "orm" ? OrmAlarmPersistenceModule : InMemoryAlarmPersistenceModule

        const imports: Array<Type<any> | DynamicModule> = [persistanceModule];

        imports.push(
            RabbitMqModule.register({
                serviceName: ALARM_SERVICE,
                queueName: ALARMS_QUEUE,
                exchangeName: ALARMS_EXCHANGE,
                routingKey: ALARM_CREATED_ROUTING_KEY,
                url: 'amqp://localhost:5672',
                exchangeType: 'direct',
                bindingKey: ALARM_CREATED_BINDING_KEY,
            }),
            RabbitMqModule.register({
                serviceName: ALARM_SERVICE_NEW,
                queueName: ALARMS_QUEUE_1,
                exchangeName: ALARMS_EXCHANGE,
                routingKey: ALARM_CREATED_ROUTING_KEY_1,
                url: 'amqp://localhost:5672',
                exchangeType: 'direct',
                bindingKey: ALARM_CREATED_BINDING_KEY_1,
            }),
            RabbitMqModule.register({
                serviceName: ALARM_TOPIC_SERVICE,
                queueName: ALARMS_QUEUE_2,
                exchangeName: ALARMS_TOPIC_EXCHANGE,
                url: 'amqp://localhost:5672',
                exchangeType: 'topic',
                bindingKey: ALARM_TOPIC_BINDING_KEY_PATTERN,
            }),
            RabbitMqModule.register({
                serviceName: ALARM_FANOUT_SERVICE,
                exchangeName: ALARMS_FANOUT_EXCHANGE,
                url: 'amqp://localhost:5672',
                exchangeType: 'fanout',
            }),
            RabbitMqModule.register({
                serviceName: ALARM_HEADERS_SERVICE,
                queueName: ALARMS_QUEUE_HEADER,
                exchangeName: ALARMS_HEADER_EXCHANGE,
                url: 'amqp://localhost:5672',
                exchangeType: 'headers',
                headers: {
                    'x-match': 'all',
                    'category': 'alarm',
                    'priority': 'high'
                }
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