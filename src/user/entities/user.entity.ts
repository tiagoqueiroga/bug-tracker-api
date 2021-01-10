import { Entity, Column, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { Length,IsEmail } from 'class-validator';

@Entity()
@Unique(["email"])
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsEmail()
  email: string;

  @Column()
  fullname: string;

  @Column({ default: true })
  is_active: boolean;
}