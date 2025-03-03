import { Type } from 'class-transformer';
import {
  IsArray,
  IsEmail,
  IsMongoId,
  IsNotEmpty,
  IsNotEmptyObject,
  IsObject,
  IsString,
  ValidateNested,
} from 'class-validator';
import mongoose from 'mongoose';
export class CreateResumeDto {
  @IsNotEmpty({ message: 'email is required' })
  email: string;

  @IsNotEmpty({ message: 'userId is required' })
  userId: mongoose.Schema.Types.ObjectId;

  @IsNotEmpty({ message: 'url is required' })
  url: string;

  @IsNotEmpty({ message: 'status is required' })
  status: string;

  @IsNotEmpty({ message: 'companyId is required' })
  companyId: mongoose.Schema.Types.ObjectId;

  @IsNotEmpty({ message: 'jobId is required' })
  jobId: mongoose.Schema.Types.ObjectId;
}

export class CreateUserCvDto {
  @IsNotEmpty({ message: 'url is required' })
  url: string;

  @IsNotEmpty({ message: 'companyId is required ' })
  @IsMongoId()
  companyId: mongoose.Schema.Types.ObjectId;

  @IsNotEmpty({ message: 'jobId is required' })
  @IsMongoId()
  jobId: mongoose.Schema.Types.ObjectId;
}
