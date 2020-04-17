import { Module } from '@nestjs/common';
import { ArticleController } from './article.controller';
import { ArticleService } from './article.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleRepository } from './article.repository';
import { AuthModule } from '../auth/auth.module';
import { ArticleAdminController } from './article.admin.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([ArticleRepository]),
    AuthModule,
  ],
  controllers: [ArticleController, ArticleAdminController, ArticleController],
  providers: [ArticleService]
})
export class ArticleModule {}
