import { Module } from '@nestjs/common';
import { MachinesService } from './machines.service';
import { MachinesController } from './machines.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Machine } from './entities/machine.entity';
import { TokenGuard } from '../guards/token/token.guard';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';


@Module({
  imports: [TypeOrmModule.forFeature([Machine]), UsersModule, JwtModule],
  controllers: [MachinesController],
  providers: [MachinesService, TokenGuard],
})
export class MachinesModule {}
