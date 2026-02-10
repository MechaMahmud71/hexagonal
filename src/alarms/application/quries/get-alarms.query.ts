export class GetAlarmsQuery {
    constructor(
        public readonly page: number,
        public readonly itemsPerPage: number,
        public readonly search: string
    ) { }
}