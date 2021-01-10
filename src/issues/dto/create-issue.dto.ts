import { IsBoolean, IsString, IsDate } from 'class-validator';

export class CreateIssueDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsBoolean()
  active: boolean;
}
