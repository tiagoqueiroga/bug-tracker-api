import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Project } from "./entities/project.entity";
import { Repository } from 'typeorm';
import { Project as ProjectEntity } from "./entities/project.entity"
import { CreateProjectDto } from "./dto/create-project.dto"
import { User as UserEntity } from 'src/user/entities/user.entity'
import { UpdateProjectDto } from "./dto/update-project.dto";
import { Issue } from "../issue/entities/issue.entity"
import { IssueService } from "../issue/issue.service"

@Injectable()
export class ProjectService {
    private resourceName = 'Project';

    constructor(
        @InjectRepository(Project)
        private readonly projectRepository: Repository<Project>
    ) { }

    async create(createProjectDto: CreateProjectDto, user: UserEntity): Promise<Project> {
        const project = this.projectRepository.create({ ...createProjectDto });
        project.created_by = user
        return await this.projectRepository.save(project);
    }

    async findAll(): Promise<Project[]> {
        return await this.projectRepository.find({ relations: ["created_by"] });
    }

    async findOne(id: number): Promise<Project> {
        const project = await this.projectRepository.findOne(id, { relations: ["created_by", "issues"] });
        if (!project) {
            throw new NotFoundException(
                `${this.resourceName} does not exist or unauthorized`,
            );
        }
        return project;
    }

    async update(id: number, updateProjectDto: UpdateProjectDto): Promise<Project> {
        const project = await this.findOne(id);

        if (!project) {
            throw new NotFoundException(`${this.resourceName} does not exist`);
        }

        const editedProject = Object.assign(project, updateProjectDto);
        return await this.projectRepository.save(editedProject);
    }

    async remove(id: number): Promise<Project> {
        const project = await this.findOne(id);
        return await this.projectRepository.remove(project);
    }

    async getIssuesByProjectId(id: number): Promise<Issue[]> {
        return []
    }


}

