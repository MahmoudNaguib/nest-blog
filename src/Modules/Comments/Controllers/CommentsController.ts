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
import { getRepository } from 'typeorm';
import { Pagination } from '../../../Paginate';
import { FormDataRequest } from 'nestjs-form-data';
/////////////////////////////////////
import { CreateRequest } from '../Requests/CreateRequest';
import { CommentModel as Model } from '../Models/CommentModel';
import { CommentService as Service } from '../Services/CommentService';
import { CommentResource as Resource } from '../Resources/CommentResource';
import { PostModel } from '../../Posts/Models/PostModel';

@Controller('api/comments')
export class CommentsController {
  constructor(private readonly service: Service) {}

  @Get()
  async index(@Request() request): Promise<Pagination<Model>> {
    const rows = await this.service.findAllWithPaginate(request);
    rows.data = rows.data.map(function (item) {
      return new Resource(item).toArray();
    });
    return rows;
  }

  @Post()
  @FormDataRequest()
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
