import { Injectable } from '@nestjs/common';
import { CreateAlarmCommand } from './commands/create-alarm.command';
import { AlarmFactory } from '../domain/factories/alarm-factories';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetAlarmsQuery } from './quries/get-alarms.query';

@Injectable()
export class AlarmsService {
  constructor(
    private readonly commandBus:CommandBus,
    private readonly queryBus:QueryBus
  ) { }
  async create(createAlarmDto: CreateAlarmCommand) {
    return this.commandBus.execute(createAlarmDto)
  }

  findAll() {
    return this.queryBus.execute(new GetAlarmsQuery());
  }

}
