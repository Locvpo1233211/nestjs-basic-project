import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { IUser } from 'src/users/users.interface';
import { InjectModel } from '@nestjs/mongoose';
import { role as roleM, roleDocument } from './schemas/role.schema';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import aqp from 'api-query-params';
import { mongo } from 'mongoose';

@Injectable()
export class RolesService {
  constructor(
    @InjectModel(roleM.name)
    private roleModel: SoftDeleteModel<roleDocument>,
  ) {}
  async create(createRoleDto: CreateRoleDto, user: IUser) {
    let nameCheck = await this.roleModel.findOne({
      name: createRoleDto.name,
    });
    if (nameCheck) {
      throw new UnauthorizedException('Role already exists');
    }
    return this.roleModel.create({
      ...createRoleDto,
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
    let total = (await this.roleModel.find(filter)).length;
    const pages = Math.ceil(total / defaultLimit);
    const result = await this.roleModel
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

  async findOne(id: number) {
    if (!mongo.ObjectId.isValid(id)) {
      throw new UnauthorizedException('Invalid ID');
    }
    return (await this.roleModel.findById(id)).populate({
      path: 'permissions',
      select: { name: 1, _id: 1, apiPath: 1, method: 1, module: 1 },
    });
  }

  async update(id: number, updateRoleDto: UpdateRoleDto, user: IUser) {
    if (!mongo.ObjectId.isValid(id)) {
      throw new UnauthorizedException('Invalid ID');
    }
    // const nameCheck = await this.roleModel.findOne({
    //   name: updateRoleDto.name,
    // });
    // if (nameCheck) {
    //   throw new UnauthorizedException('Role already exists');
    // }
    return this.roleModel.updateOne(
      { _id: id },
      {
        ...updateRoleDto,
        updatedBy: {
          _id: user._id,
          email: user.email,
        },
      },
    );
  }

  async remove(id: number, user: IUser) {
    if (!mongo.ObjectId.isValid(id)) {
      throw new UnauthorizedException('Invalid ID');
    }
    const role = await this.roleModel.findById(id);
    if (!role) {
      throw new UnauthorizedException('Role not found');
    }

    await this.roleModel.updateOne(
      { _id: id },

      {
        deletedBy: {
          _id: user._id,
          email: user.email,
        },
      },
    );
    return this.roleModel.softDelete({ _id: id });
  }
}
