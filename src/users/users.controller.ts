import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LocalAuthGuard } from 'src/auth/passport/local-auth.guard';
import { Public, User } from 'src/auth/decorator/customize';
import { IUser } from './users.interface';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() result: CreateUserDto, @User() user: IUser) {
    let info = await this.usersService.create(result, user);
    console.log('info', info);
    return {
      _id: info._id,
      createdAt: info.createdAt,
    };
  }

  @Get()
  async findAll(
    @Query('pageSize') limit: number,
    @Query('current') page: number,
    @Query() qs: string,
  ) {
    console.log('result', limit, page, qs);
    let result = await this.usersService.findAll(+limit, +page, qs);
    return result;
  }

  @Get(':id')
  @Public()
  async findOne(@Param('id') id: string) {
    let result: any = await this.usersService.findOne(id);
    let { password, ...user } = result._doc;
    return user;
  }

  @Patch()
  async update(@Body() updateUserDto: UpdateUserDto, @User() user: IUser) {
    let result = await this.usersService.update(updateUserDto, user);
    return result;
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @User() user: IUser) {
    return this.usersService.remove(id, user);
  }
}
