import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { SeanceService } from './seance.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Seance } from './seance.entity';

@Controller('seances')
@ApiTags('Seance')
export class SeanceController {
    constructor(private seanceService: SeanceService) {}

    @Get()
    @ApiResponse({ status: 200, description: 'Array of seances objects', type: Seance })
    async getSeances(): Promise<Seance[]> {
        return await this.seanceService.getSeances();
    }

    @Get('/:id')
    async getSeanceById(@Param('id', ParseIntPipe) id: number): Promise<Seance> {
        return await this.seanceService.getSeanceById(id);
    }
}
