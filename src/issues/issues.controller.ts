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

@Controller('issues')
export class IssuesController {
  constructor(private readonly issuesService: IssuesService) {}

  @Post()
  async create(@Body() createIssueDto: CreateIssueDto) {
    return this.issuesService.create(createIssueDto);
  }

  @Get()
  async findAll() {
    const data = await this.issuesService.findAll();
    return { data };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.issuesService.findOne(+id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateIssueDto: UpdateIssueDto,
  ) {
    return await this.issuesService.update(+id, updateIssueDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.issuesService.remove(+id);
  }
}
