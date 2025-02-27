import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { user as userM, userDocument } from './schemas/user.schema';
import mongoose, { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import aqp from 'api-query-params';
import { IUser } from './users.interface';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(userM.name) private userModel: SoftDeleteModel<userDocument>,
  ) {}
  getHashedPassword(password: string) {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    return hash;
  }
  async create(result: CreateUserDto, user?: any) {
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
          role: result.role,
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
          role: result.role,
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
    const totalItems = (await this.userModel.find(filter)).length;
    const Pages = Math.ceil(totalItems / defaultLimit);

    const result = await this.userModel
      .find(filter)
      .skip(offset)
      .select('-password')
      .limit(defaultLimit)
      .sort(sort as any)
      .populate(population)
      .exec();
    return {
      meta: {
        totalItems,
        Pages,
        page,
        limit,
      },
      result,
    };
  }

  findOne(id: string) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new BadRequestException('not remove user');
    }
    let user = this.userModel.findOne({ _id: id });

    return user;
  }
  async findByEmail(email: string) {
    return await this.userModel.findOne({ email: email });
  }
  isValidatePassword(password: string, hashedPassword: string) {
    return bcrypt.compareSync(password, hashedPassword);
  }

  async update(updateUserDto: UpdateUserDto, user: IUser) {
    if (!mongoose.Types.ObjectId.isValid(updateUserDto.id)) {
      throw new BadRequestException('not remove user');
    }
    console.log('updateUserDto', updateUserDto.company._id);
    return await this.userModel.updateOne(
      { _id: updateUserDto.id },
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
    console.log('user', user._id);
    console.log('user', user.email);
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
    console.log('refeshToken', refreshToken, id);
    return await this.userModel.updateOne(
      { _id: id },
      {
        refreshToken: refreshToken,
      },
    );
  }
  async findUserByRefeshToken(refreshToken: string) {
    console.log('refeshTokenaa', refreshToken);
    return await this.userModel.findOne({ refreshToken: refreshToken });
  }
}
