import { Injectable } from '@nestjs/common';
import { CreateResumeDto, CreateUserCvDto } from './dto/create-resume.dto';
import { UpdateResumeDto } from './dto/update-resume.dto';
import { IUser } from 'src/users/users.interface';
import { resume as resumeM, resumeDocument } from './schemas/resume.schema';
import { InjectModel } from '@nestjs/mongoose';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import aqp from 'api-query-params';

@Injectable()
export class ResumesService {
  constructor(
    @InjectModel(resumeM.name)
    private resumeModel: SoftDeleteModel<resumeDocument>,
  ) {}
  async create(createResumeDto: CreateUserCvDto, user: IUser) {
    let result = await this.resumeModel.create({
      ...createResumeDto,
      email: user.email,
      userId: user._id,
      status: 'PENDING',
      history: [
        {
          status: 'PENDING',
          updatedAt: new Date(),
          updatedBy: {
            _id: user._id,
            email: user.email,
          },
        },
      ],
      createdBy: {
        _id: user._id,
        email: user.email,
      },
    });
    return result;
  }

  async findAll(page, limit, qs) {
    let { filter, sort, population, projection } = aqp(qs);
    delete filter.current;
    delete filter.pageSize;
    let offset = (+page - 1) * limit;
    let defaultLimit = limit ? +limit : 10;
    const total = (await this.resumeModel.find(filter)).length;
    const pages = Math.ceil(total / defaultLimit);
    const result = await this.resumeModel
      .find(filter)
      .skip(offset)
      .limit(defaultLimit)
      .populate(population)
      .select(projection as any)
      .sort(sort as any)
      .exec();

    return {
      meta: {
        total,
        pages,
        current: +page,
        pageSize: defaultLimit,
      },
      result: result,
    };
  }

  findOne(id: number) {
    return this.resumeModel.findById(id);
  }

  update(id: number, updateResumeDto: UpdateResumeDto, user: IUser) {
    console.log('xx', id);
    return this.resumeModel.updateOne(
      { _id: id },
      {
        ...updateResumeDto,
        $push: {
          history: {
            status: updateResumeDto.status,
            updatedAt: new Date(),
            updatedBy: {
              _id: user._id,
              email: user.email,
            },
          },
        },
      },
    );
  }

  async remove(id: number, user: IUser) {
    await this.resumeModel.updateOne(
      { _id: id },
      {
        deletedBy: {
          _id: user._id,
          email: user.email,
        },
      },
    );
    return this.resumeModel.softDelete({ _id: id });
  }
  async findByUser(user: IUser) {
    return this.resumeModel.find({ userId: user._id });
  }
}
