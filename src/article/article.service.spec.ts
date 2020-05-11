import { Test } from '@nestjs/testing';
import { ArticleService } from './article.service';
import { ArticleRepository } from './article.repository';
import { NotFoundException } from '@nestjs/common';

const mockUser = { id: 12 };

const mockArticleRepository = () => ({
    getArticlesWithActiveStatuses: jest.fn(),
    getArticles: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    createArticle: jest.fn(),
    delete: jest.fn()
});

describe('ArticleService', () => {
    let articleService;
    let articleRepository;

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [
                ArticleService,
                { provide: ArticleRepository, useFactory: mockArticleRepository },
            ],
        }).compile();

        articleService = await module.get<ArticleService>(ArticleService);
        articleRepository = await module.get<ArticleRepository>(ArticleRepository);
    });

    describe('getArticles', () => {
        it('gets all articles from the repository', async () => {
            const mockArticle = { title: 'Test article', description: 'Description' }
            articleRepository.find.mockResolvedValue(mockArticle);

            const result = await articleService.getArticles();

            expect(result).toEqual(mockArticle);
        })
    });

    describe('getArticlesWithActiveStatuses', () => {
        it('gets all articles from the repository with active statuses', async () => {
            articleRepository.getArticlesWithActiveStatuses.mockResolvedValue('someValue');

            expect(articleRepository.getArticlesWithActiveStatuses).not.toHaveBeenCalled();

            const result = await articleService.getArticlesWithActiveStatuses();
            expect(articleRepository.getArticlesWithActiveStatuses).toHaveBeenCalled();
            expect(result).toEqual('someValue');
        })
    });

    describe('create', () => {
        it('calls articleRepository.create() and return the result', async () => {
            articleRepository.createArticle.mockResolvedValue('someValue');

            expect(articleRepository.createArticle).not.toHaveBeenCalled();

            const articleDto = { title: 'Test title', description: 'Trololo' };
            const result = await articleService.create(articleDto, mockUser);
            expect(articleRepository.createArticle).toHaveBeenCalledWith(articleDto, mockUser);
            expect(result).toEqual('someValue');
        })
    });

    describe('deleteTask', () => {
        it('calls articleRepository.deleteArticle() to delete a article', async () => {
            articleRepository.delete.mockResolvedValue({ affected: 1 });
            expect(articleRepository.delete).not.toHaveBeenCalled();
            await articleService.delete(1);
            expect(articleRepository.delete).toHaveBeenCalledWith({ id: 1 });
        });

        it('throws an error as article could not be found', () => {
            articleRepository.delete.mockResolvedValue({ affected: 0 });
            expect(articleService.delete(1)).rejects.toThrow(NotFoundException);
        });
    });
});