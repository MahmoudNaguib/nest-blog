import { Controller, Get, Param, Request } from '@nestjs/common';
import { Pagination } from '../../../Paginate';
/////////////////////////////////////////////////
import { PostModel as Model } from '../Models/PostModel';
import { PostService as Service } from '../Services/PostService';
import { PostResource as Resource } from '../Resources/PostResource';

@Controller('api/posts')
export class PostsController {
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
}
