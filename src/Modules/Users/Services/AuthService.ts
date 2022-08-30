import { Injectable, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
///////////////////////////////////////////////////////////////////////////////
import * as bcrypt from 'bcrypt';
import { RegisterRequest } from '../Requests/auth/RegisterRequest';
import { LoginRequest } from '../Requests/auth/LoginRequest';
import { UserModel as Model } from '../Models/UserModel';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Model)
    private readonly repository: Repository<Model>,
  ) {}

  async register(record: RegisterRequest): Promise<Model> {
    return await this.repository.save(this.repository.create(record));
  }

  async login(record: LoginRequest): Promise<Model> {
    const row = await this.repository.findOne({ email: record.email });
    if (!row) {
      throw new ForbiddenException('There is no account with this email');
    }
    if (!(await this.validatePassword(record.password, row.password))) {
      throw new ForbiddenException('Invalid password for this account');
    }
    return await this.repository.save(row);
  }

  async findUserByToken(token: string): Promise<Model> {
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
