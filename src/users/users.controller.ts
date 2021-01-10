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

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    let data = await this.usersService.create(createUserDto);
    delete data.password;
    return { message: `User created`, data };
  }

  @Get()
  async findAll() {
    const data = await this.usersService.findAll();
    return data;
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const data = await this.usersService.update(+id, updateUserDto);
    return { message: `User updated`, data };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const data = await this.usersService.remove(+id);
    return { message: `User deleted`, data };
  }
}
