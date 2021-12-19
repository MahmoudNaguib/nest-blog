import { Module } from '@nestjs/common';
import { FileSystemStoredFile, NestjsFormDataModule } from 'nestjs-form-data';
//////////////////////////////////////////////////////////////////
import { HomeController } from './home.controller';

@Module({
  imports: [
    NestjsFormDataModule.config({
      storage: FileSystemStoredFile,
      fileSystemStoragePath: 'public/uploads',
    }),
  ],
  controllers: [HomeController],
})
export class HomeModule {}
