import { EntityRepository, Repository } from 'typeorm';
import { CommentDto } from './dto/comment.dto';
import { User } from '../user/user.entity';
import { Comment } from './comment.entity';
import { Movie } from '../movie/movie.entity';

@EntityRepository(Comment)
export class CommentRepository extends Repository<Comment> {
    async createComment(commentDto: CommentDto, user: User, movie: Movie): Promise<Comment> {
        const { content } = commentDto;

        const comment = new Comment();
        comment.content = content;
        comment.author = user;
        comment.movie = movie;
        await comment.save();

        return comment;
    }
}