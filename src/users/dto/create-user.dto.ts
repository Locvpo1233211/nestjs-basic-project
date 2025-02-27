import { Type } from 'class-transformer';
import { IsEmail, IsNotEmpty } from 'class-validator';
import mongoose from 'mongoose';
import { IsUnique } from 'src/auth/decorator/customize';
export class Company {
  @IsNotEmpty()
  _id: mongoose.Schema.Types.ObjectId;

  @IsNotEmpty()
  name: string;
}
export class CreateUserDto {
  // @IsUnique({ message: 'Email đã tồn tại' }) // Kiểm tra email duy nhất
  @IsEmail({}, { message: 'Email is invalid' })
  @IsNotEmpty({ message: 'Email is required' })
  email: string;

  @IsNotEmpty({ message: 'Password is required' })
  password: string;

  @IsNotEmpty({ message: 'Name is required' })
  name: string;

  @IsNotEmpty({ message: 'Phone is required' })
  phone: number;

  @IsNotEmpty({ message: 'Age is required' })
  age: number;

  @IsNotEmpty({ message: 'Address is required' })
  address: string;

  @IsNotEmpty({ message: 'gender is required' })
  gender: string;

  @IsNotEmpty({ message: 'role is required' })
  role: string;
  @IsNotEmpty({ message: 'company is required' })
  refreshToken: string;
  @Type(() => Company)
  company: Company;
  created_at: Date;
  updated_at: Date;
}
