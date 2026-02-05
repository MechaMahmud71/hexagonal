import { Module } from "@nestjs/common";
import { OrmAlarmPersistenceModule } from "./persistance/orm/orm-persistance.module";
import { InMemoryAlarmPersistenceModule } from "./persistance/in-memory/in-memory-persistence.module";

@Module({})
export class AlarmsInfrastructureModule {
    static use(driver: 'orm' | 'in-memory') {
        const persistanceModule = driver === "orm" ? OrmAlarmPersistenceModule : InMemoryAlarmPersistenceModule
        return {
            module: AlarmsInfrastructureModule,
            imports: [persistanceModule],
            exports: [persistanceModule]
        }
    }
}