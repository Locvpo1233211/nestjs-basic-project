import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type jobDocument = HydratedDocument<job>;

@Schema({ timestamps: true })
export class job {
  @Prop()
  name: string;
  @Prop()
  skill: string;
  @Prop()
  location: string;
  @Prop()
  salary: number;
  @Prop()
  quantity: number;
  @Prop()
  level: string;
  @Prop()
  description: string;
  @Prop({ type: Object })
  company: {
    _id: mongoose.Schema.Types.ObjectId;
    name: string;
  };
  @Prop()
  startDate: Date;
  @Prop()
  endDate: Date;
  @Prop()
  isActive: boolean;
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

export const jobSchema = SchemaFactory.createForClass(job);
