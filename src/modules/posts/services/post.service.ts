import { Injectable, NotFoundException, Request } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Pagination, PaginationOptionsInterface } from '../../../paginate';
///////////////////////////////////////////////////////////////////////////////
import { PostModel } from '../models/post.model';
import { CreateRequest } from '../requests/create.request';
import { UpdateRequest } from '../requests/update.request';
import { RequestQueryRequest } from '../../../requests/request-query.request';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostModel)
    private readonly repository: Repository<PostModel>,
  ) {}

  async findAllAndPaginate(
    request,
    conditions?: any,
  ): Promise<Pagination<PostModel>> {
    const { page, limit, orderField } = new RequestQueryRequest(request);
    const [results, total] = await this.repository.findAndCount({
      take: limit,
      skip: (page - 1) * limit,
      order: orderField,
      relations: ['user'],
      where: conditions,
    });
    return new Pagination<PostModel>({
      results,
      meta: {
        current_page: page,
        per_page: limit,
        total: total,
        resource: 'posts',
      },
    });
  }

  async create(record: CreateRequest): Promise<PostModel> {
    return await this.repository.save(this.repository.create(record));
  }

  async findAll(): Promise<PostModel[]> {
    return await this.repository.find({ order: { id: 'DESC' } });
  }

  async findOne(id: number): Promise<PostModel> {
    const row = await this.repository.findOne(id, { relations: ['user'] });
    if (!row) {
      throw new NotFoundException('Record is not exist');
    }
    return row;
  }

  async update(id: number, record: UpdateRequest) {
    const row = await this.repository.findOne(id);
    if (!row) {
      throw new NotFoundException('Record is not exist');
    }
    this.repository.merge(row, record);
    return await this.repository.save(row);
  }

  async remove(id: number): Promise<void> {
    const row = await this.repository.findOne(id);
    if (!row) {
      throw new NotFoundException('Record is not exist');
    }
    await this.repository.delete(id);
  }
}
