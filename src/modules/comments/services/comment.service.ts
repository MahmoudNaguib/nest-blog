import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pagination } from '../../../paginate';
import { RequestQueryRequest } from '../../../requests/request-query.request';
import { CommentModel as Model } from '../models/comment.model';
import { CreateRequest } from '../requests/create.request';
import { CommentFilter as Filter } from '../filters/comment.filter';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Model)
    private readonly repository: Repository<Model>,
  ) {}

  async findAllWithPaginate(
    request,
    conditions?: any,
  ): Promise<Pagination<Model>> {
    const { page, limit, orderField } = new RequestQueryRequest(request);
    const { filterFields } = new Filter(request);
    conditions = { ...conditions, ...filterFields };
    const [results, total] = await this.repository.findAndCount({
      take: limit,
      skip: (page - 1) * limit,
      order: orderField,
      relations: ['user', 'post'],
      where: conditions,
    });
    return new Pagination(
      {
        results,
        meta: {
          current_page: page,
          per_page: limit,
          total: total,
        },
      },
      request,
    );
  }

  async findAll(): Promise<Model[]> {
    return await this.repository.find({ order: { id: 'DESC' } });
  }

  async create(record: CreateRequest): Promise<Model> {
    return await this.repository.save(this.repository.create(record));
  }

  async findOne(id: number): Promise<Model> {
    const row = await this.repository.findOne(id, {
      relations: ['user', 'post'],
    });
    if (!row) {
      throw new NotFoundException('Record is not exist');
    }
    return row;
  }

  async remove(id: number): Promise<void> {
    const row = await this.repository.findOne(id);
    if (!row) {
      throw new NotFoundException('Record is not exist');
    }
    await this.repository.delete(id);
  }
}
