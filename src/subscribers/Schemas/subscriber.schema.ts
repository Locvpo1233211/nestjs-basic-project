import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { role } from 'src/roles/schemas/role.schema';

export type subscriberDocument = HydratedDocument<subscriber>;
@Schema({ timestamps: true })
export class subscriber {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  skills: string[];

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

export const subscriberSchema = SchemaFactory.createForClass(subscriber);
