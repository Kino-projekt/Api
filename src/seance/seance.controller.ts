import { ClassSerializerInterceptor, Controller, Get, Param, ParseIntPipe, UseInterceptors } from '@nestjs/common';
import { SeanceService } from './seance.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Seance } from './seance.entity';

@Controller('seances')
@ApiTags('Seance')
export class SeanceController {
    constructor(private seanceService: SeanceService) {}

    @Get()
    @UseInterceptors(ClassSerializerInterceptor)
    @ApiResponse({ status: 200, description: 'Array of seances objects', type: Seance })
    async getSeances(): Promise<Seance[]> {
        return await this.seanceService.getSeances();
    }

    @Get('/:id')
    @UseInterceptors(ClassSerializerInterceptor)
    async getSeanceById(@Param('id', ParseIntPipe) id: number): Promise<Seance> {
        return await this.seanceService.getSeanceById(id);
    }
}
