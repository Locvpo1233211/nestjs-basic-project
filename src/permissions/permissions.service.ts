import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { InjectModel } from '@nestjs/mongoose';
import {
  permission as permissionM,
  permissionDocument,
} from './schemas/permission.schema';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { IUser } from 'src/users/users.interface';
import aqp from 'api-query-params';
import { mongo } from 'mongoose';

@Injectable()
export class PermissionsService {
  constructor(
    @InjectModel(permissionM.name)
    private permissionMeModel: SoftDeleteModel<permissionDocument>,
  ) {}
  async create(createPermissionDto: CreatePermissionDto, user: IUser) {
    let apiPath = await this.permissionMeModel.findOne({
      apiPath: createPermissionDto.apiPath,
    });
    let method = await this.permissionMeModel.findOne({
      method: createPermissionDto.method,
    });
    console.log(apiPath, method);
    if (apiPath && method) {
      throw new UnauthorizedException('Permission already exists');
    }
    return await this.permissionMeModel.create({
      ...createPermissionDto,
      createdBy: {
        _id: user._id,
        email: user.email,
      },
    });
  }

  async findAll(current, pageSize, qs) {
    let { filter, sort, population, projection } = aqp(qs);
    delete filter.current;
    delete filter.pageSize;
    let offset = (+current - 1) * pageSize;
    let defaultLimit = pageSize ? +pageSize : 10;
    let total = (await this.permissionMeModel.find(filter)).length;
    const pages = Math.ceil(total / defaultLimit);
    const result = await this.permissionMeModel
      .find(filter)
      .skip(offset)
      .limit(defaultLimit)
      .sort(sort as any)
      .populate(population)
      .select(projection)
      .exec();

    return {
      meta: {
        total,
        pages,
        current,
        pageSize,
      },
      result,
    };
  }

  findOne(id: number) {
    if (!mongo.ObjectId.isValid(id)) {
      throw new UnauthorizedException('Permission not found');
    }
    return this.permissionMeModel.findById(id);
  }

  async update(
    id: number,
    updatePermissionDto: UpdatePermissionDto,
    user: IUser,
  ) {
    return await this.permissionMeModel.updateOne(
      { _id: id },
      {
        ...updatePermissionDto,
        updatedBy: {
          _id: user._id,
          email: user.email,
        },
      },
    );
  }

  async remove(id: number, user: IUser) {
    await this.permissionMeModel.updateOne(
      { _id: id },
      {
        deletedBy: {
          _id: user._id,
          email: user.email,
        },
      },
    );
    return await this.permissionMeModel.softDelete({ _id: id });
  }
}
