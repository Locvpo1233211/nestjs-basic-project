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
import { RolesService } from 'src/roles/roles.service';
import { SkipThrottle, ThrottlerGuard } from '@nestjs/throttler';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { UserLoginDto } from 'src/users/dto/create-user.dto';
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private roleService: RolesService,
  ) {}
  @Public()
  @UseGuards(LocalAuthGuard)
  @UseGuards(ThrottlerGuard)
  @ApiBody({ type: UserLoginDto })
  @Post('login')
  @ResponseMessage('Login successfully')
  async login(@Req() req, @Res({ passthrough: true }) res: Response) {
    return this.authService.login(req.user, res);
  }

  @Public()
  @Post('register')
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
  @Get('account')
  async getAccount(@User() user: IUser) {
    const temp = (await this.roleService.findOne(user.role._id)) as any;
    user.permissions = temp.permissions;
    console.log('user', user);
    return { user };
  }

  @Public()
  @ResponseMessage('refreshToken NEW')
  @Get('refresh')
  refreshToken(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const refreshToken = req.cookies['refeshToken'];
    return this.authService.handleRefresh(refreshToken, res);
  }

  @ResponseMessage('logout User')
  @Post('logout')
  logout(
    @Req() req: Request,
    @User() user: IUser,
    @Res({ passthrough: true }) res: Response,
  ) {
    const refreshToken = req.cookies['refeshToken'];
    return this.authService.logout(refreshToken, user, res);
  }

  @Get()
  @Render('index')
  getHello() {
    // return this.appService.getHello();
  }
}
