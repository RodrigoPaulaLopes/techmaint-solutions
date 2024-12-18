import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./users/entities/user.entity"
import { CreateUserTable1734484740789 } from "./migration/1734484740789-CreateUserTable"
import { AddResetPasswordFieldsToUserTable1734494391951 } from "./migration/1734494391951-AddResetPasswordFieldsToUserTable"


export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "admin",
    password: "Admin@1234!",
    database: "techmaint_solutions",
    synchronize: true,
    logging: true,
    entities: [User],
    migrations: [CreateUserTable1734484740789, AddResetPasswordFieldsToUserTable1734494391951],


})
