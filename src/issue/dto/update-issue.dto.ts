import { PartialType, OmitType } from '@nestjs/mapped-types';
import { CreateIssueDto } from './create-issue.dto';
import { IsNumber, IsOptional } from 'class-validator';
import { RelationId } from 'typeorm';

export class UpdateIssueDto extends PartialType(CreateIssueDto) {

}
