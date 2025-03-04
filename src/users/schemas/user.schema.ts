import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { role } from 'src/roles/schemas/role.schema';

export type userDocument = HydratedDocument<user>;

@Schema({ timestamps: true })
export class user {
  @Prop({ required: true, unique: true })
  email: string;
  @Prop({ required: true })
  password: string;
  @Prop()
  name: string;
  @Prop()
  phone: number;
  @Prop()
  age: number;
  @Prop()
  address: string;
  @Prop()
  gender: string;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: role.name })
  role: mongoose.Schema.Types.ObjectId;
  @Prop()
  refreshToken: string;
  @Prop({ type: Object })
  company: {
    _id: mongoose.Schema.Types.ObjectId;
    name: string;
  };
  @Prop()
  createdAt: Date;
  @Prop()
  updatedAt: Date;

  @Prop({ type: Object })
  createdBy: {
    _id: mongoose.Schema.Types.ObjectId;
    email: string;
  };
  @Prop({ type: Object })
  updatedBy: {
    _id: mongoose.Schema.Types.ObjectId;
    email: string;
  };
  @Prop({ type: Object })
  deletedBy: {
    _id: mongoose.Schema.Types.ObjectId;
    email: string;
  };
  @Prop()
  isDeleted: boolean;
  @Prop()
  deletedAt: Date;
}

export const userSchema = SchemaFactory.createForClass(user);
