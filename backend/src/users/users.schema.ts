import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type userDocument = HydratedDocument<user>;
@Schema()
export class user {
  @Prop({ type: Types.ObjectId, default: () => new Types.ObjectId() })
  _id: Types.ObjectId;

  @Prop({ required: [true, 'name is required'], unique: false })
  username: string;

  @Prop({ type: String, required: [true, 'password is required'] })
  password: string;

  @Prop({ type: String, required: [true, 'email is required'] })
  email: string;

  @Prop({ type: Date, default: () => new Date() })
  createdAt?: Date;

  @Prop({ type: Boolean, default: false })
  isEmailverified?: boolean;

  @Prop({ type: String, default: 'no-code' })
  verificationCode?: string;

  @Prop({ type: Date, default: () => new Date() })
  verificationCodeExpires?: Date;

  @Prop({ type: String, default: null })
  resetPasswordToken?: string;

  @Prop({ type: Date, default: null })
  resetPasswordExpires?: Date;
}

export const userModel = SchemaFactory.createForClass(user);

userModel.index({ email: 1, username: 1 }, { unique: true });
