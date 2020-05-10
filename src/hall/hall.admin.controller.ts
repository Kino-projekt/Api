import {
    Body,
    Controller, Delete, HttpCode,
    Param,
    ParseIntPipe,
    Post,
    SetMetadata,
    UseGuards,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import { HallService } from './hall.service';
import { RolesGuard } from '../auth/roles.gurad';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserRole } from '../user/user-role.enum';
import { HallDto } from './dto/hall.dto';
import { Hall } from './hall.entity';

@UseGuards(new RolesGuard(new Reflector()))
@UseGuards(AuthGuard())
@Controller('/admin/halls')
@ApiTags('Admin hall')
export class HallAdminController {
    constructor(private hallService: HallService) {}

    @Post()
    @SetMetadata('roles', [UserRole.ADMIN])
    @UsePipes(ValidationPipe)
    @ApiResponse({ status: 201, description: 'Created resource' })
    async create(@Body() hallDto: HallDto): Promise<Hall> {
        return await this.hallService.create(hallDto);
    }

    @Delete('/:id')
    @HttpCode(204)
    @SetMetadata('roles', [UserRole.ADMIN])
    @ApiResponse({ status: 204, description: 'Deleted hall' })
    @ApiResponse({ status: 404, description: 'Not found id' })
    async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return await this.hallService.delete(id);
    }
}