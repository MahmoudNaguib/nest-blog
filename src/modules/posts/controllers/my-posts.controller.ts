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
import { Pagination } from '../../../paginate';
import { CreateRequest } from '../requests/create.request';
import { UpdateRequest } from '../requests/update.request';
import { PostService as Service } from '../services/post.service';
import { PostModel as Model } from '../models/post.model';
import { PostResource as Resource } from '../resources/post.resource';
import { SectionModel } from '../../sections/models/section.model';

@Controller('api/my-posts')
export class MyPostsController {
  constructor(private readonly service: Service) {}

  @Get()
  async index(@Request() request): Promise<Pagination> {
    const rows = await this.service.findAllWithPaginate(request, {
      user: request.user,
    });
    rows.data = rows.data.map(function (item) {
      return new Resource(item).toArray();
    });
    return rows;
  }

  @Get(':id')
  async show(@Param('id') id) {
    const row = await this.service.findOne(id);
    return { data: new Resource(row).toArray() };
  }

  @Post()
  async create(@Body() record: CreateRequest, @Request() request) {
    record.user = request.user;
    record.section = await getRepository(SectionModel).findOne({
      id: request.body.section_id,
    });
    const row = await this.service.create(record);
    return {
      message: 'Created successfully',
      data: new Resource(row).toArray(),
    };
  }

  @Patch(':id')
  async update(@Param('id') id, @Body() record: UpdateRequest) {
    const row = await this.service.update(id, record);
    return {
      message: 'Updated successfully',
      data: new Resource(row).toArray(),
    };
  }

  @Delete(':id')
  async delete(@Param('id') id) {
    const row = await this.service.remove(id);
    return { message: 'Deleted successfully' };
  }
}
