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

  @Public()
  @Post('auth/register')
  @ResponseMessage('register successfully')
  async register(@Request() req) {
    console.log('req.body', req.body);
    let result = await this.authService.register(req.body);
    console.log('result', result);
    return {
      _id: result._id,
      createdAt: result.createdAt,
    };
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
