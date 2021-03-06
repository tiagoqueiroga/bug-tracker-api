/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateIssueDto } from './dto/create-issue.dto';
import { UpdateIssueDto } from './dto/update-issue.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Issue } from './entities/issue.entity';
import { User as UserEntity } from 'src/user/entities/user.entity'

@Injectable()
export class IssueService {
  private resourceName = 'Issue';

  constructor(
    @InjectRepository(Issue)
    private readonly issueRepository: Repository<Issue>,
  ) { }

  async create(createIssueDto: CreateIssueDto, user: UserEntity) {
    const issue = this.issueRepository.create({ ...createIssueDto });
    issue.created_by = user
    return await this.issueRepository.save(issue);
  }

  async findAll() {
    return await this.issueRepository.find({ relations: ["created_by", "project"] });
  }

  async findOne(id: number) {
    const issue = await this.issueRepository.findOne(id, { relations: ["created_by"] });
    if (!issue) {
      throw new NotFoundException(
        `${this.resourceName} does not exist or unauthorized`,
      );
    }
    return issue;
  }

  async update(id: number, updateIssueDto: UpdateIssueDto) {
    const issue = await this.findOne(id);

    if (!issue) {
      throw new NotFoundException(`${this.resourceName} does not exist`);
    }

    const editedIssue = Object.assign(issue, updateIssueDto);
    return await this.issueRepository.save(editedIssue);
  }

  async remove(id: number) {
    const issue = await this.findOne(id);
    return await this.issueRepository.remove(issue);
  }

  async getIssuesByUser(userId: number) {
    return await this.issueRepository.find({ where: { created_by: userId } })
  }

}
