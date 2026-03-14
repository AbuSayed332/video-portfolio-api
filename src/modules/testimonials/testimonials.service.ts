import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Testimonial, TestimonialDocument } from './schemas/testimonial.schema';
import { CreateTestimonialDto } from './dto/create-testimonial.dto';

@Injectable()
export class TestimonialsService {
  constructor(
    @InjectModel(Testimonial.name)
    private readonly testimonialModel: Model<TestimonialDocument>,
  ) {}

  async create(createTestimonialDto: CreateTestimonialDto): Promise<Testimonial> {
    const testimonial = new this.testimonialModel(createTestimonialDto);
    return await testimonial.save();
  }

  async findAll(): Promise<Testimonial[]> {
    return await this.testimonialModel
      .find()
      .sort({ createdAt: -1 })
      .exec();
  }

  async findFeatured(): Promise<Testimonial[]> {
    return await this.testimonialModel
      .find({ featured: true })
      .sort({ createdAt: -1 })
      .exec();
  }

  async findOne(id: string): Promise<Testimonial> {
    const testimonial = await this.testimonialModel.findById(id).exec();
    if (!testimonial) {
      throw new NotFoundException(`Testimonial with ID ${id} not found`);
    }
    return testimonial;
  }

  async update(id: string, updateTestimonialDto: Partial<CreateTestimonialDto>): Promise<Testimonial> {
    const updatedTestimonial = await this.testimonialModel
      .findByIdAndUpdate(id, updateTestimonialDto, { new: true })
      .exec();
    
    if (!updatedTestimonial) {
      throw new NotFoundException(`Testimonial with ID ${id} not found`);
    }
    return updatedTestimonial;
  }

  async remove(id: string): Promise<void> {
    const result = await this.testimonialModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Testimonial with ID ${id} not found`);
    }
  }

  async findByRating(minRating: number = 4): Promise<Testimonial[]> {
    return await this.testimonialModel
      .find({ rating: { $gte: minRating } })
      .sort({ rating: -1, createdAt: -1 })
      .exec();
  }
}
