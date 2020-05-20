import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ArticleModule } from './article/article.module';
import { MovieModule } from './movie/movie.module';
import { HallModule } from './hall/hall.module';
import { SeanceModule } from './seance/seance.module';
import { CommentModule } from './comment/comment.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    AuthModule,
    UserModule,
    ArticleModule,
    MovieModule,
    HallModule,
    SeanceModule,
    CommentModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
