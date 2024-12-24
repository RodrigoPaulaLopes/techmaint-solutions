import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import {TypeOrmModule} from '@nestjs/typeorm'
import { User } from './users/entities/user.entity';
import { AuthenticationModule } from './authentication/authentication.module';
import { EmailModule } from './email/email.module';
import { MachinesModule } from './machines/machines.module';
import { Machine } from './machines/entities/machine.entity';
import { MaintenanceModule } from './maintenance/maintenance.module';
import { Maintenance } from './maintenance/entities/maintenance.entity';
@Module({
  imports: [UsersModule, TypeOrmModule.forRoot({
    type: 'postgres',
    port: 5432,
    host: "localhost",
    username: "admin",
    password: "Admin@1234!",
    database: "techmaint_solutions",
    entities: [User, Machine, Maintenance],
    synchronize: false
  }), AuthenticationModule, MachinesModule, MaintenanceModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
