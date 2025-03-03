import { Injectable } from '@nestjs/common';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { InjectModel } from '@nestjs/mongoose';
import { jobDocument, job as jobM } from './schemas/job.schema';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { IUser } from 'src/users/users.interface';
import aqp from 'api-query-params';

@Injectable()
export class JobsService {
  constructor(
    @InjectModel(jobM.name) private jobModel: SoftDeleteModel<jobDocument>,
  ) {}
  create(createJobDto: CreateJobDto, user: IUser) {
    let result = this.jobModel.create({
      name: createJobDto.name,
      skills: createJobDto.skills,
      location: createJobDto.location,
      salary: createJobDto.salary,
      quantity: createJobDto.quantity,
      level: createJobDto.level,
      description: createJobDto.description,
      startDate: createJobDto.startDate,
      endDate: createJobDto.endDate,
      isActive: createJobDto.isActive,
      company: {
        _id: createJobDto.company._id,
        name: createJobDto.company.name,
        logo: createJobDto.company.logo,
      },
      createdBy: {
        _id: user._id,
        email: user.email,
      },
    });
    return result;
  }

  async findAll(pageSize, current, qs) {
    let { filter, projection, population } = aqp(qs);
    let { sort } = aqp(qs);
    delete filter.pageSize;
    delete filter.current;
    let offset = (+current - 1) * pageSize;
    let defaultLimit = pageSize ? +pageSize : 10;
    const total = (await this.jobModel.find(filter)).length;
    const pages = Math.ceil(total / defaultLimit);

    const result = await this.jobModel
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
        pageSize,
        current,
      },
      result: result,
    };
  }

  async findOne(id: number) {
    return await this.jobModel.findOne({ _id: id });
  }

  async update(id: number, updateJobDto: UpdateJobDto, user: IUser) {
    console.log('xx', id);

    let result = await this.jobModel.updateOne(
      { _id: id },
      {
        ...updateJobDto,
        updatedBy: {
          _id: user._id,
          email: user.email,
        },
      },
    );
    return result;
  }

  async remove(id: number, user: IUser) {
    await this.jobModel.updateOne(
      { _id: id },
      {
        deletedBy: {
          _id: user._id,
          email: user.email,
        },
      },
    );
    let result = await this.jobModel.softDelete({ _id: id });
    return result;
  }
}
