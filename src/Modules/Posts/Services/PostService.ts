import { Injectable, NotFoundException, Request } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pagination } from '../../../Paginate';
import { RequestQueryRequest } from '../../../Requests/RequestQueryRequest';
import { PostModel as Model } from '../Models/PostModel';
import { CreateRequest } from '../Requests/CreateRequest';
import { UpdateRequest } from '../Requests/UpdateRequest';
import { PostsFilter as Filter } from '../Filters/PostsFilter';
import { ResizeImage } from '../../../Helpers/ResizeImage';

@Injectable()
export class PostService {
  public imageSizes = {
    large: '600x360',
    small: '200x150',
  };
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
      relations: ['user', 'section'],
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
    /////////// resize image
    if (record.image != undefined) {
      const image = ResizeImage.resize(record.image.path, this.imageSizes);
      if (image) {
        record.image = image;
      }
    }
    /////////////////
    return await this.repository.save(this.repository.create(record));
  }

  async update(id: number, record: UpdateRequest) {
    const row = await this.repository.findOne(id);
    if (!row) {
      throw new NotFoundException('Record is not exist');
    }
    /////////// resize image
    if (record.image != undefined) {
      const image = ResizeImage.resize(record.image.path, this.imageSizes);
      if (image) {
        record.image = image;
      }
    }
    /////////////////
    this.repository.merge(row, record);
    return await this.repository.save(row);
  }

  async findOne(id: number): Promise<Model> {
    const row = await this.repository.findOne(id, {
      relations: ['user', 'section'],
    });
    if (!row) {
      throw new NotFoundException('Record is not exist');
    }
    return row;
  }

  async remove(id: number): Promise<boolean> {
    const row = await this.repository.findOne(id);
    if (!row) {
      throw new NotFoundException('Record is not exist');
    }
    if (await this.repository.delete(id)) {
      return true;
    }
    return false;
  }
}
