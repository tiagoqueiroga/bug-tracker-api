import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { User, Auth } from 'src/common/decorators'
import { User as UserEntity } from 'src/users/entities/user.entity'
import { LocalAuthGuard, JwtAuthGuard } from './guards/index'
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';


@ApiTags('Auth routes')
@Controller('auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService
    ) { }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@User() user: UserEntity) {
        const data = await this.authService.login(user)
        return {
            message: 'Logged in successfully',
            data
        }
    }

    @Auth()
    @Post('refresh')
    async refreshToken(@User() user): Promise<any> {
        return {
            message: "Token has been refreshed successfully",
            data: await this.authService.login(user)
        }
    }

    @Auth()
    @Get('profile')
    async profile(@User() user) {
        return {
            message: "User profile",
            data: user
        }
    }
}
