import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { user } from './entities/user.schema';
import mongoose, { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(@InjectModel(user.name) private userModel: Model<user>) {}
  getHashedPassword(password: string) {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync('B4c0//', salt);
    return hash;
  }
  async create(result: CreateUserDto) {
    console.log('password', result.password);

    const hashedPassword = this.getHashedPassword(result.password);
    let password = hashedPassword;
    console.log('password', result.email);
    let user = this.userModel.create({
      email: result.email,
      password: password,
      name: result.name,
      phone: result.phone,
      age: result.age,
      address: result.address,
      created_at: result.created_at,
      updated_at: result.updated_at,
    });

    return user;
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: string) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return 'not found user';
    }
    return this.userModel.findById(id);
  }
  async findByEmail(email: string) {
    return await this.userModel.findOne({ email: email });
  }
  isValidatePassword(password: string, hashedPassword: string) {
    return bcrypt.compareSync(password, hashedPassword);
  }

  async update(updateUserDto: UpdateUserDto) {
    console.log('updateUserDto', updateUserDto);
    if (!mongoose.Types.ObjectId.isValid(updateUserDto.id)) {
      return 'not update user';
    }
    return await this.userModel.updateOne(
      { _id: updateUserDto.id },
      {
        email: updateUserDto.email,
        password: updateUserDto.password,
        name: updateUserDto.name,
        phone: updateUserDto.phone,
        age: updateUserDto.age,
        address: updateUserDto.address,
        created_at: updateUserDto.created_at,
        updated_at: updateUserDto.updated_at,
      },
    );
  }

  async remove(id: string) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return 'not remove user';
    }
    return await this.userModel.deleteOne({ _id: id });
  }
}
