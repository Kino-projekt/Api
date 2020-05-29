import { Module } from '@nestjs/common';
import { BookingController } from './booking.controller';
import { BookingService } from './booking.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { BookingRepository } from './booking.repository';
import { SeanceRepository } from '../seance/seance.repository';
import { HallRepository } from '../hall/hall.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([BookingRepository, SeanceRepository, HallRepository]),
    AuthModule,
  ],
  controllers: [BookingController],
  providers: [BookingService]
})
export class BookingModule {}
