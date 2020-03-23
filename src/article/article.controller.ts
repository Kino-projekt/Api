import { Body, Controller, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ArticleService } from './article.service';
import { ArticleDto } from './dto/article.dto';
import { User } from '../user/user.entity';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../user/get-user.decorator';
import { Article } from './article.entity';

@Controller('articles')
@UseGuards(AuthGuard())
@ApiTags('Article')
export class ArticleController {
    constructor(private articleService: ArticleService) {}

    @Post()
    @UsePipes(ValidationPipe)
    @ApiResponse({ status: 201, description: 'Created resource' })
    async create(@Body() articleDto: ArticleDto, @GetUser() user: User): Promise<Article> {
        return this.articleService.create(articleDto, user);
    }
}
