import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type SummaryDocument = HydratedDocument<Summary>;

@Schema({ timestamps: true })
export class Summary {
  @Prop()
  _id: string;

  @Prop()
  title: string;

  @Prop()
  source: string;

  @Prop()
  summaryText: string;

  @Prop()
  originalText: string;

  @Prop([String])
  tags: string[];

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const SummarySchema = SchemaFactory.createForClass(Summary);
