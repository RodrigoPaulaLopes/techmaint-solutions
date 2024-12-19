import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import {TypeOrmModule} from '@nestjs/typeorm'
import { User } from './users/entities/user.entity';
import { AuthenticationModule } from './authentication/authentication.module';
import { EmailModule } from './email/email.module';
import { MachinesModule } from './machines/machines.module';
@Module({
  imports: [UsersModule, TypeOrmModule.forRoot({
    type: 'postgres',
    port: 5432,
    host: "localhost",
    username: "admin",
    password: "Admin@1234!",
    database: "techmaint_solutions",
    entities: [User],
    synchronize: false
  }), AuthenticationModule, MachinesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
