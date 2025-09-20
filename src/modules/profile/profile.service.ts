import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Profile, ProfileDocument } from './schemas/profile.schema';

@Injectable()
export class ProfileService {
  constructor(
    @InjectModel(Profile.name)
    private readonly profileModel: Model<ProfileDocument>,
  ) {}

  async getProfile(): Promise<Profile> {
    const profile = await this.profileModel.findOne().exec();
    if (!profile) {
      throw new NotFoundException('Profile not found. Please seed the database first.');
    }
    return profile;
  }

  async updateProfile(updateData: Partial<Profile>): Promise<Profile> {
    const profile = await this.profileModel.findOne().exec();
    if (!profile) {
      throw new NotFoundException('Profile not found. Please seed the database first.');
    }

    const updatedProfile = await this.profileModel
      .findByIdAndUpdate(profile._id, updateData, { new: true })
      .exec();

    if (!updatedProfile) {
      throw new NotFoundException('Profile not found');
    }

    return updatedProfile;
  }

  async seedProfile(): Promise<Profile> {
    const existingProfile = await this.profileModel.findOne().exec();
    if (existingProfile) {
      return existingProfile;
    }

    const profileData = {
      name: 'Alex Morgan',
      title: 'Creative Video Editor & Motion Graphics Designer',
      tagline: 'Bringing Stories to Life Through Visual Excellence',
      bio: 'Passionate video editor with 6+ years of experience creating compelling visual content for brands, artists, and storytellers worldwide.',
      location: 'Los Angeles, California',
      email: 'hello@alexmorgan.video',
      phone: '+1 (555) 123-4567',
      website: 'www.alexmorgan.video',
      social: [
        { name: 'Instagram', url: 'https://instagram.com/alexmorgan_video', icon: 'Instagram' },
        { name: 'YouTube', url: 'https://youtube.com/@alexmorgan_video', icon: 'Youtube' },
        { name: 'Vimeo', url: 'https://vimeo.com/alexmorgan', icon: 'Video' },
        { name: 'LinkedIn', url: 'https://linkedin.com/in/alexmorgan-video', icon: 'Linkedin' },
        { name: 'Twitter', url: 'https://twitter.com/alexmorgan_vid', icon: 'Twitter' },
      ],
      stats: {
        projectsCompleted: 150,
        yearsExperience: 6,
        clientsSatisfied: 85,
        awardsWon: 12,
        totalVideoViews: '2.5M+',
        averageProjectRating: 4.9,
      },
      services: [
        {
          id: 1,
          title: 'Video Editing',
          description: 'Professional video editing services for all types of content',
          icon: '🎬',
          features: ['Multi-cam editing', 'Color correction', 'Audio mixing', 'Transitions & effects', 'Format optimization'],
        },
        {
          id: 2,
          title: 'Motion Graphics',
          description: 'Eye-catching animations and motion graphics design',
          icon: '✨',
          features: ['Logo animations', '2D/3D animations', 'Text animations', 'Infographics', 'Visual effects'],
        },
        {
          id: 3,
          title: 'Color Grading',
          description: 'Professional color grading and visual enhancement',
          icon: '🎨',
          features: ['Cinematic looks', 'Brand consistency', 'Mood enhancement', 'Technical correction', 'Style matching'],
        },
        {
          id: 4,
          title: 'Post-Production',
          description: 'Complete post-production workflow management',
          icon: '⚙️',
          features: ['Project management', 'File organization', 'Quality control', 'Format delivery', 'Revisions handling'],
        },
      ],
      availability: {
        status: 'Available for new projects',
        responseTime: '24 hours',
        projectDelivery: '5-15 business days',
        revisions: '3 rounds included',
      },
      process: [
        { step: 1, title: 'Discovery', description: 'Understanding your vision, goals, and requirements' },
        { step: 2, title: 'Planning', description: 'Creating project timeline, style guide, and workflow' },
        { step: 3, title: 'Production', description: 'Editing, color grading, and motion graphics creation' },
        { step: 4, title: 'Review', description: 'Client feedback integration and refinements' },
        { step: 5, title: 'Delivery', description: 'Final exports in all required formats and resolutions' },
      ],
    };

    const profile = new this.profileModel(profileData);
    return await profile.save();
  }

  async deleteProfile(): Promise<void> {
    await this.profileModel.deleteMany({}).exec();
  }
}