import { Module } from '@nestjs/common';
import { IssuesModule } from './issues/issues.module';
import { TypeOrmModule } from '@nestjs/typeorm';
//import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';

@Module({
  imports: [IssuesModule,TypeOrmModule.forRoot(), UserModule],
})
export class AppModule {}
