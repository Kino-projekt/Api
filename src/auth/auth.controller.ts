import { Controller, Body, ValidationPipe, Post, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { User } from './user.entity';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}

    @Post()
    @UseInterceptors(ClassSerializerInterceptor)
    signUp(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto): Promise<User> {
        return this.authService.signUp(authCredentialsDto);
    }
}
