import { AlarmReadModel } from "./alarm.read-model"

export class AlarmPaginationModel {
  items: Array<AlarmReadModel>
  pagination?:{
    totalPages:number,
    totalItems:number,
    currentPage:number,
    itemsPerPage:number
  }
}