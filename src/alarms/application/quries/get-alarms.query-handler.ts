import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetAlarmsQuery } from "./get-alarms.query";
import { Alarm } from "src/alarms/domain/alarm";
import { FindAlarmsRepository } from "../ports/find-alarms.repository";
import { AlarmReadModel } from "src/alarms/domain/read-models/alarm.read-model";
import { AlarmPaginationModel } from "src/alarms/domain/read-models/alarm.pagination-model";

@QueryHandler(GetAlarmsQuery)

export class GetAlarmsQueryHandler
  implements IQueryHandler<GetAlarmsQuery,  AlarmPaginationModel>{
    constructor(private readonly alarmRepositry:FindAlarmsRepository){}

    async execute(query: GetAlarmsQuery): Promise<AlarmPaginationModel> {
        return await this.alarmRepositry.findAll(query);
    }
  }