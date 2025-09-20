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
import { SkillsService } from './skills.service';
import { CreateSkillDto } from './dto/create-skill.dto';
import { ApiKeyGuard } from '../../common/gurads/api-key.guard';

@ApiTags('skills')
@Controller('skills')
export class SkillsController {
  constructor(private readonly skillsService: SkillsService) {}

  @Post()
  @UseGuards(ApiKeyGuard)
  @ApiSecurity('admin-key')
  @ApiOperation({ summary: 'Create a new skill' })
  @ApiResponse({ status: 201, description: 'Skill created successfully' })
  create(@Body() createSkillDto: CreateSkillDto) {
    return this.skillsService.create(createSkillDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all skills organized by category' })
  @ApiResponse({ status: 200, description: 'Skills retrieved successfully' })
  findAll() {
    return this.skillsService.findAll();
  }

  @Get('top')
  @ApiOperation({ summary: 'Get top skills by proficiency' })
  @ApiQuery({ name: 'limit', required: false, description: 'Number of skills to return' })
  @ApiResponse({ status: 200, description: 'Top skills retrieved successfully' })
  findTopSkills(@Query('limit') limit?: string) {
    const limitNumber = limit ? parseInt(limit, 10) : 6;
    return this.skillsService.findTopSkills(limitNumber);
  }

  @Get('category/:category')
  @ApiOperation({ summary: 'Get skills by category' })
  @ApiResponse({ status: 200, description: 'Skills by category retrieved successfully' })
  findByCategory(@Param('category') category: string) {
    return this.skillsService.findByCategory(category);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a skill by ID' })
  @ApiResponse({ status: 200, description: 'Skill retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Skill not found' })
  findOne(@Param('id') id: string) {
    return this.skillsService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(ApiKeyGuard)
  @ApiSecurity('admin-key')
  @ApiOperation({ summary: 'Update a skill' })
  @ApiResponse({ status: 200, description: 'Skill updated successfully' })
  @ApiResponse({ status: 404, description: 'Skill not found' })
  update(
    @Param('id') id: string,
    @Body() updateSkillDto: Partial<CreateSkillDto>,
  ) {
    return this.skillsService.update(id, updateSkillDto);
  }

  @Delete(':id')
  @UseGuards(ApiKeyGuard)
  @ApiSecurity('admin-key')
  @ApiOperation({ summary: 'Delete a skill' })
  @ApiResponse({ status: 200, description: 'Skill deleted successfully' })
  @ApiResponse({ status: 404, description: 'Skill not found' })
  remove(@Param('id') id: string) {
    return this.skillsService.remove(id);
  }
}