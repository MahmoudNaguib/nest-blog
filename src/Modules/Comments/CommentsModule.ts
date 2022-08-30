import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileSystemStoredFile, NestjsFormDataModule } from 'nestjs-form-data';
///////////////////////////////////////////////////////
import { CommentModel } from './Models/CommentModel';
import { CommentsController } from './Controllers/CommentsController';
import { CommentService } from './Services/CommentService';

@Module({
  imports: [
    NestjsFormDataModule.config({
      storage: FileSystemStoredFile,
      fileSystemStoragePath: 'public/uploads',
    }),
    TypeOrmModule.forFeature([CommentModel]),
  ],
  controllers: [CommentsController],
  providers: [CommentService],
  exports: [CommentService],
})
export class CommentsModule {}
