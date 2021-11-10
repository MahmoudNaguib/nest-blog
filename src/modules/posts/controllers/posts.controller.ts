import { Controller, Get, Param, Request } from '@nestjs/common';
import { Pagination } from '../../../paginate';
/////////////////////////////////////////////////
import { PostService } from '../services/post.service';
import { PostModel as Model } from '../models/post.model';
///////////////////////////////////////////////////
import { PostResource } from '../resources/post.resource';

@Controller('api/posts')
export class PostsController {
  constructor(private readonly service: PostService) {}
  @Get()
  async index(@Request() request): Promise<Pagination<Model>> {
    const rows = await this.service.findAllWithPaginate(request);
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
}
