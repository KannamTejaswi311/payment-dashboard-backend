import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PaymentDocument = Payment & Document;

@Schema({ timestamps: true })
export class Payment {
  @Prop({ required: true })
  amount: number;

  @Prop({ required: true })
  receiver: string;

  @Prop({ required: true, enum: ['success', 'failed', 'pending'] })
  status: string;

  @Prop({ required: true, enum: ['upi', 'card', 'netbanking', 'cash'] })
  method: string;

  // ✅ Add this manually for TypeScript
  createdAt?: Date;
  updatedAt?: Date;
}

export const PaymentSchema = SchemaFactory.createForClass(Payment);
