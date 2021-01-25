import { Module } from '@nestjs/common';
import { IssuesModule } from './issue/issue.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

import {
  DATABASE_HOST,
  DATABASE_USERNAME,
  DATABASE_PORT,
  DATABASE_PASSWORD,
  DATABASE_NAME,
} from './config/constants';
import { ProjectModule } from './project/project.module';
import { ProjectService } from './project/project.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'mysql',
        host: config.get<string>(DATABASE_HOST),
        port: parseInt(config.get<string>(DATABASE_PORT)),
        username: config.get<string>(DATABASE_USERNAME),
        password: config.get<string>(DATABASE_PASSWORD),
        database: config.get<string>(DATABASE_NAME),
        entities: [__dirname + '.**/**/*entity{.ts,.js}'],
        autoLoadEntities: true,
        synchronize: true,
        logging: true,
        logger: 'file',
      }),
      //config.get<TypeOrmModuleOptions>(TYPEORM_CONFIG),
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    UsersModule,
    IssuesModule,
    UsersModule,
    AuthModule,
    ProjectModule
  ]
})
export class AppModule { }
