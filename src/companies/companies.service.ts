import { Injectable } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { Company, CompanyDocument } from './schemas/company.schema';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { IUser } from 'src/users/users.interface';
import aqp from 'api-query-params';
import { isEmpty } from 'rxjs';

@Injectable()
export class CompaniesService {
  constructor(
    @InjectModel(Company.name)
    private companyModel: SoftDeleteModel<CompanyDocument>,
  ) {}
  async create(createCompanyDto: CreateCompanyDto, user: IUser) {
    try {
      console.log(createCompanyDto);

      let result = await this.companyModel.create({
        ...createCompanyDto,
        createdBy: {
          _id: user._id,
          email: user.email,
        },
      });
      return result;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async findAll(limit: number, page: number, qs: string) {
    let { filter, projection, population } = aqp(qs);
    let { sort } = aqp(qs);
    delete filter.pageSize;
    delete filter.current;
    let offset = (+page - 1) * limit;
    let defaultLimit = limit ? +limit : 10;
    const total = (await this.companyModel.find(filter)).length;
    const pages = Math.ceil(total / defaultLimit);
    console.log('filter', filter);
    console.log('sort', sort);

    const result = await this.companyModel
      .find(filter)
      .skip(offset)
      .limit(defaultLimit)
      .sort(sort as any)
      .populate(population)
      .exec();
    return {
      meta: {
        total,
        pages,
        current: page,
        pageSize: limit,
      },
      result,
    };
  }

  findOne(id: number) {
    return this.companyModel.findById(id);
  }

  async update(id: number, updateCompanyDto: UpdateCompanyDto, user: IUser) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return 'not update user';
    }
    console.log('updateCompanyDto', updateCompanyDto);
    return await this.companyModel.updateOne(
      {
        _id: id,
      },
      {
        ...updateCompanyDto,
        updatedBy: {
          _id: user._id,
          email: user.email,
        },
      },
    );
  }

  async remove(id: number, user: IUser) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return 'not found company';
    }
    await this.companyModel.updateOne(
      { _id: id },
      {
        deleteBy: {
          _id: user._id,
          email: user.email,
        },
      },
    );
    return await this.companyModel.softDelete({ _id: id });
  }
}
