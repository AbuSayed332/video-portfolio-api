import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('portfolio_items')
export class PortfolioItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  category: string;

  @Column({
    type: 'enum',
    enum: ['video', 'graphics'],
  })
  type: 'video' | 'graphics';

  @Column({ nullable: true })
  thumbnail: string;

  @Column({ name: 'video_url', nullable: true })
  videoUrl: string;

  @Column('text', { nullable: true })
  description: string;

  @Column({ nullable: true })
  client: string;

  @Column({ nullable: true })
  duration: string;

  @Column('json', { nullable: true })
  tags: string[];

  @Column({ nullable: true })
  year: number;

  @Column('json', { nullable: true })
  software: string[];

  @Column({ default: false })
  featured: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
