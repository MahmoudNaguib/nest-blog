import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Request,
  Body,
} from '@nestjs/common';
import { Pagination } from '../../../paginate';
import { CreateRequest } from '../requests/create.request';
import { CommentService as Service } from '../services/comment.service';
import { CommentModel as Model } from '../models/comment.model';
import { CommentResource as Resource } from '../resources/comment.resource';
import { getRepository } from 'typeorm';
import { SectionModel } from '../../sections/models/section.model';
import { PostModel } from '../../posts/models/post.model';

@Controller('api/comments')
export class CommentsController {
  constructor(private readonly service: Service) {}

  @Get()
  async index(@Request() request): Promise<Pagination> {
    const rows = await this.service.findAllWithPaginate(request);
    rows.data = rows.data.map(function (item) {
      return new Resource(item).toArray();
    });
    return rows;
  }

  @Post()
  async create(@Body() record: CreateRequest, @Request() request) {
    record.user = request.user;
    record.post = await getRepository(PostModel).findOne({
      id: request.body.post_id,
    });
    const row = await this.service.create(record);
    return {
      message: 'Created successfully',
      data: new Resource(row).toArray(),
    };
  }

  @Delete(':id')
  async delete(@Param('id') id) {
    const row = await this.service.remove(id);
    return { message: 'Deleted successfully' };
  }
}
