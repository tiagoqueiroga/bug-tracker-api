import { Controller, Post, UseGuards } from '@nestjs/common';
import { User, Auth } from 'src/common/decorators'
import { User as UserEntity } from 'src/user/entities/user.entity'
import { LocalAuthGuard } from './guards/index'
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { StandardResponse } from '../common/entities/responses.entity'

@ApiTags('Auth routes')
@Controller('auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService
    ) { }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@User() user: UserEntity): Promise<StandardResponse> {
        const data = await this.authService.login(user)
        return {
            message: 'Logged in successfully',
            data
        }
    }

    @Auth()
    @Post('refresh')
    async refreshToken(@User() user): Promise<StandardResponse> {
        return {
            message: "Token has been refreshed successfully",
            data: await this.authService.login(user)
        }
    }
}
