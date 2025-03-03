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
import { CompaniesService } from './companies.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { Public, User } from 'src/auth/decorator/customize';
import { IUser } from 'src/users/users.interface';

@Controller('companies')
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}
  @Post('create1')
  create1(@Body() createCompanyDto: CreateCompanyDto, @User() user: IUser) {
    return 'aaa';
  }
  @Post()
  create(@Body() createCompanyDto: CreateCompanyDto, @User() user: IUser) {
    console.log('abc', user);
    return this.companiesService.create(createCompanyDto, user);
  }

  @Get()
  @Public()
  findAll(
    @Query('pageSize') limit: string,
    @Query('current') page: string,
    @Query() qs: string,
  ) {
    return this.companiesService.findAll(+limit, +page, qs);
  }

  @Get(':id')
  @Public()
  findOne(@Param('id') id: number) {
    return this.companiesService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateCompanyDto: UpdateCompanyDto,
    @User() user: IUser,
  ) {
    return this.companiesService.update(id, updateCompanyDto, user);
  }

  @Delete(':id')
  remove(@Param('id') id: number, @User() user: IUser) {
    return this.companiesService.remove(id, user);
  }
}
