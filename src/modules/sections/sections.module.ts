import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SectionModel } from './models/section.model';
import { SectionsController } from './controllers/sections.controller';
import { SectionService } from './services/section.service';

@Module({
  imports: [TypeOrmModule.forFeature([SectionModel])],
  controllers: [SectionsController],
  providers: [SectionService],
  exports: [SectionService],
})
export class SectionsModule {}
