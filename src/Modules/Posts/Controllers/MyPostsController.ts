import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Request,
  Body, Put,
} from '@nestjs/common';
import { FormDataRequest } from 'nestjs-form-data';
import { getRepository } from 'typeorm';
import { Pagination } from '../../../Paginate';
////////////////////////////////////////////////////////
import { CreateRequest } from '../Requests/CreateRequest';
import { UpdateRequest } from '../Requests/UpdateRequest';
import { PostService as Service } from '../Services/PostService';
import { PostModel as Model } from '../Models/PostModel';
import { PostResource as Resource } from '../Resources/PostResource';
import { SectionModel } from '../../Sections/Models/SectionModel';

@Controller('api/my-posts')
export class MyPostsController {
  constructor(private readonly service: Service) {}

  @Get()
  async index(@Request() request): Promise<Pagination<Model>> {
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
  @FormDataRequest()
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

  @Put(':id')
  @FormDataRequest()
  async update(
    @Param('id') id,
    @Body() record: UpdateRequest,
    @Request() request,
  ) {
    record.user = request.user;
    record.section = await getRepository(SectionModel).findOne({
      id: request.body.section_id,
    });
    const row = await this.service.update(id, record);
    return {
      message: 'Updated successfully',
      data: new Resource(row).toArray(),
    };
  }

  @Delete(':id')
  async delete(@Param('id') id) {
    if (await this.service.remove(id)) {
      return { message: 'Deleted successfully' };
    }
  }
}
