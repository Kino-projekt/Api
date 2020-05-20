import { Module } from '@nestjs/common';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { CommentAdminController } from './comment.admin.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeanceRepository } from '../seance/seance.repository';
import { MovieRepository } from '../movie/movie.repository';
import { HallRepository } from '../hall/hall.repository';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      SeanceRepository,
      MovieRepository,
      HallRepository
    ]),
    AuthModule,
  ],
  controllers: [CommentController, CommentAdminController],
  providers: [CommentService]
})
export class CommentModule {}
