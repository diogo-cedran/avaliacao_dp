import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Log extends Document {
  @Prop({ required: true })
  route: string;

  @Prop({ required: true })
  method: string;

  @Prop({ required: true })
  responseTime: number;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const LogSchema = SchemaFactory.createForClass(Log);
