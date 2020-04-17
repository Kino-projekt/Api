import { Injectable } from '@nestjs/common';
import { ArticleDto } from './dto/article.dto';
import { User } from '../user/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ArticleRepository } from './article.repository';
import { Article } from './article.entity';
import { ArticleStatus } from './article-status.enum';

@Injectable()
export class ArticleService {
    constructor(@InjectRepository(ArticleRepository) private articleRepository: ArticleRepository) {}

    async create(articleDto: ArticleDto, user: User): Promise<Article> {
        return await this.articleRepository.createArticle(articleDto, user);
    }

    async getArticles(): Promise<Article[]> {
        return await this.articleRepository.find();
    }

    async getArticlesWithActiveStatuses(): Promise<Article[]> {
        return await this.articleRepository.find({
            where: [
                { status: ArticleStatus.ACTIVE }
            ]
        });
    }
}
