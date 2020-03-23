import { EntityRepository, Repository } from 'typeorm';
import { Article } from './article.entity';
import { ArticleDto } from './dto/article.dto';
import { User } from '../user/user.entity';
import { ArticleStatus } from './article-status.enum';

@EntityRepository(Article)
export class ArticleRepository extends Repository<Article> {
    async createArticle(articleDto: ArticleDto, user: User): Promise<Article> {
        const { title, description } = articleDto;

        const article = new Article();
        article.title = title;
        article.description = description;
        article.status = ArticleStatus.INACTIVE;
        article.createdAt = new Date();
        article.user = user;

        await article.save();

        delete article.user;

        return article;
    }
}