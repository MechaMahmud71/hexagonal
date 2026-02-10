import { Alarm } from "src/alarms/domain/alarm";

export abstract class AlarmEventPublisher {
    abstract publishAlarmCreated(alarm: Alarm): Promise<void>;
    abstract publishAlarmAcknowledged(alarmId: string): Promise<void>;
}