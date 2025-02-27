import {
  Controller,
  Get,
  Post,
  Render,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public, ResponseMessage, User } from './decorator/customize';
import { LocalAuthGuard } from './passport/local-auth.guard';
import { Request, Response, response } from 'express';
import { IUser } from 'src/users/users.interface';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}
  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  @ResponseMessage('Login successfully')
  async login(@Req() req, @Res({ passthrough: true }) res: Response) {
    return this.authService.login(req.user, res);
  }

  @Public()
  @Post('auth/register')
  @ResponseMessage('register successfully')
  async register(@Req() req) {
    console.log('req.body', req.body);
    let result = await this.authService.register(req.body);
    console.log('result', result);
    return {
      _id: result._id,
      createdAt: result.createdAt,
    };
  }

  @Get('profile')
  async getProfile(@Req() req) {
    return req.user;
  }
  @ResponseMessage('Logout successfully')
  @Get('auth/account')
  getAccount(@User() user: IUser) {
    return { user };
  }

  @Public()
  @ResponseMessage('refreshToken NEW')
  @Get('auth/refresh')
  refreshToken(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const refreshToken = req.cookies['refeshToken'];
    return this.authService.handleRefresh(refreshToken, res);
  }

  @Get()
  @Render('index')
  getHello() {
    // return this.appService.getHello();
  }
}
