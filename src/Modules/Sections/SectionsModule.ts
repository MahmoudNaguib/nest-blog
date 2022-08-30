import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileSystemStoredFile, NestjsFormDataModule } from 'nestjs-form-data';
/////////////////////////////////////////////////////////////////////
import { SectionModel } from './Models/SectionModel';
import { SectionsController } from './Controllers/SectionsController';
import { SectionService } from './Services/SectionService';

@Module({
  imports: [
    NestjsFormDataModule.config({
      storage: FileSystemStoredFile,
      fileSystemStoragePath: 'public/uploads',
    }),
    TypeOrmModule.forFeature([SectionModel]),
  ],
  controllers: [SectionsController],
  providers: [SectionService],
  exports: [SectionService],
})
export class SectionsModule {}
