import { Injectable, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
///////////////////////////////////////////////////////////////////////////////
import * as bcrypt from 'bcrypt';
import { UserModel } from '../models/user.model';
import { RegisterRequest } from '../requests/auth/register.request';
import { LoginRequest } from '../requests/auth/login.request';
import { ValidationException } from '../../../exceptions/validation.exception';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserModel)
    private readonly repository: Repository<UserModel>,
  ) {}

  async register(record: RegisterRequest): Promise<UserModel> {
    const emailExist = await this.repository.findOne({ email: record.email });
    if (emailExist) {
      throw new ValidationException({
        email: 'There is exist a user with the same email',
      });
    }
    return await this.repository.save(this.repository.create(record));
  }

  async login(record: LoginRequest): Promise<UserModel> {
    const row = await this.repository.findOne({ email: record.email });
    if (!row) {
      throw new ForbiddenException('There is no account with this email');
    }
    if (!(await this.validatePassword(record.password, row.password))) {
      throw new ForbiddenException('Invalid password for this account');
    }
    return await this.repository.save(row);
  }

  async findUserByToken(token: string): Promise<UserModel> {
    return await this.repository.findOne({ token: token });
  }

  private async validatePassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    const hash = await bcrypt.hash(password, process.env.HASH_SALT);
    return hash == hashedPassword;
  }
}
