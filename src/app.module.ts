import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from './users/entities/user.entity';
import { AuthenticationModule } from './authentication/authentication.module';
import { EmailModule } from './email/email.module';
import { MachinesModule } from './machines/machines.module';
import { Machine } from './machines/entities/machine.entity';
import { MaintenanceModule } from './maintenance/maintenance.module';
import { Maintenance } from './maintenance/entities/maintenance.entity';
import { ProfileModule } from './profile/profile.module';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [UsersModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      port: Number(process.env.DB_PORT),
      host: process.env.DB_HOST,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [User, Machine, Maintenance],
      synchronize: false
    }), AuthenticationModule, MachinesModule, MaintenanceModule, ProfileModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
