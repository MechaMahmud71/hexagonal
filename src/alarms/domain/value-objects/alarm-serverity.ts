export class AlarmSeverity{
    constructor(readonly value:'critical'|'high'|'medium'|'low'){}

    public equals(severity:AlarmSeverity){
        return this.value===severity.value
    }
}