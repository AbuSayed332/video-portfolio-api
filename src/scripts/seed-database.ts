import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { PortfolioService } from '../modules/portfolio/portfolio.service';
import { TestimonialsService } from '../modules/testimonials/testimonials.service';
import { SkillsService } from '../modules/skills/skills.service';
import { ProfileService } from '../modules/profile/profile.service';
import { Logger } from '@nestjs/common';

async function seedDatabase() {
  const logger = new Logger('DatabaseSeed');
  const app = await NestFactory.createApplicationContext(AppModule);
  
  const portfolioService = app.get(PortfolioService);
  const testimonialsService = app.get(TestimonialsService);
  const skillsService = app.get(SkillsService);
  const profileService = app.get(ProfileService);

  try {
    logger.log('🌱 Seeding MongoDB database...');

    // Seed portfolio items
    const portfolioItems = [
      {
        title: 'Corporate Brand Video',
        category: 'Commercial',
        type: 'video' as const,
        thumbnail: '/images/portfolio/video1.jpg',
        videoUrl: 'https://vimeo.com/123456789',
        description: 'A dynamic corporate brand video showcasing company values and culture through compelling storytelling and motion graphics.',
        client: 'TechCorp Solutions',
        duration: '2:30',
        tags: ['Motion Graphics', 'Corporate', 'Brand Identity'],
        year: 2024,
        software: ['After Effects', 'Premiere Pro', 'Photoshop'],
        featured: true,
      },
      {
        title: 'Music Video - Indie Artist',
        category: 'Music Video',
        type: 'video' as const,
        thumbnail: '/images/portfolio/video2.jpg',
        videoUrl: 'https://youtube.com/watch?v=example',
        description: 'Creative music video with experimental visual effects and color grading that perfectly complements the artist\'s unique sound.',
        client: 'Luna Eclipse',
        duration: '3:45',
        tags: ['Music Video', 'Color Grading', 'Visual Effects'],
        year: 2024,
        software: ['DaVinci Resolve', 'After Effects'],
        featured: true,
      },
      {
        title: 'Animated Logo Design',
        category: 'Motion Graphics',
        type: 'graphics' as const,
        thumbnail: '/images/portfolio/graphics1.jpg',
        videoUrl: 'https://vimeo.com/789012345',
        description: 'Sleek animated logo reveal with particle effects and smooth transitions for a tech startup\'s brand identity.',
        client: 'StartupX',
        duration: '0:15',
        tags: ['Logo Animation', '2D Animation', 'Brand Identity'],
        year: 2023,
        software: ['After Effects', 'Illustrator'],
        featured: false,
      },
      {
        title: 'Social Media Campaign',
        category: 'Social Media',
        type: 'graphics' as const,
        thumbnail: '/images/portfolio/graphics2.jpg',
        videoUrl: 'https://vimeo.com/345678901',
        description: 'Series of animated social media posts and stories for a fashion brand\'s product launch campaign.',
        client: 'Urban Style Co.',
        duration: '0:30',
        tags: ['Social Media', 'Animation', 'Fashion'],
        year: 2023,
        software: ['After Effects', 'Photoshop'],
        featured: false,
      },
      {
        title: 'Documentary Feature',
        category: 'Documentary',
        type: 'video' as const,
        thumbnail: '/images/portfolio/video1.jpg',
        videoUrl: 'https://vimeo.com/567890123',
        description: 'Feature-length documentary about environmental conservation with powerful storytelling and cinematic visuals.',
        client: 'Green Earth Foundation',
        duration: '45:00',
        tags: ['Documentary', 'Environmental', 'Storytelling'],
        year: 2023,
        software: ['Premiere Pro', 'DaVinci Resolve', 'Audition'],
        featured: true,
      },
      {
        title: 'Wedding Highlight Reel',
        category: 'Wedding',
        type: 'video' as const,
        thumbnail: '/images/portfolio/video2.jpg',
        videoUrl: 'https://youtube.com/watch?v=wedding123',
        description: 'Emotional wedding highlight reel capturing the joy and romance of a couple\'s special day with cinematic storytelling.',
        client: 'Sarah & Michael',
        duration: '4:20',
        tags: ['Wedding', 'Cinematic', 'Emotional'],
        year: 2024,
        software: ['Premiere Pro', 'After Effects'],
        featured: false,
      },
    ];

    logger.log('📁 Creating portfolio items...');
    for (const item of portfolioItems) {
      await portfolioService.create(item);
    }

    // Seed testimonials
    const testimonials = [
      {
        name: 'Sarah Johnson',
        position: 'Marketing Director',
        company: 'TechCorp Solutions',
        avatar: '/images/testimonials/sarah.jpg',
        rating: 5,
        text: 'Working with this video editor was absolutely fantastic. They took our vision and transformed it into something even better than we imagined.',
        project: 'Corporate Brand Video',
        featured: true,
      },
      {
        name: 'Luna Eclipse',
        position: 'Independent Artist',
        company: 'Music Industry',
        avatar: '/images/testimonials/luna.jpg',
        rating: 5,
        text: 'My music video came out absolutely stunning! The visual effects perfectly complemented my sound.',
        project: 'Music Video - Indie Artist',
        featured: true,
      },
      {
        name: 'Marcus Rodriguez',
        position: 'Creative Director',
        company: 'Urban Style Co.',
        avatar: '/images/testimonials/marcus.jpg',
        rating: 5,
        text: 'The social media campaign videos exceeded all expectations. Each piece was perfectly crafted for our target audience.',
        project: 'Social Media Campaign',
        featured: true,
      },
    ];

    logger.log('💬 Creating testimonials...');
    for (const testimonial of testimonials) {
      await testimonialsService.create(testimonial);
    }

    // Seed skills
    const skills = [
      {
        name: 'Adobe Premiere Pro',
        category: 'Technical Skills',
        proficiency: 95,
        icon: '🎬',
        description: 'Advanced video editing, multicam editing, color correction, and audio mixing',
        yearsOfExperience: 6,
      },
      {
        name: 'Adobe After Effects',
        category: 'Technical Skills',
        proficiency: 90,
        icon: '✨',
        description: 'Complex motion graphics, visual effects, compositing, and 2D animation',
        yearsOfExperience: 5,
      },
      {
        name: 'DaVinci Resolve',
        category: 'Technical Skills',
        proficiency: 85,
        icon: '🎨',
        description: 'Professional color grading, color correction, and advanced post-production',
        yearsOfExperience: 4,
      },
      {
        name: 'Storytelling',
        category: 'Creative Skills',
        proficiency: 92,
        icon: '📚',
        description: 'Crafting compelling narratives and emotional arcs',
        yearsOfExperience: 6,
      },
      {
        name: 'Color Theory',
        category: 'Creative Skills',
        proficiency: 88,
        icon: '🌈',
        description: 'Understanding color psychology and visual aesthetics',
        yearsOfExperience: 5,
      },
      {
        name: 'Project Management',
        category: 'Workflow Skills',
        proficiency: 88,
        icon: '📋',
        description: 'Managing timelines, deadlines, and client expectations',
        yearsOfExperience: 4,
      },
    ];

    logger.log('🎯 Creating skills...');
    for (const skill of skills) {
      await skillsService.create(skill);
    }

    // Seed profile
    logger.log('👤 Creating profile...');
    await profileService.seedProfile();

    logger.log('✅ MongoDB database seeded successfully!');
  } catch (error) {
    logger.error('❌ Error seeding database:', error);
  } finally {
    await app.close();
  }
}

// Run the seed script
if (require.main === module) {
  seedDatabase();
}

export { seedDatabase };