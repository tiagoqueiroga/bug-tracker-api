import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { NotFoundException } from '@nestjs/common';

export interface UserFindOne {
  id?: number;
  email: string;
}

@Injectable()
export class UsersService {

  private resourceName = 'User';

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }

  async create(createUserDto: CreateUserDto) {
    const userExisted = await this.userRepository.findOne({
      email: createUserDto.email,
    });
    if (userExisted)
      throw new BadRequestException(`E-mail address is already registered`);

    const user = this.userRepository.create({ ...createUserDto });
    return await this.userRepository.save(user);
  }

  async findAll() {
    return await this.userRepository.find();
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOne(id);
    if (!user) {
      throw new NotFoundException(
        `${this.resourceName} does not exist or unauthorized`,
      );
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id);

    if (!user) {
      throw new NotFoundException(`${this.resourceName} does not exist`);
    }

    const editedUser = Object.assign(user, updateUserDto);
    return await this.userRepository.save(editedUser);
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    return await this.userRepository.remove(user);
  }

  async findByEmail(data: UserFindOne) {
    return await this.userRepository
      .createQueryBuilder('user')
      .where(data)
      .addSelect('user.password')
      .getOne()
  }

}
