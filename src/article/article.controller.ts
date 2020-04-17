import { Controller, Get } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ArticleService } from './article.service';
import { Article } from './article.entity';

@Controller('articles')
@ApiTags('Article')
export class ArticleController {
    constructor(private articleService: ArticleService) {}

    @Get()
    @ApiResponse({ status: 200, description: 'Array of articles objects only with active statuses', type: Article })
    async getArticlesWithActiveStatuses(): Promise<Article[]> {
        return await this.articleService.getArticlesWithActiveStatuses();
    }
}
