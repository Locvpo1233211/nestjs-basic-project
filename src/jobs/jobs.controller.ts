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
import { JobsService } from './jobs.service';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { ResponseMessage, User } from 'src/auth/decorator/customize';
import { IUser } from 'src/users/users.interface';

@Controller('jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @Post()
  async create(@Body() createJobDto: CreateJobDto, @User() user: IUser) {
    let result = await this.jobsService.create(createJobDto, user);
    console.log('result', result);
    return {
      _id: result._id,
      createdAt: result.createdAt,
    };
  }

  @Get()
  findAll(
    @Query('pageSize') limit: number,
    @Query('current') page: number,
    @Query() qs: string,
  ) {
    return this.jobsService.findAll(limit, page, qs);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.jobsService.findOne(id);
  }

  @Patch(':id')
  @ResponseMessage('Update successfully')
  async update(
    @Param('id') id: number,
    @Body() updateJobDto: UpdateJobDto,
    @User() user: IUser,
  ) {
    console.log('xx', id);
    return this.jobsService.update(id, updateJobDto, user);
  }

  @Delete(':id')
  remove(@Param('id') id: number, @User() user: IUser) {
    return this.jobsService.remove(id, user);
  }
}
