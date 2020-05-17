import { Module } from '@nestjs/common';
import { SeanceController } from './seance.controller';
import { SeanceService } from './seance.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { SeanceRepository } from './seance.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([SeanceRepository]),
    AuthModule,
  ],
  controllers: [SeanceController],
  providers: [SeanceService]
})
export class SeanceModule {}
