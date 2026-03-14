import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiSecurity, ApiQuery } from '@nestjs/swagger';
import { TestimonialsService } from './testimonials.service';
import { CreateTestimonialDto } from './dto/create-testimonial.dto';
import { ApiKeyGuard } from '../../common/guards/api-key.guard';

@ApiTags('testimonials')
@Controller('testimonials')
export class TestimonialsController {
  constructor(private readonly testimonialsService: TestimonialsService) {}

  @Post()
  @UseGuards(ApiKeyGuard)
  @ApiSecurity('admin-key')
  @ApiOperation({ summary: 'Create a new testimonial' })
  @ApiResponse({ status: 201, description: 'Testimonial created successfully' })
  create(@Body() createTestimonialDto: CreateTestimonialDto) {
    return this.testimonialsService.create(createTestimonialDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all testimonials' })
  @ApiResponse({ status: 200, description: 'Testimonials retrieved successfully' })
  findAll() {
    return this.testimonialsService.findAll();
  }

  @Get('featured')
  @ApiOperation({ summary: 'Get featured testimonials' })
  @ApiResponse({ status: 200, description: 'Featured testimonials retrieved successfully' })
  findFeatured() {
    return this.testimonialsService.findFeatured();
  }

  @Get('rating')
  @ApiOperation({ summary: 'Get testimonials by minimum rating' })
  @ApiQuery({ name: 'min', required: false, description: 'Minimum rating (1-5)' })
  @ApiResponse({ status: 200, description: 'Testimonials by rating retrieved successfully' })
  findByRating(@Query('min') minRating?: string) {
    const min = minRating ? parseInt(minRating, 10) : 4;
    return this.testimonialsService.findByRating(min);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a testimonial by ID' })
  @ApiResponse({ status: 200, description: 'Testimonial retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Testimonial not found' })
  findOne(@Param('id') id: string) {
    return this.testimonialsService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(ApiKeyGuard)
  @ApiSecurity('admin-key')
  @ApiOperation({ summary: 'Update a testimonial' })
  @ApiResponse({ status: 200, description: 'Testimonial updated successfully' })
  @ApiResponse({ status: 404, description: 'Testimonial not found' })
  update(
    @Param('id') id: string,
    @Body() updateTestimonialDto: Partial<CreateTestimonialDto>,
  ) {
    return this.testimonialsService.update(id, updateTestimonialDto);
  }

  @Delete(':id')
  @UseGuards(ApiKeyGuard)
  @ApiSecurity('admin-key')
  @ApiOperation({ summary: 'Delete a testimonial' })
  @ApiResponse({ status: 200, description: 'Testimonial deleted successfully' })
  @ApiResponse({ status: 404, description: 'Testimonial not found' })
  remove(@Param('id') id: string) {
    return this.testimonialsService.remove(id);
  }
}