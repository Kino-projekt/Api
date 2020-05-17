import { Module } from '@nestjs/common';
import { SeanceController } from './seance.controller';
import { SeanceService } from './seance.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { SeanceRepository } from './seance.repository';
import { SeanceAdminController } from './seance.admin.controller';
import { MovieRepository } from '../movie/movie.repository';
import { HallRepository } from '../hall/hall.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      SeanceRepository,
      MovieRepository,
      HallRepository
    ]),
    AuthModule,
  ],
  controllers: [SeanceController, SeanceAdminController],
  providers: [SeanceService]
})
export class SeanceModule {}
