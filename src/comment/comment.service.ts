import { Injectable, NotFoundException } from '@nestjs/common';
import { CommentRepository } from './comment.repository';
import { CommentDto } from './dto/comment.dto';
import { User } from '../user/user.entity';
import { MovieRepository } from '../movie/movie.repository';
import { Comment } from './comment.entity';

@Injectable()
export class CommentService {
    constructor(
        private commentRepository: CommentRepository,
        private movieRepository: MovieRepository,
    ) {}

    async create(commentDto: CommentDto, user: User): Promise<Comment> {
        const { movieId } = commentDto;
        const movie = await this.movieRepository.findOne(movieId);

        if (!movie) {
            throw new NotFoundException('Movie not found');
        }

        return await this.commentRepository.createComment(commentDto, user, movie);
    }
}
