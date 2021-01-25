import { Controller } from "@nestjs/common";
import {
    Get,
    Post,
    Body,
    Put,
    Param,
    Delete,
} from '@nestjs/common';
import { User as UserEntity } from 'src/user/entities/user.entity'
import { StandardResponse } from '../common/entities/responses.entity'
import { ProjectService } from "./project.service";
import { CreateProjectDto } from "./dto/create-project.dto";
import { Auth, User } from 'src/common/decorators'
import { UpdateProjectDto } from "./dto/update-project.dto";
import { IssueService } from "src/issue/issue.service";

@Controller("project")
export class ProjectController {

    constructor(
        public readonly projectService: ProjectService
    ) {
    }

    @Auth()
    @Get()
    async findAll(): Promise<StandardResponse> {
        const data = await this.projectService.findAll();
        return { data };
    }

    @Auth()
    @Post()
    async create(@User() user: UserEntity, @Body() createProjectDto: CreateProjectDto): Promise<StandardResponse> {
        const data = await this.projectService.create(createProjectDto, user);
        return {
            message: `Project has been created.`,
            data: data
        }
    }

    @Auth()
    @Get(':id')
    async findOne(@Param('id') id: string): Promise<StandardResponse> {
        const data = await this.projectService.findOne(+id);
        return {
            data
        }
    }

    @Auth()
    @Put(':id')
    async update(
        @Param('id') id: string,
        @Body() updateProjectDto: UpdateProjectDto
    ): Promise<StandardResponse> {
        const data = await this.projectService.update(+id, updateProjectDto);
        return {
            message: "Project has been updated",
            data
        }
    }

    @Auth()
    @Delete(':id')
    async remove(@Param('id') id: string): Promise<StandardResponse> {
        const data = await this.projectService.remove(+id);
        return {
            message: "Project has been deleted",
            data
        }
    }


    @Auth()
    @Get(':id/issues')
    async issues(@User() user, @Param('id') id: number): Promise<StandardResponse> {
        const data = await (await this.projectService.findOne(id)).issues
        return {
            data: data
        }
    }

}