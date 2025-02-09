import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from '../user/user.entity/user.entity';
import { JwtAuthGuard } from './jwt.strategy/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: { email: string; password: string }) {
    try {
      const user = await this.authService.validateUser(
        loginDto.email,
        loginDto.password,
      );
      if (!user) {
        throw new Error('Invalid credentials');
      }
      return this.authService.login(user);
    } catch (error) {
      console.log('error', error);
      throw new HttpException(
        {
          statusCode: HttpStatus.UNAUTHORIZED,
          data: {
            message: `email or password does not match !`,
          },
        },
        HttpStatus.UNAUTHORIZED,
      );
    }
  }

  @Post('register')
  async register(@Body() registerDto: Partial<User>) {
    return this.authService.register(registerDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('authme')
  async authMe(@Request() req) {
    // return { 'user_id ': req.user?.userId };
    return this.authService.getAuthUser(req.user);
  }
}
