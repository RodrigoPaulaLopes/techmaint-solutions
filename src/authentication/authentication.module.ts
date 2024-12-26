import { Module } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { AuthenticationController } from './authentication.controller';
import { UsersModule } from '../users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { EmailModule } from '../email/email.module';
import { EmailService } from '../email/email.service';
import { ConfigModule, ConfigService } from '@nestjs/config'; // Importe o ConfigModule e ConfigService

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.registerAsync({
      imports: [ConfigModule], 
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'), 
        signOptions: { expiresIn: '3600s' },
      }),
    }),
    EmailModule,
    JwtModule,
    ConfigModule.forRoot({
      isGlobal: true, 
      envFilePath: '.env',
    }),
  ],
  controllers: [AuthenticationController],
  providers: [AuthenticationService],
})
export class AuthenticationModule {}
