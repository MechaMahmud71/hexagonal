import { Injectable } from "@nestjs/common";
import { AlarmSeverity } from "../value-objects/alarm-serverity";
import { randomUUID } from "crypto";
import { Alarm } from "../alarm";
import { AlarmItem } from "../alarm-item";

@Injectable()
export class AlarmFactory {
    public create(
        name: string,
        severity: AlarmSeverity['value'],
        triggeredAt: Date,
        items: Array<{
            name:string,
            type:string
        }>) {
        const id = randomUUID();
        const serverity = new AlarmSeverity(severity);
        const alarm= new Alarm(id);
        alarm.name=name;
        alarm.severity=serverity;
        alarm.triggeredAt=triggeredAt;
        for(let i=0;i<items.length;i++){
            alarm.addAlarmItem(new AlarmItem(randomUUID(),items[i].name,items[i].type))
        }
        return alarm;
    }
}