import { Controller, Get, Post } from '@nestjs/common';

@Controller('auth')
export class AuthController {
    @Post('login')
    login() {
        return 'AUTHTENTICATED 2'
    }

    @Get('profile')
    profile() {
        return "User data"
    }
}
