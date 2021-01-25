import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Project } from "./entities/project.entity";
import { ProjectService } from "./project.service";
import { ProjectController } from "./project.controller";
import { Issue } from "../issue/entities/issue.entity"

@Module({
    imports: [TypeOrmModule.forFeature([Project, Issue])],
    controllers: [ProjectController],
    providers: [ProjectService],
})
export class ProjectModule {
}