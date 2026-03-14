import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProfileDocument = Profile & Document;

@Schema({ timestamps: true })
export class Profile {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  tagline: string;

  @Prop({ required: true })
  bio: string;

  @Prop({ required: true })
  location: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  phone: string;

  @Prop({ required: true })
  website: string;

  @Prop([{
    name: String,
    url: String,
    icon: String
  }])
  social: Array<{
    name: string;
    url: string;
    icon: string;
  }>;

  @Prop({
    type: {
      projectsCompleted: Number,
      yearsExperience: Number,
      clientsSatisfied: Number,
      awardsWon: Number,
      totalVideoViews: String,
      averageProjectRating: Number,
    }
  })
  stats: {
    projectsCompleted: number;
    yearsExperience: number;
    clientsSatisfied: number;
    awardsWon: number;
    totalVideoViews: string;
    averageProjectRating: number;
  };

  @Prop([{
    id: Number,
    title: String,
    description: String,
    icon: String,
    features: [String]
  }])
  services: Array<{
    id: number;
    title: string;
    description: string;
    icon: string;
    features: string[];
  }>;

  @Prop({
    type: {
      status: String,
      responseTime: String,
      projectDelivery: String,
      revisions: String,
    }
  })
  availability: {
    status: string;
    responseTime: string;
    projectDelivery: string;
    revisions: string;
  };

  @Prop([{
    step: Number,
    title: String,
    description: String
  }])
  process: Array<{
    step: number;
    title: string;
    description: string;
  }>;
}

export const ProfileSchema = SchemaFactory.createForClass(Profile);