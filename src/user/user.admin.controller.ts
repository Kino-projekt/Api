import {
    Controller, HttpCode, Param, ParseIntPipe, Patch,
    SetMetadata, UseGuards,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { RolesGuard } from '../auth/roles.gurad';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';
import { UserRole } from './user-role.enum';

@UseGuards(new RolesGuard(new Reflector()))
@UseGuards(AuthGuard())
@Controller('/admin/users')
@ApiTags('Admin user')
export class UserAdminController {
    constructor(private userService: UserService) {}

    @Patch('/:id/ban')
    @HttpCode(204)
    @SetMetadata('roles', [UserRole.ADMIN])
    @ApiResponse({ status: 204, description: 'Banned user' })
    @ApiResponse({ status: 403, description: 'Cannot ban ADMIN' })
    @ApiResponse({ status: 404, description: 'Not found id' })
    async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return await this.userService.ban(id);
    }
}
