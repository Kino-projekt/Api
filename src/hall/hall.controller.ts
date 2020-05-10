import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { HallService } from './hall.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Hall } from './hall.entity';

@Controller('halls')
@ApiTags('Hall')
export class HallController {
    constructor(private hallService: HallService) {}

    @Get()
    @ApiResponse({ status: 200, description: 'Array of halls objects', type: Hall })
    async getHalls() {
        return await this.hallService.getHalls();
    }

    @Get('/:id')
    @ApiResponse({ status: 200, description: 'Object of user', type: Hall })
    @ApiResponse({ status: 404, description: 'Not found' })
    async getHallById(@Param('id', ParseIntPipe) id: number) {
        return await this.hallService.getHallById(id);
    }
}