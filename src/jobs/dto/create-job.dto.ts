import { Type } from 'class-transformer';
import {
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsNotEmptyObject,
  IsObject,
  IsString,
  ValidateNested,
} from 'class-validator';
import mongoose from 'mongoose';
import { IsUnique } from 'src/auth/decorator/customize';
export class Company {
  @IsNotEmpty()
  _id: mongoose.Schema.Types.ObjectId;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  logo: string;
}
export class CreateJobDto {
  @IsNotEmpty({ message: 'Name is required' })
  name: string;

  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty({ message: 'Skill is required' })
  skills: string[];

  @IsNotEmpty({ message: 'Location is required' })
  location: string;

  @IsNotEmpty({ message: 'Salary is required' })
  salary: number;

  @IsNotEmpty({ message: 'Quantity is required' })
  quantity: number;

  @IsNotEmpty({ message: 'Level is required' })
  level: string;

  @IsNotEmpty({ message: 'Description is required' })
  description: string;
  @IsNotEmpty({ message: 'isActive is required' })
  isActive: boolean;
  @IsNotEmpty({ message: 'Start date is required' })
  startDate: Date;

  @IsNotEmpty({ message: 'End date is required' })
  endDate: Date;

  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  @Type(() => Company)
  company: Company;
  created_at: Date;
  updated_at: Date;
}
