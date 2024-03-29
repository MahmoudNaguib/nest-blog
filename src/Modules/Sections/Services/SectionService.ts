import { Injectable, NotFoundException, Request } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pagination } from '../../../Paginate';
import { RequestQueryRequest } from '../../../Requests/RequestQueryRequest';
import { SectionModel as Model } from '../Models/SectionModel';
import { CreateRequest } from '../Requests/CreateRequest';
import { UpdateRequest } from '../Requests/UpdateRequest';

@Injectable()
export class SectionService {
  constructor(
    @InjectRepository(Model)
    private readonly repository: Repository<Model>,
  ) {}

  async findAllWithPaginate(
    request,
    conditions?: any,
  ): Promise<Pagination<Model>> {
    const { page, limit, orderField } = new RequestQueryRequest(request);
    const [results, total] = await this.repository.findAndCount({
      take: limit,
      skip: (page - 1) * limit,
      order: orderField,
      relations: ['user'],
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

  async update(id: number, record: UpdateRequest) {
    const row = await this.repository.findOne(id);
    if (!row) {
      throw new NotFoundException('Record is not exist');
    }
    this.repository.merge(row, record);
    return await this.repository.save(row);
  }

  async findOne(id: number): Promise<Model> {
    const row = await this.repository.findOne(id, { relations: ['user'] });
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
