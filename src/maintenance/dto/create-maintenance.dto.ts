import { ArrayNotEmpty, IsArray, IsDate, IsDateString, IsEnum, IsNotEmpty, IsUUID } from "class-validator"
import { MaintenanceType } from "../enums/maintenance-type.enum"
import { MaintenanceStatus } from "../enums/maintenance-status.enum"

export class CreateMaintenanceDto {

    @IsNotEmpty()
    description: string

    @IsDateString()
    dateMaintenance: Date

    @IsEnum(MaintenanceType)
    type: MaintenanceType

    @IsNotEmpty()
    @IsUUID()
    machine_id: string

    @IsEnum(MaintenanceStatus)
    status?: MaintenanceStatus 
    
    @IsArray()
    @ArrayNotEmpty()
    @IsUUID('4', { each: true })
    techinician_ids: string[]
}
