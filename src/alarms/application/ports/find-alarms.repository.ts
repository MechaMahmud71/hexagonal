import { AlarmPaginationModel } from 'src/alarms/domain/read-models/alarm.pagination-model';
import { AlarmReadModel } from '../../domain/read-models/alarm.read-model';
import { GetAlarmsQuery } from '../quries/get-alarms.query';

export abstract class FindAlarmsRepository {
  abstract findAll(getAlarmQuery:GetAlarmsQuery): Promise<AlarmPaginationModel>
}
