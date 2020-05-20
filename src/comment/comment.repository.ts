import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Comment)
export class ArticleRepository extends Repository<Comment> {

}