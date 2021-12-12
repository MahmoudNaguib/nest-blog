import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileSystemStoredFile, NestjsFormDataModule } from 'nestjs-form-data';
/////////////////////////////////////////////////////////////////////
import { SectionModel } from './models/section.model';
import { SectionsController } from './controllers/sections.controller';
import { SectionService } from './services/section.service';

@Module({
  imports: [
    NestjsFormDataModule.config({
      storage: FileSystemStoredFile,
      fileSystemStoragePath: 'uploads',
    }),
    TypeOrmModule.forFeature([SectionModel]),
  ],
  controllers: [SectionsController],
  providers: [SectionService],
  exports: [SectionService],
})
export class SectionsModule {}
