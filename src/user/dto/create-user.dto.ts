import {
  IsEmail,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Unique } from 'typeorm';

@Unique(['email'])
export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(5)
  @MaxLength(255)
  fullname: string;

  @IsString()
  @MinLength(8)
  @MaxLength(128)
  password: string;
}
