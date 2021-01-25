import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { IssueService } from './issue.service';
import { CreateIssueDto } from './dto/create-issue.dto';
import { UpdateIssueDto } from './dto/update-issue.dto';
import { StandardResponse } from '../common/entities/responses.entity'
import { Auth, User } from 'src/common/decorators'
import { User as UserEntity } from 'src/user/entities/user.entity'


@Controller('issue')
export class IssueController {
  constructor(private readonly issuesService: IssueService) { }

  @Auth()
  @Post()
  async create(@User() user: UserEntity, @Body() createIssueDto: CreateIssueDto): Promise<StandardResponse> {
    const data = await this.issuesService.create(createIssueDto, user);
    return {
      message: `Issue has been created.`,
      data: data
    }
  }

  @Auth()
  @Get()
  async findAll(): Promise<StandardResponse> {
    const data = await this.issuesService.findAll();
    return { data };
  }

  @Auth()
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<StandardResponse> {
    const data = await this.issuesService.findOne(+id);
    return {
      data
    }
  }

  @Auth()
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateIssueDto: UpdateIssueDto
  ): Promise<StandardResponse> {
    const data = await this.issuesService.update(+id, updateIssueDto);
    return {
      message: "Issue has been updated",
      data
    }
  }

  @Auth()
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<StandardResponse> {
    const data = await this.issuesService.remove(+id);
    return {
      message: "Issue has been deleted",
      data
    }
  }
}
