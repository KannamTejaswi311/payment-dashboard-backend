import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: 'admin' }) // optional: 'admin' or 'viewer'
  role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
