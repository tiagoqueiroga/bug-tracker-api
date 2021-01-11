import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { IssuesService } from './issues.service';
import { CreateIssueDto } from './dto/create-issue.dto';
import { UpdateIssueDto } from './dto/update-issue.dto';
import { StandardResponse } from '../common/entities/responses.entity'


@Controller('issues')
export class IssuesController {
  constructor(private readonly issuesService: IssuesService) { }

  @Post()
  async create(@Body() createIssueDto: CreateIssueDto): Promise<StandardResponse> {
    const data = await this.issuesService.create(createIssueDto);
    return {
      message: `Issue has been created.`,
      data: data
    }
  }

  @Get()
  async findAll(): Promise<StandardResponse> {
    const data = await this.issuesService.findAll();
    return { data };
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<StandardResponse> {
    const data = await this.issuesService.findOne(+id);
    return {
      data
    }
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateIssueDto: UpdateIssueDto,
  ): Promise<StandardResponse> {
    const data = await this.issuesService.update(+id, updateIssueDto);
    return {
      message: "Issue has been updated",
      data
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<StandardResponse> {
    const data = await this.issuesService.remove(+id);
    return {
      message: "Issue has been updated",
      data
    }
  }
}
