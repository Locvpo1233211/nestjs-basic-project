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
import { ResumesService } from './resumes.service';
import { CreateResumeDto, CreateUserCvDto } from './dto/create-resume.dto';
import { UpdateResumeDto } from './dto/update-resume.dto';
import { User } from 'src/auth/decorator/customize';
import { IUser } from 'src/users/users.interface';

@Controller('resumes')
export class ResumesController {
  constructor(private readonly resumesService: ResumesService) {}

  @Post()
  async create(@Body() createResumeDto: CreateUserCvDto, @User() user: IUser) {
    let result = await this.resumesService.create(createResumeDto, user);
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
    @Query() qs: string,
  ) {
    return this.resumesService.findAll(current, pageSize, qs);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.resumesService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateResumeDto: UpdateResumeDto,
    @User() user: IUser,
  ) {
    return this.resumesService.update(id, updateResumeDto, user);
  }

  @Delete(':id')
  remove(@Param('id') id: number, @User() user: IUser) {
    return this.resumesService.remove(id, user);
  }
  @Post('by-user')
  byUser(@User() user: IUser) {
    return this.resumesService.findByUser(user);
  }
}
