import { DynamicModule, Module, Type } from '@nestjs/common';
import { AlarmsService } from './alarms.service';
import { AlarmsController } from '../presenters/http/alarms.controller';
import { AlarmFactory } from '../domain/factories/alarm-factories';
import { AlarmsInfrastructureModule } from '../infrustructure/alarms-infrastructure.module';
import { CreateAlarmCommandHandler } from './commands/create-alarm.command-handler';
import { GetAlarmsQueryHandler } from './quries/get-alarms.query-handler';
import { AlarmCreatedEventHandler } from './event-handlers/alarm-created.event-handler';

@Module({
  controllers: [AlarmsController],
  providers: [AlarmsService,AlarmFactory,CreateAlarmCommandHandler,GetAlarmsQueryHandler,AlarmCreatedEventHandler],
})
export class AlarmsModule {
  static withInfrastructure(infrastructureModule:Type|DynamicModule){
    return{
      module:AlarmsModule,
      imports:[infrastructureModule]
    }
  }
}
