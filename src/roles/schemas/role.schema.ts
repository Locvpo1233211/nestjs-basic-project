import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Company } from 'src/companies/schemas/company.schema';
import { job } from 'src/jobs/schemas/job.schema';
import { permission } from 'src/permissions/schemas/permission.schema';

export type roleDocument = HydratedDocument<role>;

@Schema({ timestamps: true })
export class role {
  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop()
  isActive: boolean;

  @Prop({
    type: [mongoose.Schema.Types.ObjectId],
    ref: permission.name,
  })
  permission: permission[];

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

export const roleSchema = SchemaFactory.createForClass(role);
