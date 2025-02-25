import {
  Controller,
  Get,
  Post,
  Render,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public, ResponseMessage } from './decorator/customize';
import { LocalAuthGuard } from './passport/local-auth.guard';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}
  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  @ResponseMessage('Login successfully')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Get('profile')
  async getProfile(@Request() req) {
    return req.user;
  }

  @Get()
  @Render('index')
  getHello() {
    // return this.appService.getHello();
  }
}
