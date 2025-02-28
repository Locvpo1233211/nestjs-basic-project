import { Type } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsNotEmptyObject,
  IsObject,
  ValidateNested,
} from 'class-validator';
import mongoose from 'mongoose';
import { IsUnique } from 'src/auth/decorator/customize';
export class Company {
  @IsNotEmpty()
  _id: mongoose.Schema.Types.ObjectId;

  @IsNotEmpty()
  name: string;
}
export class CreateJobDto {
  @IsNotEmpty({ message: 'Name is required' })
  name: string;

  @IsNotEmpty({ message: 'Skill is required' })
  skill: string;

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

  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  @Type(() => Company)
  company: Company;
  created_at: Date;
  updated_at: Date;
}
