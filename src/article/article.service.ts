import { Injectable } from '@nestjs/common';
import { ArticleDto } from './dto/article.dto';
import { User } from '../user/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ArticleRepository } from './article.repository';
import { Article } from './article.entity';

@Injectable()
export class ArticleService {
    constructor(@InjectRepository(ArticleRepository) private articleRepository: ArticleRepository) {}

    async create(articleDto: ArticleDto, user: User): Promise<Article> {
        return await this.articleRepository.createArticle(articleDto, user);
    }
}
