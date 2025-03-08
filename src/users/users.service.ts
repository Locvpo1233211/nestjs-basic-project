import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { user as userM, userDocument } from './schemas/user.schema';
import mongoose, { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import aqp from 'api-query-params';
import { IUser } from './users.interface';
import { permission } from 'src/permissions/schemas/permission.schema';
import { role, roleDocument } from 'src/roles/schemas/role.schema';
import { USER_ROLE } from 'src/databases/sample';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(userM.name) private userModel: SoftDeleteModel<userDocument>,
    @InjectModel(role.name) private roleModel: SoftDeleteModel<roleDocument>,
  ) {}
  getHashedPassword(password: string) {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    return hash;
  }
  async create(result: CreateUserDto, user?: IUser) {
    const userRole = await this.roleModel.findOne({ name: USER_ROLE });
    let checkUser = await this.userModel
      .findOne({ email: result.email })
      .exec();
    let reuslt;
    if (checkUser) {
      throw new BadRequestException('Email already exists');
    } else {
      if (user) {
        console.log('user', user);
        const hashedPassword = this.getHashedPassword(result.password);
        let password = hashedPassword;
        reuslt = this.userModel.create({
          email: result.email,
          password: password,
          name: result.name,
          phone: result.phone,
          age: result.age,
          address: result.address,
          created_at: result.created_at,
          updated_at: result.updated_at,
          gender: result.gender,
          role: userRole?._id,
          company: {
            _id: result.company._id,
            name: result.company.name,
          },
          createdBy: {
            _id: user._id,
            email: user.email,
          },
        });
        return reuslt;
      } else {
        const hashedPassword = this.getHashedPassword(result.password);
        let password = hashedPassword;
        reuslt = await this.userModel.create({
          email: result.email,
          password: password,
          name: result.name,
          phone: result.phone,
          age: result.age,
          address: result.address,
          created_at: result.created_at,
          updated_at: result.updated_at,
          gender: result.gender,
          role: userRole?._id,
        });
        return reuslt;
      }
    }
  }

  async findAll(limit, page, qs) {
    let { filter, projection, population } = aqp(qs);
    console.log('filter', filter);
    let { sort } = aqp(qs);
    delete filter.pageSize;
    delete filter.current;
    let offset = (+page - 1) * limit;
    let defaultLimit = limit ? +limit : 10;
    const total = (await this.userModel.find(filter)).length;
    const pages = Math.ceil(total / defaultLimit);

    const result = await this.userModel
      .find(filter)
      .skip(offset)
      .select('-password')
      .limit(defaultLimit)
      .sort(sort as any)
      .populate(population)
      .select(projection)
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

  findOne(id: string) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new UnauthorizedException('not Found user');
    }
    let user = this.userModel
      .findOne({ _id: id })
      .select('-password')
      .populate({ path: 'role', select: { name: 1, _id: 1 } });

    return user;
  }

  async findByEmail(email: string) {
    return await this.userModel
      .findOne({ email: email })
      .populate({ path: 'role', select: { name: 1 } });
  }
  isValidatePassword(password: string, hashedPassword: string) {
    return bcrypt.compareSync(password, hashedPassword);
  }

  async update(updateUserDto: UpdateUserDto, user: IUser) {
    if (!mongoose.Types.ObjectId.isValid(updateUserDto._id)) {
      throw new BadRequestException('not update user');
    }
    return await this.userModel.updateOne(
      { _id: updateUserDto._id },
      {
        email: updateUserDto.email,
        password: updateUserDto.password,
        name: updateUserDto.name,
        phone: updateUserDto.phone,
        age: updateUserDto.age,
        address: updateUserDto.address,
        company: {
          _id: updateUserDto.company._id,
          name: updateUserDto.company.name,
        },
        updatedBy: {
          _id: user._id,
          email: user.email,
        },
      },
    );
  }

  async remove(id: string, user: any) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new BadRequestException('not remove user');
    }
    const foundUser = await this.userModel.findById({
      _id: id,
    });
    if (foundUser.name === 'admin') {
      throw new BadRequestException('Can not delete admin');
    }

    await this.userModel.updateOne(
      {
        _id: id,
      },
      {
        deletedBy: {
          _id: user._id,
          email: user.email,
        },
      },
    );
    return await this.userModel.softDelete({ _id: id });
  }
  async updateUserRefeshToken(id: string, refreshToken: string) {
    return await this.userModel.updateOne(
      { _id: id },
      {
        refreshToken: refreshToken,
      },
    );
  }
  async findUserByRefeshToken(refreshToken: string) {
    return await this.userModel
      .findOne({ refreshToken: refreshToken })
      .populate({ path: 'role', select: { name: 1 } });
  }
}
