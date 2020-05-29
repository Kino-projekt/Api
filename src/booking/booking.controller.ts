import {
    Body,
    ClassSerializerInterceptor,
    Controller,
    Post,
    UseGuards, UseInterceptors,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import { RolesGuard } from '../auth/roles.gurad';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { BookingService } from './booking.service';
import { GetUser } from '../user/get-user.decorator';
import { User } from '../user/user.entity';
import { BookingDto } from './dto/booking.dto';
import { Booking } from './booking.entity';

@UseGuards(new RolesGuard(new Reflector()))
@UseGuards(AuthGuard())
@Controller('bookings')
@ApiTags('Booking')
export class BookingController {
    constructor(private bookingService: BookingService) {}

    @Post()
    @UseInterceptors(ClassSerializerInterceptor)
    @UsePipes(ValidationPipe)
    @ApiResponse({ status: 201, description: 'Created resource' })
    async create(@Body() bookingDto: BookingDto, @GetUser() user: User): Promise<Booking> {
        return this.bookingService.create(bookingDto, user);
    }
}
