import { IsBoolean, IsNumber, IsObject, IsString } from 'class-validator';
import { User } from "../../users/entities/user.entity"


export class CreateIssueDto {
  @IsString()
  title: string

  @IsString()
  description: string

  @IsBoolean()
  active?: boolean
}
