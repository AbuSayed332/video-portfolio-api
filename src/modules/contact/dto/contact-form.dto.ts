import { IsString, IsEmail, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ContactFormDto {
  @ApiProperty({ description: 'Sender name' })
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  name: string;

  @ApiProperty({ description: 'Sender email' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'Message subject' })
  @IsString()
  @MinLength(5)
  @MaxLength(200)
  subject: string;

  @ApiProperty({ description: 'Message content' })
  @IsString()
  @MinLength(10)
  @MaxLength(2000)
  message: string;
}