import { Controller, Get, Param, Request } from '@nestjs/common';
import { Pagination } from '../../../paginate';
/////////////////////////////////////////////////
import { PostModel as Model } from '../models/post.model';
import { PostService as Service } from '../services/post.service';
import { PostResource as Resource } from '../resources/post.resource';

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
