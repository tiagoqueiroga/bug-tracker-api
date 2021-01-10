import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { compare } from 'bcrypt';
import { User } from 'src/users/entities/user.entity';
import { JwtService } from '@nestjs/jwt'
import { User as UserEntity } from 'src/users/entities/user.entity'

@Injectable()
export class AuthService {

    constructor(
        private readonly userService: UsersService,
        private readonly jwtService: JwtService
    ) {

    }

    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.userService.findByEmail({ email });

        if (user && await compare(password, user.password)) {
            delete user.password
            return user;
        }

        return null;
    }

    login(user: User) {
        const { id, ...rest } = user;
        const payload = { sub: id }

        return {
            ...rest,
            accessToken: this.jwtService.sign(payload)
        }
    }

    // async getUserProfile(user: UserEntity) {
    //     return await {
    //         message: "message",
    //         data: user
    //     }
    // }

}
