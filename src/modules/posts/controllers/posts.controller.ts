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
/////////////////////////////////////////////////
import { PostService } from '../services/post.service';
import { PostModel } from '../models/post.model';
///////////////////////////////////////////////////
import { PostResource } from '../resources/post.resource';

@Controller('api/posts')
export class PostsController {
  constructor(private readonly service: PostService) {}
  @Get()
  async index(@Request() request): Promise<Pagination<PostModel>> {
    const rows = await this.service.findAllAndPaginate(request);
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
