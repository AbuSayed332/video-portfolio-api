import {
  IsString,
  IsOptional,
  IsNumber,
  IsBoolean,
  Max,
  Min,
  MaxLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTestimonialDto {
  @ApiProperty({ description: 'Client name' })
  @IsString()
  @MaxLength(255)
  name: string;

  @ApiProperty({ description: 'Client position', required: false })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  position?: string;

  @ApiProperty({ description: 'Client company', required: false })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  company?: string;

  @ApiProperty({ description: 'Avatar URL', required: false })
  @IsOptional()
  @IsString()
  avatar?: string;

  @ApiProperty({ description: 'Rating (1-5)', default: 5 })
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(5)
  rating?: number;

  @ApiProperty({ description: 'Testimonial text' })
  @IsString()
  text: string;

  @ApiProperty({ description: 'Related project', required: false })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  project?: string;

  @ApiProperty({ description: 'Featured testimonial', default: false })
  @IsOptional()
  @IsBoolean()
  featured?: boolean;
}