import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type userDocument = HydratedDocument<user>;

@Schema({ timestamps: true })
export class user {
  @Prop({ required: true })
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
  created_at: Date;
  @Prop()
  updated_at: Date;
  @Prop()
  isDeleted: boolean;
  @Prop()
  deletedAt: Date;
}

export const userSchema = SchemaFactory.createForClass(user);
