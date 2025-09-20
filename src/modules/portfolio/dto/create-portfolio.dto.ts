import {
  IsString,
  IsEnum,
  IsOptional,
  IsArray,
  IsNumber,
  IsBoolean,
  IsUrl,
  MaxLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePortfolioDto {
  @ApiProperty({ description: 'Project title' })
  @IsString()
  @MaxLength(255)
  title: string;

  @ApiProperty({ description: 'Project category' })
  @IsString()
  @MaxLength(100)
  category: string;

  @ApiProperty({ description: 'Project type', enum: ['video', 'graphics'] })
  @IsEnum(['video', 'graphics'])
  type: 'video' | 'graphics';

  @ApiProperty({ description: 'Thumbnail image URL', required: false })
  @IsOptional()
  @IsUrl()
  thumbnail?: string;

  @ApiProperty({ description: 'Video URL', required: false })
  @IsOptional()
  @IsUrl()
  videoUrl?: string;

  @ApiProperty({ description: 'Project description', required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ description: 'Client name', required: false })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  client?: string;

  @ApiProperty({ description: 'Project duration', required: false })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  duration?: string;

  @ApiProperty({ description: 'Project tags', required: false, type: [String] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];

  @ApiProperty({ description: 'Project year', required: false })
  @IsOptional()
  @IsNumber()
  year?: number;

  @ApiProperty({ description: 'Software used', required: false, type: [String] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  software?: string[];

  @ApiProperty({ description: 'Featured project', required: false, default: false })
  @IsOptional()
  @IsBoolean()
  featured?: boolean;
}
