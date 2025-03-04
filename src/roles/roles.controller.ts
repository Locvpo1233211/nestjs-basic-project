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
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { User } from 'src/auth/decorator/customize';
import { IUser } from 'src/users/users.interface';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  async create(@Body() createRoleDto: CreateRoleDto, @User() user: IUser) {
    const result = await this.rolesService.create(createRoleDto, user);
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
    return this.rolesService.findAll(current, pageSize, qs);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.rolesService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateRoleDto: UpdateRoleDto,
    @User() user: IUser,
  ) {
    return this.rolesService.update(id, updateRoleDto, user);
  }

  @Delete(':id')
  remove(@Param('id') id: number, @User() user: IUser) {
    return this.rolesService.remove(id, user);
  }
}
