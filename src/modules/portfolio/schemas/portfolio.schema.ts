import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PortfolioDocument = PortfolioItem & Document;

@Schema({ timestamps: true })
export class PortfolioItem {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  category: string;

  @Prop({ required: true, enum: ['video', 'graphics'] })
  type: 'video' | 'graphics';

  @Prop()
  thumbnail: string;

  @Prop()
  videoUrl: string;

  @Prop()
  description: string;

  @Prop()
  client: string;

  @Prop()
  duration: string;

  @Prop([String])
  tags: string[];

  @Prop()
  year: number;

  @Prop([String])
  software: string[];

  @Prop({ default: false })
  featured: boolean;
}

export const PortfolioSchema = SchemaFactory.createForClass(PortfolioItem);