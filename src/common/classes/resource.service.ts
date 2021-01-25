// import { Repository } from "typeorm";
// import { BaseEntity } from "../entities/base.entity"
// import { StandardResponse } from "../entities/responses.entity"
// import { User as UserEntity } from "src/user/entities/user.entity"
// import { BaseCreateDto } from "../dto/base-create.dto"


// export class ResourceService<Entity extends BaseEntity> {

//     constructor(
//         public repository: Repository<Entity>,
//         public createDto: BaseCreateDto
//     ) { }

//     async findAll(): Promise<StandardResponse> {
//         const result = await this.repository.find();
//         return {
//             message: "",
//             data: result
//         }
//     }

//     async create(create: BaseCreateDto, user: UserEntity) {
//         const resource = this.repository.create({ ...create });
//         //resource.created_by = user
//         //return await this.repository.save(resource);
//     }

// }