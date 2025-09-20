import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Skill, SkillDocument } from './schemas/skill.schema';
import { CreateSkillDto } from './dto/create-skill.dto';

@Injectable()
export class SkillsService {
  constructor(
    @InjectModel(Skill.name)
    private readonly skillModel: Model<SkillDocument>,
  ) {}

  async create(createSkillDto: CreateSkillDto): Promise<Skill> {
    const skill = new this.skillModel(createSkillDto);
    return await skill.save();
  }

  async findAll(): Promise<{ technicalSkills: Skill[]; creativeSkills: Skill[]; workflowSkills: Skill[] }> {
    const skills = await this.skillModel
      .find()
      .sort({ proficiency: -1 })
      .exec();

    return {
      technicalSkills: skills.filter(skill => 
        skill.category === 'Technical Skills' || 
        skill.category === 'Video Editing' || 
        skill.category === 'Motion Graphics'
      ),
      creativeSkills: skills.filter(skill => 
        skill.category === 'Creative Skills' || 
        skill.category === 'Graphics'
      ),
      workflowSkills: skills.filter(skill => 
        skill.category === 'Workflow Skills' || 
        skill.category === 'Audio'
      ),
    };
  }

  async findByCategory(category: string): Promise<Skill[]> {
    return await this.skillModel
      .find({ category })
      .sort({ proficiency: -1 })
      .exec();
  }

  async findTopSkills(limit: number = 6): Promise<Skill[]> {
    return await this.skillModel
      .find()
      .sort({ proficiency: -1 })
      .limit(limit)
      .exec();
  }

  async findOne(id: string): Promise<Skill> {
    const skill = await this.skillModel.findById(id).exec();
    if (!skill) {
      throw new NotFoundException(`Skill with ID ${id} not found`);
    }
    return skill;
  }

  async update(id: string, updateSkillDto: Partial<CreateSkillDto>): Promise<Skill> {
    const updatedSkill = await this.skillModel
      .findByIdAndUpdate(id, updateSkillDto, { new: true })
      .exec();
    
    if (!updatedSkill) {
      throw new NotFoundException(`Skill with ID ${id} not found`);
    }
    return updatedSkill;
  }

  async remove(id: string): Promise<void> {
    const result = await this.skillModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Skill with ID ${id} not found`);
    }
  }
}