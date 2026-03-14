import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PortfolioItem, PortfolioDocument } from './schemas/portfolio.schema';
import { CreatePortfolioDto } from './dto/create-portfolio.dto';
import { UpdatePortfolioDto } from './dto/update-portfolio.dto';

@Injectable()
export class PortfolioService {
  constructor(
    @InjectModel(PortfolioItem.name)
    private readonly portfolioModel: Model<PortfolioDocument>,
  ) {}

  async create(createPortfolioDto: CreatePortfolioDto): Promise<PortfolioItem> {
    const portfolioItem = new this.portfolioModel(createPortfolioDto);
    return await portfolioItem.save();
  }

  async findAll(): Promise<{ video: PortfolioItem[]; graphics: PortfolioItem[] }> {
    const items = await this.portfolioModel
      .find()
      .sort({ createdAt: -1 })
      .exec();

    return {
      video: items.filter(item => item.type === 'video'),
      graphics: items.filter(item => item.type === 'graphics'),
    };
  }

  async findOne(id: string): Promise<PortfolioItem> {
    const item = await this.portfolioModel.findById(id).exec();
    if (!item) {
      throw new NotFoundException(`Portfolio item with ID ${id} not found`);
    }
    return item;
  }

  async findByCategory(category: string): Promise<PortfolioItem[]> {
    return await this.portfolioModel
      .find({ category })
      .sort({ createdAt: -1 })
      .exec();
  }

  async findFeatured(): Promise<PortfolioItem[]> {
    return await this.portfolioModel
      .find({ featured: true })
      .sort({ createdAt: -1 })
      .exec();
  }

  async update(id: string, updatePortfolioDto: UpdatePortfolioDto): Promise<PortfolioItem> {
    const updatedItem = await this.portfolioModel
      .findByIdAndUpdate(id, updatePortfolioDto, { new: true })
      .exec();
    
    if (!updatedItem) {
      throw new NotFoundException(`Portfolio item with ID ${id} not found`);
    }
    return updatedItem;
  }

  async remove(id: string): Promise<void> {
    const result = await this.portfolioModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Portfolio item with ID ${id} not found`);
    }
  }

  async findByType(type: 'video' | 'graphics'): Promise<PortfolioItem[]> {
    return await this.portfolioModel
      .find({ type })
      .sort({ createdAt: -1 })
      .exec();
  }
}