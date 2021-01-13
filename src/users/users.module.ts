import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { IssuesService } from 'src/issues/issues.service';
import { Issue } from 'src/issues/entities/issue.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Issue])],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule { }
