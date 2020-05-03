import { Injectable } from '@nestjs/common';
import { MovieRepository } from './movie.repository';
import { MovieDto } from './dto/movie.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Movie } from './movie.entity';

@Injectable()
export class MovieService {
    constructor(@InjectRepository(MovieRepository) private movieRepository: MovieRepository) {}

    async create(movieDto: MovieDto): Promise<Movie> {
        return this.movieRepository.createMovie(movieDto);
    }
}
