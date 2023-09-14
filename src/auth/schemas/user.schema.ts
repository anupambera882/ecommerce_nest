import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsEnum } from 'class-validator';

export enum Role {
  SUPER_ADMIN = 'superAdmin',
  LICENSE = 'License',
  USER = 'User',
  ADMIN = 'Admin',
}
@Schema({
  timestamps: true,
})
export class User {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, unique: [true, 'Duplicate email entered'] })
  email: string;

  @Prop({ type: String, unique: [true, 'Duplicate phone entered'] })
  phone: string;

  @Prop({ type: String, required: true })
  password: string;

  @Prop({ enum: Role, required: true, default: Role.USER })
  @IsEnum(Role)
  role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
