/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { StandardResponse } from '../common/entities/responses.entity'
import { User, Auth } from 'src/common/decorators'

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Auth()
  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<StandardResponse> {
    const data = await this.usersService.create(createUserDto);
    delete data.password;
    return {
      message: `User created`,
      data
    };
  }

  @Auth()
  @Get('profile')
  async profile(@User() user): Promise<StandardResponse> {
    return { message: `User Profile`, data: user };
  }

  @Auth()
  @Get()
  async findAll(): Promise<StandardResponse> {
    const data = await this.usersService.findAll();
    return {
      data: data
    }
  }

  @Auth()
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<StandardResponse> {
    const data = await this.usersService.findOne(+id);
    return {
      data
    }
  }

  @Auth()
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<StandardResponse> {
    const data = await this.usersService.update(+id, updateUserDto);
    return { message: `User updated`, data };
  }

  @Auth()
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<StandardResponse> {
    const data = await this.usersService.remove(+id);
    return { message: `User deleted`, data };
  }
}
