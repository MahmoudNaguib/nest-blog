import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { Not } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pagination, PaginationOptionsInterface } from '../../../paginate';
///////////////////////////////////////////////////////////////////////////////
import * as bcrypt from 'bcrypt';
import { UserModel } from '../models/user.model';
import { CreateRequest } from '../requests/create.request';
import { UpdateRequest } from '../requests/update.request';
import { LoginRequest } from '../requests/login.request';
import { ChangePassowrdRequest } from '../requests/change-passowrd.request';
import { ValidationException } from '../../../exceptions/validation.exception';
import { generateToken, validatePassword } from '../../../helpers/helpers';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserModel)
    private readonly repository: Repository<UserModel>,
  ) {}

  async paginate(
    options: PaginationOptionsInterface,
  ): Promise<Pagination<UserModel>> {
    const [results, total] = await this.repository.findAndCount({
      take: options.limit,
      skip: (options.page - 1) * options.limit,
    });
    return new Pagination<UserModel>({
      results,
      meta: {
        current_page: options.page,
        per_page: options.limit,
        total: total,
        resource: 'users',
      },
    });
  }

  async login(record: LoginRequest): Promise<UserModel> {
    const row = await this.repository.findOne({ email: record.email });
    if (!row) {
      throw new ForbiddenException('There is no account with this email');
    }
    if (!(await validatePassword(record.password, row.password))) {
      throw new ForbiddenException('Invalid password for this account');
    }
    return await this.repository.save(row);
  }

  async create(record: CreateRequest): Promise<UserModel> {
    const emailExist = await this.repository.findOne({ email: record.email });
    if (emailExist) {
      throw new ValidationException({
        email: 'There is exist a user with the same email',
      });
    }
    ////////////////////////////// Update token
    record.password = await bcrypt.hash(record.password, process.env.HASH_SALT);
    record.token = await generateToken(record.email);
    //////////////////////////////
    return await this.repository.save(record);
  }

  async update(id: number, record: UpdateRequest) {
    const row = await this.repository.findOne(id);
    if (!row) {
      throw new NotFoundException('Record is not exist');
    }
    if (record.email) {
      const emailExist = await this.repository.findOne({
        email: record.email,
        id: Not(row.id),
      });
      if (emailExist) {
        throw new ValidationException({
          email: 'There is exist a user with the same email',
        });
      }
    }
    ////////////////////////////// Update token
    record.token = await generateToken(record.email);
    ////////////////////////////////
    this.repository.merge(row, record);
    return await this.repository.save(row);
  }

  async updatePassword(id: number, record: ChangePassowrdRequest) {
    const row = await this.repository.findOne(id);
    if (!row) {
      throw new NotFoundException('Record is not exist');
    }
    if (!(await validatePassword(record.old_password, row.password))) {
      throw new ForbiddenException('Invalid password for this account');
    }
    ////////////////////////////// Update token
    const token = await generateToken(row.email);
    const password = await bcrypt.hash(record.password, process.env.HASH_SALT);
    row.token = await generateToken(row.email);
    row.password = await bcrypt.hash(record.password, process.env.HASH_SALT);
    return await this.repository.save(row);
    ////////////////////////////////
  }

  async findUserByToken(token: string): Promise<UserModel> {
    return await this.repository.findOne({ token: token });
  }

  async findAll(): Promise<UserModel[]> {
    return await this.repository.find({ order: { id: 'DESC' } });
  }

  async findOne(id: number): Promise<UserModel> {
    const row = await this.repository.findOne(id);
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
