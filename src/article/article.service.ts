import { Injectable, NotFoundException } from '@nestjs/common';
import { ArticleDto } from './dto/article.dto';
import { User } from '../user/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ArticleRepository } from './article.repository';
import { Article } from './article.entity';
import { ArticleStatus } from './article-status.enum';

@Injectable()
export class ArticleService {
    constructor(@InjectRepository(ArticleRepository) private articleRepository: ArticleRepository) {}

    async changeArticleStatus(id: number, status: ArticleStatus) {
        const article = await this.articleRepository.findOne({ where: { id: id } });

        if (!article) {
            throw new NotFoundException();
        }

        article.status = status;
        await article.save();

        return article;
    }

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

    async delete(id: number): Promise<void> {
        const result = await this.articleRepository.delete({ id });

        if (result.affected === 0) {
            throw new NotFoundException();
        }
    }
}
