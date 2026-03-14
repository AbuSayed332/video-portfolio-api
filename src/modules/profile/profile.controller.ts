import { Controller, Get, Patch, Body, UseGuards, Post } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiSecurity } from '@nestjs/swagger';
import { ProfileService } from './profile.service';

import { ApiKeyGuard } from '../../common/guards/api-key.guard';


import { Profile } from './schemas/profile.schema';

@ApiTags('profile')
@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get()
  @ApiOperation({ summary: 'Get profile information' })
  @ApiResponse({ status: 200, description: 'Profile retrieved successfully' })
  getProfile(): Promise<Profile> {
    return this.profileService.getProfile();
  }

  @Patch()
  @UseGuards(ApiKeyGuard)
  @ApiSecurity('admin-key')
  @ApiOperation({ summary: 'Update profile information' })
  @ApiResponse({ status: 200, description: 'Profile updated successfully' })
  updateProfile(@Body() updateData: Partial<Profile>): Promise<Profile> {
    return this.profileService.updateProfile(updateData);
  }

  @Post('seed')
  @UseGuards(ApiKeyGuard)
  @ApiSecurity('admin-key')
  @ApiOperation({ summary: 'Seed initial profile data' })
  @ApiResponse({ status: 201, description: 'Profile seeded successfully' })
  seedProfile(): Promise<Profile> {
    return this.profileService.seedProfile();
  }
}