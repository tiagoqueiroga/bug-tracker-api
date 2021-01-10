import { Module } from '@nestjs/common';
import { IssuesModule } from './issues/issues.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env'
    }),
    UsersModule,
    IssuesModule,
    UsersModule
  ],
})
export class AppModule {}
