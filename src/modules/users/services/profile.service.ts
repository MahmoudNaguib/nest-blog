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
import { ValidationException } from '../../../exceptions/validation.exception';
import { EditProfileRequest } from '../requests/profile/edit-profile.request';
import { ChangePassowrdRequest } from '../requests/profile/change-passowrd.request';
@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(UserModel)
    private readonly repository: Repository<UserModel>,
  ) {}

  async editProfile(id: number, record: EditProfileRequest) {
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
    this.repository.merge(row, record);
    /////////////////////// if any field changed it will update token
    return await this.repository.save(row);
  }

  async changePassword(id: number, record: ChangePassowrdRequest) {
    const row = await this.repository.findOne(id);
    if (!row) {
      throw new NotFoundException('Record is not exist');
    }
    if (!(await this.validatePassword(record.old_password, row.password))) {
      throw new ForbiddenException('Invalid password for this account');
    }
    ////////// if password changed it will update token
    if (record.password != record.old_password) {
      row.password = await bcrypt.hash(record.password, process.env.HASH_SALT);
      return await this.repository.save(row);
    } else {
      return row;
    }
    ////////////////////////////////
  }

  private async validatePassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    const hash = await bcrypt.hash(password, process.env.HASH_SALT);
    return hash == hashedPassword;
  }
}
