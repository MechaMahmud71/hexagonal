import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { AlarmsService } from '../../application/alarms.service';
import { CreateAlarmCommand } from 'src/alarms/application/commands/create-alarm.command';
import { CreateAlarmDto } from './dto/create-alarm.dto';
import { AlarmSeverity } from 'src/alarms/domain/value-objects/alarm-serverity';
import { GetAlarmsQuery } from 'src/alarms/application/quries/get-alarms.query';

@Controller('alarms')
export class AlarmsController {
  constructor(private readonly alarmsService: AlarmsService) {}

  @Post()
  create(@Body() createAlarmDto: CreateAlarmDto) {
    const command=new CreateAlarmCommand(
        createAlarmDto.name,
        createAlarmDto.severity as AlarmSeverity['value'],
        createAlarmDto.triggeredAt,
        createAlarmDto.items
      )
    return this.alarmsService.create(command);
  }

  @Get()
  findAll(@Query('page') page:string, @Query('itemsPerPage') itemsPerPage:string, @Query('search') search:string) {
    return this.alarmsService.findAll(
      new GetAlarmsQuery(Number(page),Number(itemsPerPage),search)
    );
  }
}
