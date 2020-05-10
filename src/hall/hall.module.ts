import { Module } from '@nestjs/common';
import { HallController } from './hall.controller';
import { HallService } from './hall.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { HallRepository } from './hall.repository';
import { HallAdminController } from './hall.admin.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([HallRepository]),
    AuthModule,
  ],
  controllers: [HallController, HallAdminController],
  providers: [HallService]
})
export class HallModule {}
