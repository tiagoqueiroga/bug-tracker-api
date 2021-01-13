import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { NotFoundException } from '@nestjs/common';
import { Issue } from 'src/issue/entities/issue.entity';

export interface UserFindOne {
  id?: number;
  email: string;
}

@Injectable()
export class UserService {

  private resourceName = 'User';

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Issue)
    private readonly issueRepository: Repository<Issue>,
  ) { }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const userExisted = await this.userRepository.findOne({
      email: createUserDto.email,
    });
    if (userExisted)
      throw new BadRequestException(`E-mail address is already registered`);

    const user = this.userRepository.create({ ...createUserDto });
    return await this.userRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOne(id);
    if (!user) {
      throw new NotFoundException(
        `${this.resourceName} does not exist or unauthorized`,
      );
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);

    if (!user) {
      throw new NotFoundException(`${this.resourceName} does not exist`);
    }

    // E-mail updated ? If so, check if it's already been registered
    if (updateUserDto.email !== user.email) {
      const emailExisted = await this.findByEmail(updateUserDto.email);
      if (emailExisted) {
        throw new BadRequestException(`E-mail address is already registered`);
      }
    }


    const editedUser = Object.assign(user, updateUserDto);
    return await this.userRepository.save(editedUser);
  }

  async remove(id: number): Promise<User> {
    const user = await this.findOne(id);
    return await this.userRepository.remove(user);
  }

  async findByEmail(email: string): Promise<User> {
    return await this.userRepository
      .createQueryBuilder('user')
      .where({ email: email })
      .addSelect('user.password')
      .getOne()
  }

  async getIssuesByUser(userId: number): Promise<Issue[]> {
    return await this.issueRepository
      .createQueryBuilder('issues')
      .where("created_by= :id", { id: userId })
      .getMany()
  }
}
