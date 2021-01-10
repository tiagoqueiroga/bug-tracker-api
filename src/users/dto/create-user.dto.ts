import {
  IsEmail,
  IsString,
  Length,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
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
