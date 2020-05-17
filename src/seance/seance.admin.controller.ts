import {
    Body,
    ClassSerializerInterceptor,
    Controller, Delete, HttpCode, Param, ParseIntPipe,
    Post,
    SetMetadata, UseGuards,
    UseInterceptors,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import { SeanceService } from './seance.service';
import { SeanceDto } from './dto/seance.dto';
import { Seance } from './seance.entity';
import { UserRole } from '../user/user-role.enum';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { RolesGuard } from '../auth/roles.gurad';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(new RolesGuard(new Reflector()))
@UseGuards(AuthGuard())
@Controller('/admin/seances')
@ApiTags('Admin seance')
export class SeanceAdminController {
    constructor(private seanceService: SeanceService) {}

    @Post()
    @SetMetadata('roles', [UserRole.ADMIN])
    @UseInterceptors(ClassSerializerInterceptor)
    @UsePipes(ValidationPipe)
    @ApiResponse({ status: 201, description: 'Created resource' })
    async create(@Body() seanceDto: SeanceDto): Promise<Seance> {
        return await this.seanceService.create(seanceDto);
    }

    @Delete('/:id')
    @HttpCode(204)
    @SetMetadata('roles', [UserRole.ADMIN])
    @ApiResponse({ status: 204, description: 'Deleted seance' })
    @ApiResponse({ status: 404, description: 'Not found id' })
    async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return await this.seanceService.delete(id);
    }
}
