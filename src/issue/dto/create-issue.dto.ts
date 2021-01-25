import { IsBoolean, IsNumber, IsObject, IsString } from 'class-validator';
import { RelationId } from 'typeorm';
import { User } from "../../user/entities/user.entity"
import { Project } from 'src/project/entities/project.entity';


export class CreateIssueDto {
  @IsString()
  title: string

  @IsString()
  description: string

  @IsNumber()
  created_by: User

  @IsNumber()
  project: Project

  @IsBoolean()
  active?: boolean

}
