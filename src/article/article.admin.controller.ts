import { Body, Controller, Get, Post, SetMetadata, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ArticleDto } from './dto/article.dto';
import { GetUser } from '../user/get-user.decorator';
import { User } from '../user/user.entity';
import { Article } from './article.entity';
import { ArticleService } from './article.service';
import { RolesGuard } from '../auth/roles.gurad';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { UserRole } from '../user/user-role.enum';

@UseGuards(new RolesGuard(new Reflector()))
@UseGuards(AuthGuard())
@Controller('/admin/articles')
@ApiTags('Admin article')
export class ArticleAdminController {
    constructor(private articleService: ArticleService) {}

    @Post()
    @SetMetadata('roles', [UserRole.ADMIN])
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