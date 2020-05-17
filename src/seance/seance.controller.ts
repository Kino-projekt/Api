import { Controller, Get } from '@nestjs/common';
import { SeanceService } from './seance.service';
import { ApiResponse } from '@nestjs/swagger';
import { Seance } from './seance.entity';

@Controller('seances')
export class SeanceController {
    constructor(private seanceService: SeanceService) {}

    @Get()
    @ApiResponse({ status: 200, description: 'Array of seances objects', type: Seance })
    async getSeances(): Promise<Seance[]> {
        return await this.seanceService.getSeances();
    }
}
