import {
  IsArray,
  IsBoolean,
  IsEmail,
  IsMongoId,
  IsNotEmpty,
  IsNotEmptyObject,
  IsObject,
  IsString,
  ValidateNested,
} from 'class-validator';
import mongoose, { mongo } from 'mongoose';
export class CreateRoleDto {
  @IsNotEmpty({ message: 'name is required' })
  name: string;

  @IsNotEmpty({ message: 'description is required' })
  description: string;

  @IsNotEmpty({ message: 'isActive is required' })
  @IsBoolean({ message: 'isActive must be a boolean' })
  isActive: boolean;

  @IsNotEmpty({ message: 'permissions is required' })
  @IsArray({ message: 'permissions must be an array' })
  @IsMongoId({ each: true, message: 'permissions must be an array of mongoId' })
  permissions: mongoose.Schema.Types.ObjectId[];
}
