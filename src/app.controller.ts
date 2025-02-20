import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigService } from '@nestjs/config';
import { Console } from 'console';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private configService: ConfigService,
  ) {}

  @Get()
  @Render('index')
  getHello() {
    // return this.appService.getHello();
  }
}
