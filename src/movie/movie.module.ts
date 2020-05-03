import { Module } from '@nestjs/common';
import { MovieAdminController } from './movie.admin.controller';
import { MovieService } from './movie.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { MovieRepository } from './movie.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([MovieRepository]),
    AuthModule,
  ],
  controllers: [MovieAdminController],
  providers: [MovieService]
})
export class MovieModule {}
