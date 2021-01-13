import { IsBoolean, IsString } from 'class-validator';

export class CreateProjectDto {
    @IsString()
    title: string

    @IsString()
    description: string

    @IsBoolean()
    active?: boolean
}
