import {
    Body,
    Controller,
    Delete,
    HttpCode, Param, ParseIntPipe,
    Post,
    SetMetadata,
    UseGuards,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import { MovieService } from './movie.service';
import { MovieDto } from './dto/movie.dto';
import { RolesGuard } from '../auth/roles.gurad';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserRole } from '../user/user-role.enum';
import { Movie } from './movie.entity';

@UseGuards(new RolesGuard(new Reflector()))
@UseGuards(AuthGuard())
@Controller('/admin/movies')
@ApiTags('Admin movie')
export class MovieAdminController {
    constructor(private movieService: MovieService) {}

    @Post()
    @SetMetadata('roles', [UserRole.ADMIN])
    @UsePipes(ValidationPipe)
    @ApiResponse({ status: 201, description: 'Created resource' })
    async create(@Body() movieDto: MovieDto): Promise<Movie> {
        return this.movieService.create(movieDto);
    }

    @Delete('/:id')
    @HttpCode(204)
    @SetMetadata('roles', [UserRole.ADMIN])
    @ApiResponse({ status: 204, description: 'Deleted movie' })
    @ApiResponse({ status: 404, description: 'Not found id' })
    async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return this.movieService.delete(id);
    }
}
