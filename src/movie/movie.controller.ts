import { Controller, Get } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { MovieService } from './movie.service';
import { Movie } from './movie.entity';

@Controller('movies')
@ApiTags('Movie')
export class MovieController {
    constructor(private movieService: MovieService) {}

    @Get()
    @ApiResponse({ status: 200, description: 'Array of movies objects', type: Movie })
    async getMovies(): Promise<Movie[]> {
        return await this.movieService.getMovies();
    }
}
