import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentModel } from './models/comment.model';
import { CommentsController } from './controllers/comments.controller';
import { CommentService } from './services/comment.service';

@Module({
  imports: [TypeOrmModule.forFeature([CommentModel])],
  controllers: [CommentsController],
  providers: [CommentService],
  exports: [CommentService],
})
export class CommentsModule {}
