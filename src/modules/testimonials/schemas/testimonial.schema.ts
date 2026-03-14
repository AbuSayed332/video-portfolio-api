import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TestimonialDocument = Testimonial & Document;

@Schema({ timestamps: true })
export class Testimonial {
  @Prop({ required: true })
  name: string;

  @Prop()
  position: string;

  @Prop()
  company: string;

  @Prop()
  avatar: string;

  @Prop({ default: 5, min: 1, max: 5 })
  rating: number;

  @Prop({ required: true })
  text: string;

  @Prop()
  project: string;

  @Prop({ default: false })
  featured: boolean;
}

export const TestimonialSchema = SchemaFactory.createForClass(Testimonial);