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
import { ApiTags, ApiOperation, ApiResponse, ApiSecurity, ApiParam, ApiQuery } from '@nestjs/swagger';
import { PortfolioService } from './portfolio.service';
import { CreatePortfolioDto } from './dto/create-portfolio.dto';
import { UpdatePortfolioDto } from './dto/update-portfolio.dto';
import { ApiKeyGuard } from '../../common/gurads/api-key.guard';
import { PortfolioItem } from './schemas/portfolio.schema';

@ApiTags('portfolio')
@Controller('portfolio')
export class PortfolioController {
  constructor(private readonly portfolioService: PortfolioService) {}

  @Post()
  @UseGuards(ApiKeyGuard)
  @ApiSecurity('admin-key')
  @ApiOperation({ summary: 'Create a new portfolio item' })
  @ApiResponse({ status: 201, description: 'Portfolio item created successfully' })
  create(@Body() createPortfolioDto: CreatePortfolioDto): Promise<PortfolioItem> {
    return this.portfolioService.create(createPortfolioDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all portfolio items organized by type' })
  @ApiResponse({ status: 200, description: 'Portfolio items retrieved successfully' })
  findAll() {
    return this.portfolioService.findAll();
  }

  @Get('featured')
  @ApiOperation({ summary: 'Get featured portfolio items' })
  @ApiResponse({ status: 200, description: 'Featured items retrieved successfully' })
  findFeatured(): Promise<PortfolioItem[]> {
    return this.portfolioService.findFeatured();
  }

  @Get('type/:type')
  @ApiOperation({ summary: 'Get portfolio items by type (video/graphics)' })
  @ApiParam({ name: 'type', enum: ['video', 'graphics'] })
  @ApiResponse({ status: 200, description: 'Portfolio items by type retrieved successfully' })
  findByType(@Param('type') type: 'video' | 'graphics'): Promise<PortfolioItem[]> {
    return this.portfolioService.findByType(type);
  }

  @Get('category/:category')
  @ApiOperation({ summary: 'Get portfolio items by category' })
  @ApiResponse({ status: 200, description: 'Portfolio items by category retrieved successfully' })
  findByCategory(@Param('category') category: string): Promise<PortfolioItem[]> {
    return this.portfolioService.findByCategory(category);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a portfolio item by ID' })
  @ApiResponse({ status: 200, description: 'Portfolio item retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Portfolio item not found' })
  findOne(@Param('id') id: string): Promise<PortfolioItem> {
    return this.portfolioService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(ApiKeyGuard)
  @ApiSecurity('admin-key')
  @ApiOperation({ summary: 'Update a portfolio item' })
  @ApiResponse({ status: 200, description: 'Portfolio item updated successfully' })
  @ApiResponse({ status: 404, description: 'Portfolio item not found' })
  update(
    @Param('id') id: string,
    @Body() updatePortfolioDto: UpdatePortfolioDto,
  ): Promise<PortfolioItem> {
    return this.portfolioService.update(id, updatePortfolioDto);
  }

  @Delete(':id')
  @UseGuards(ApiKeyGuard)
  @ApiSecurity('admin-key')
  @ApiOperation({ summary: 'Delete a portfolio item' })
  @ApiResponse({ status: 200, description: 'Portfolio item deleted successfully' })
  @ApiResponse({ status: 404, description: 'Portfolio item not found' })
  remove(@Param('id') id: string): Promise<void> {
    return this.portfolioService.remove(id);
  }
}