import { Body, Controller, Get, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ArticleService } from './article.service';
import { ArticleDto } from './dto/article.dto';
import { User } from '../user/user.entity';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../user/get-user.decorator';
import { Article } from './article.entity';

@Controller('articles')
@ApiTags('Article')
export class ArticleController {
    constructor(private articleService: ArticleService) {}

    @Post()
    @UseGuards(AuthGuard())
    @UsePipes(ValidationPipe)
    @ApiResponse({ status: 201, description: 'Created resource' })
    async create(@Body() articleDto: ArticleDto, @GetUser() user: User): Promise<Article> {
        return this.articleService.create(articleDto, user);
    }

    @Get()
    @ApiResponse({ status: 200, description: 'Array of articles objects', type: Article })
    async getArticles(): Promise<Article[]> {
        return await this.articleService.getArticles();
    }
}
