import {
  IsString,
  IsNumber,
  Min,
  Max,
  MaxLength,
  IsOptional,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSkillDto {
  @ApiProperty({ description: 'Skill name' })
  @IsString()
  @MaxLength(255)
  name: string;

  @ApiProperty({ description: 'Skill category' })
  @IsString()
  @MaxLength(100)
  category: string;

  @ApiProperty({ description: 'Proficiency level (0-100)' })
  @IsNumber()
  @Min(0)
  @Max(100)
  proficiency: number;

  @ApiProperty({ description: 'Icon identifier' })
  @IsString()
  @MaxLength(100)
  icon: string;

  @ApiProperty({ description: 'Skill description', required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ description: 'Years of experience', default: 0 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  yearsOfExperience?: number;
}