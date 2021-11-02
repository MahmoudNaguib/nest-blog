import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Request,
  Body,
  ClassSerializerInterceptor,
  UseInterceptors,
} from '@nestjs/common';
import { Pagination } from '../../../paginate';
/////////////////////////////////////////////////
import { CreateRequest } from '../requests/create.request';
import { UpdateRequest } from '../requests/update.request';
import { PostService } from '../services/post.service';
import { PostModel } from '../models/post.model';
///////////////////////////////////////////////////
import { PostResource } from '../resources/post.resource';

@Controller('api/my-posts')
@UseInterceptors(ClassSerializerInterceptor)
export class MyPostsController {
  constructor(private readonly service: PostService) {}
  @Get()
  async index(@Request() request): Promise<Pagination<PostModel>> {
    const rows = await this.service.findAllAndPaginate(request, {
      user: request.user,
    });
    rows.data = rows.data.map(function (item) {
      return new PostResource(item).toArray();
    });
    return rows;
  }

  @Get(':id')
  async show(@Param('id') id) {
    const row = await this.service.findOne(id);
    return { data: new PostResource(row).toArray() };
  }

  @Post()
  async create(@Body() record: CreateRequest, @Request() request) {
    record.user = request.user;
    const row = await this.service.create(record);
    return {
      message: 'Created successfully',
      data: new PostResource(row).toArray(),
    };
  }

  @Patch(':id')
  async update(@Param('id') id, @Body() record: UpdateRequest) {
    const row = await this.service.update(id, record);
    return {
      message: 'Updated successfully',
      data: new PostResource(row).toArray(),
    };
  }

  @Delete(':id')
  async delete(@Param('id') id) {
    const row = await this.service.remove(id);
    return { message: 'Deleted successfully' };
  }
}
