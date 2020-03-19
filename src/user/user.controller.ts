import { ClassSerializerInterceptor, Controller, Get, Param, ParseIntPipe, UseInterceptors } from '@nestjs/common';
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

    @Get('/:id')
    @UseInterceptors(ClassSerializerInterceptor)
    @ApiResponse({ status: 200, description: 'Object of user', type: User })
    async getUserById(@Param('id', ParseIntPipe) id: number): Promise<User> {
        return await this.userService.getUserById(id);
    }
}
