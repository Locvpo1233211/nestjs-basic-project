import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { User } from 'src/auth/decorator/customize';
import { IUser } from 'src/users/users.interface';

@Controller('permissions')
export class PermissionsController {
  constructor(private readonly permissionsService: PermissionsService) {}

  @Post()
  async create(
    @Body() createPermissionDto: CreatePermissionDto,
    @User() user: IUser,
  ) {
    let result = await this.permissionsService.create(
      createPermissionDto,
      user,
    );
    console.log(result);
    return {
      _id: result._id,
      createdAt: result.createdAt,
    };
  }

  @Get()
  findAll(
    @Query('current') current: number,
    @Query('pageSize') pageSize: number,
    @Query() qs,
  ) {
    return this.permissionsService.findAll(current, pageSize, qs);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.permissionsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updatePermissionDto: UpdatePermissionDto,
    @User() user: IUser,
  ) {
    return this.permissionsService.update(id, updatePermissionDto, user);
  }

  @Delete(':id')
  remove(@Param('id') id: number, @User() user: IUser) {
    return this.permissionsService.remove(id, user);
  }
}
