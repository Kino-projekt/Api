import { EntityRepository, Repository } from 'typeorm';
import { Movie } from './movie.entity';
import { MovieDto } from './dto/movie.dto';

@EntityRepository(Movie)
export class MovieRepository extends Repository<Movie> {
    async createMovie(movieDto: MovieDto): Promise<Movie> {
        const { title, description, director } = movieDto;

        const movie = new Movie();
        movie.title = title;
        movie.description = description;
        movie.director = director;
        movie.createdAt = new Date();

        await movie.save();

        return movie;
    }
}