import { Module } from '@nestjs/common';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { CommentAdminController } from './comment.admin.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { CommentRepository } from './comment.repository';
import { MovieRepository } from '../movie/movie.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CommentRepository,
      MovieRepository
    ]),
    AuthModule,
  ],
  controllers: [CommentController, CommentAdminController],
  providers: [CommentService]
})
export class CommentModule {}
