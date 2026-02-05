import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AlarmsService } from '../../application/alarms.service';
import { CreateAlarmCommand } from 'src/alarms/application/commands/create-alarm.command';
import { CreateAlarmDto } from './dto/create-alarm.dto';
import { AlarmSeverity } from 'src/alarms/domain/value-objects/alarm-serverity';

@Controller('alarms')
export class AlarmsController {
  constructor(private readonly alarmsService: AlarmsService) {}

  @Post()
  create(@Body() createAlarmDto: CreateAlarmDto) {
    return this.alarmsService.create(
      new CreateAlarmCommand(
        createAlarmDto.name,
        createAlarmDto.severity as AlarmSeverity['value'],
        createAlarmDto.triggeredAt,
        createAlarmDto.items
      )
    );
  }

  @Get()
  findAll() {
    return this.alarmsService.findAll();
  }
}
