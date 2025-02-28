import { IsNotEmpty } from 'class-validator';
import mongoose from 'mongoose';
import { IsUnique } from 'src/auth/decorator/customize';
export class Company {
  @IsNotEmpty()
  _id: mongoose.Schema.Types.ObjectId;

  @IsNotEmpty()
  name: string;
}
