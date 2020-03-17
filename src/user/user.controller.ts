import { ClassSerializerInterceptor, Controller, Get, UseInterceptors } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { User } from './user.entity';

@Controller('users')
@ApiTags('User')
export class UserController {
    constructor(private userService: UserService) {}

    @Get()
    @UseInterceptors(ClassSerializerInterceptor)
    @ApiResponse({ status: 200, description: 'Array of users objects', type: User })
    async getUsers(): Promise<User[]> {
        return await this.userService.getUsers();
    }
}
