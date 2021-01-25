// import {
//     Controller,
//     Get,
//     Post,
//     Body,
//     Put,
//     Param,
//     Delete,
// } from '@nestjs/common';
// import { StandardResponse } from '../entities/responses.entity'
// import { ResourceService } from "../classes/resource.service"
// import { BaseEntity } from "../entities/base.entity"

// import { Auth, User } from 'src/common/decorators'
// import { User as UserEntity } from 'src/user/entities/user.entity'


// @Controller()
// export abstract class ResourceController {

//     constructor(
//         public readonly title: string,
//         public readonly service: ResourceService<BaseEntity>
//     ) {
//         this.title = title
//     }

//     @Auth()
//     @Get()
//     async findAll(): Promise<StandardResponse> {
//         const data = await this.service.findAll();
//         return {
//             message: `${this.title}`,
//             data
//         };
//     }

//     // @Auth()
//     // @Post()
//     // async create(@User() user: UserEntity, @Body() dtos: any): Promise<StandardResponse> {
//     //     const data = await this.service.create(dtos.create, user);
//     //     return {
//     //         message: `${this.title} has been created.`,
//     //         data: data
//     //     }
//     // }
// }
