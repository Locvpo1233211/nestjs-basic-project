import { Injectable } from '@nestjs/common';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { InjectModel } from '@nestjs/mongoose';
import { jobDocument, job as jobM } from './schemas/job.schema';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { IUser } from 'src/users/users.interface';

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
      },
      createdBy: {
        _id: user._id,
        email: user.email,
      },
    });
    return result;
  }

  findAll() {
    return `This action returns all jobs`;
  }

  findOne(id: number) {
    return `This action returns a #${id} job`;
  }

  update(id: number, updateJobDto: UpdateJobDto) {
    return `This action updates a #${id} job`;
  }

  remove(id: number) {
    return `This action removes a #${id} job`;
  }
}
