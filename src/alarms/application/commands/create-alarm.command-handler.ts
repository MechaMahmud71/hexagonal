import { CommandHandler, EventBus, ICommandHandler } from "@nestjs/cqrs";
import { CreateAlarmCommand } from "./create-alarm.command";
import { AlarmFactory } from "src/alarms/domain/factories/alarm-factories";
import { CreateAlarmRepository } from "../ports/create-alarm.repository";
import { Logger } from "@nestjs/common";
import { Alarm } from "src/alarms/domain/alarm";
import { AlarmCreatedEvent } from "src/alarms/domain/events/alarm-created.event";
import { AlarmSeverity } from "src/alarms/domain/value-objects/alarm-serverity";

@CommandHandler(CreateAlarmCommand)
export class CreateAlarmCommandHandler implements ICommandHandler<CreateAlarmCommand> {

    private readonly logger = new Logger(CreateAlarmCommandHandler.name);

    constructor(
        private readonly alarmFactory: AlarmFactory,
        private readonly alarmRepository: CreateAlarmRepository,
        private readonly eventBus: EventBus
    ) { }

    async execute(command: CreateAlarmCommand): Promise<Alarm> {
        this.logger.debug(
            `Processing "CreateAlarmCommand": ${JSON.stringify(command)}`,
        );

        const alarm = this.alarmFactory.create(
            command.name,
            command.severity as AlarmSeverity['value'],
            command.triggeredAt,
            command.items,
        );
        const newAlarm = this.alarmRepository.save(alarm);
        this.eventBus.publish(new AlarmCreatedEvent(alarm))
        return newAlarm;
    }
}