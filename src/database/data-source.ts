import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "../users/entities/user.entity"
import { CreateUserTable1734484740789 } from "./migration/1734484740789-CreateUserTable"
import { AddResetPasswordFieldsToUserTable1734494391951 } from "./migration/1734494391951-AddResetPasswordFieldsToUserTable"
import { CreateMachinesTable1734580324911 } from "./migration/1734580324911-createMachinesTable"
import { Machine } from "../machines/entities/machine.entity"
import { CreateMaintenanceTable1735001889586 } from "./migration/1735001889586-CreateMaintenanceTable"
import { CreateTechnicianMaintenanceTable1735003468086 } from "./migration/1735003468086-CreateTechnicianMaintenanceTable"
import { CreateForeignKeyMachineIdOnMaintenanceTable1735003632729 } from "./migration/1735003632729-CreateForeignKeyMachineIdOnMaintenanceTable"
import { CreateForeignKeyTechnicianIdAndMaintenanceId1735003794861 } from "./migration/1735003794861-CreateForeignKeyTechnicianIdAndMaintenanceId"
import { Maintenance } from "../maintenance/entities/maintenance.entity"


export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "admin",
    password: "Admin@1234!",
    database: "techmaint_solutions",
    synchronize: true,
    logging: true,
    entities: [User, Machine, Maintenance],
    migrations: [
        CreateUserTable1734484740789, 
        AddResetPasswordFieldsToUserTable1734494391951, 
        CreateMachinesTable1734580324911, 
        CreateMaintenanceTable1735001889586, 
        CreateTechnicianMaintenanceTable1735003468086,
        CreateForeignKeyMachineIdOnMaintenanceTable1735003632729,
        CreateForeignKeyTechnicianIdAndMaintenanceId1735003794861
    ],


})
