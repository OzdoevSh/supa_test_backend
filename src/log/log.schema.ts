import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Log {
  @Prop({ required: true })
    userIp: string;

  @Prop({ required: true })
    requestType: string;

  @Prop({ required: true })
    executionTime: number;
}

export type LogDocument = Log & Document;

export const LogSchema = SchemaFactory.createForClass(Log);
