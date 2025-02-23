import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CompanyDocument = HydratedDocument<Company>;

@Schema({ timestamps: true })
export class Company {
  @Prop()
  name: string;
  @Prop()
  address: number;
  @Prop()
  description: number;

  @Prop()
  created_at: Date;
  @Prop()
  updated_at: Date;

  @Prop()
  createdBy: {
    _id: string;
    email: string;
  };
  @Prop()
  updatedBy: {
    _id: string;
    email: string;
  };
  @Prop()
  deleteBy: {
    _id: string;
    email: string;
  };
  @Prop()
  isDeleted: boolean;
  @Prop()
  deletedAt: Date;
}

export const CompanySchema = SchemaFactory.createForClass(Company);
