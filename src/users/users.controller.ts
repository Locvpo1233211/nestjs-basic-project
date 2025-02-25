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

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() result: CreateUserDto, @User() user) {
    let info = await this.usersService.create(result, user);
    console.log('info', info);
    return {
      _id: info._id,
      createdAt: info.createdAt,
    };
  }

  @Get()
  async findAll(
    @Query('limit') limit: number,
    @Query('page') page: number,
    @Query() qs: string,
  ) {
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
  async update(@Body() updateUserDto: UpdateUserDto) {
    console.log('updateUserDto', updateUserDto);
    let result = await this.usersService.update(updateUserDto);
    return {};
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @User() user) {
    return this.usersService.remove(id, user);
  }
}
