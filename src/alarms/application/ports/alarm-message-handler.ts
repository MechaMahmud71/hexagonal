import { AlarmCreatedEvent } from "src/alarms/domain/events/alarm-created.event";

export abstract class AlarmMessageHandler {
    abstract handle(event: AlarmCreatedEvent): Promise<void>;
}