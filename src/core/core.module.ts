import { DynamicModule } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ApplicationBootstrapOptions } from "src/common/interfaces/application-bootstrap-options.interface";

export class CoreModule {
    static forRoot(options: ApplicationBootstrapOptions) {
        const imports: DynamicModule[] = [];
        if (options.driver === "orm") {
            imports.push(
                TypeOrmModule.forRoot({
                    type: 'postgres',
                    host: 'localhost',
                    port: 5432,
                    username: 'postgres',
                    password: 'postgres',
                    database: 'postgres',
                    entities: [],
                    synchronize: true,
                    autoLoadEntities: true,
                }),
            );
            imports.push(MongooseModule.forRoot('mongodb://localhost:27017/vf-read-db'),)
        }

        return {
            module: CoreModule,
            imports
        }
    }
}