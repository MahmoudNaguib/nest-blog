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
import { UpdateRequest } from '../requests/update.request';
import { SectionService as Service } from '../services/section.service';
import { SectionModel as Model } from '../models/section.model';
import { SectionResource as Resource } from '../resources/section.resource';

@Controller('api/my-posts')
export class SectionsController {
  constructor(private readonly service: Service) {}
  @Get()
  async index(@Request() request): Promise<Pagination<Model>> {
    const rows = await this.service.findAllWithPaginate(request);
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
