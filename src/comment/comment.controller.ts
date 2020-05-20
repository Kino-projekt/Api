import {
    Body,
    ClassSerializerInterceptor,
    Controller,
    Post,
    UseGuards,
    UseInterceptors,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Comment } from './comment.entity';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../user/get-user.decorator';
import { User } from '../user/user.entity';
import { CommentDto } from './dto/comment.dto';

@Controller('comments')
@UseGuards(AuthGuard())
@ApiTags('Comment')
export class CommentController {
    constructor(private commentService: CommentService) {}

    @Post()
    @UseInterceptors(ClassSerializerInterceptor)
    @UsePipes(ValidationPipe)
    @ApiResponse({ status: 201, description: 'Created resource' })
    async create(@Body() commentDto: CommentDto, @GetUser() user: User): Promise<Comment> {
        return this.commentService.create(commentDto, user);
    }
}
