import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { FindAlarmsRepository } from "src/alarms/application/ports/find-alarms.repository";
import { AlarmReadModel } from "src/alarms/domain/read-models/alarm.read-model";
import { MaterializedAlarmView } from "../schemas/materialized-alarm-view.schema";
import { Model } from "mongoose";
import { InjectRepository } from "@nestjs/typeorm";
import { Like, Repository } from "typeorm";
import { AlarmEntity } from "../entities/alarm.entity";
import { GetAlarmsQuery } from "src/alarms/application/quries/get-alarms.query";
import { AlarmPaginationModel } from "src/alarms/domain/read-models/alarm.pagination-model";

@Injectable()
export class OrmFindAlarmsRepository implements FindAlarmsRepository {
    constructor(
        // @InjectModel(MaterializedAlarmView.name) private readonly alarmModel:Model<MaterializedAlarmView>
        @InjectRepository(AlarmEntity)
        private readonly alarmRepository: Repository<AlarmEntity>,
    ) { }
    async findAll(query: GetAlarmsQuery): Promise<AlarmPaginationModel> {

        const { page, itemsPerPage, search = "" } = query;

        const skip = (page - 1) * itemsPerPage;

        // const qb = this.alarmRepository
        //     .createQueryBuilder("alarm")
        //     .leftJoinAndSelect("alarm.items", "items")
        //     .skip(skip)
        //     .take(itemsPerPage);

        // if (search) {
        //     qb.where("alarm.name ILIKE :search", {
        //         search: `%${search}%`,
        //     });
        // }

        // const [items, totalItems] = await qb.getManyAndCount();

        const [items, totalItems] = await this.alarmRepository.findAndCount({
            relations: {
                items: true,
            },
            where: search
                ? {
                    name: Like(`%${search}%`),
                }
                : {},
            order: {
                triggeredAt: "DESC",
            },
            skip,
            take: itemsPerPage,
        })

        const totalPages = Math.ceil(totalItems / itemsPerPage);

        return {
            items,
            pagination: {
                totalPages,
                totalItems,
                currentPage: page,
                itemsPerPage,
            },
        };
    }
}