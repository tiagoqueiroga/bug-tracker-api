import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Issue } from 'src/issue/entities/issue.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Issue])],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UsersModule { }
