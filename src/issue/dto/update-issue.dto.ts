import { PartialType, OmitType } from '@nestjs/mapped-types';
import { CreateIssueDto } from './create-issue.dto';
import { IsOptional } from 'class-validator';

export class UpdateIssueDto extends PartialType(CreateIssueDto) {
    @IsOptional()
    created_by: number
}
