import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt'
import { UsersModule } from 'src/user/user.module';
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller';
import { LocalStrategy, JwtStrategy } from './strategies';
import { ConfigService } from '@nestjs/config';
import { JWT_SECRET } from '../config/constants'

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>(JWT_SECRET),
        signOptions: { expiresIn: '60m' }
      })
    }),
    UsersModule
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy]
})
export class AuthModule { }
