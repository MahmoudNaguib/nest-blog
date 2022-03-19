import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { Not } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ResizeImage } from '../../../helpers/ResizeImage';
///////////////////////////////////////////////////////////////////////////////
import * as bcrypt from 'bcrypt';
import { CustomValidationException } from '../../../exceptions/CustomValidation.exception';
import { EditProfileRequest } from '../requests/profile/edit-profile.request';
import { ChangePassowrdRequest } from '../requests/profile/change-passowrd.request';
import { UserModel as Model } from '../models/user.model';
@Injectable()
export class ProfileService {
  public imageSizes = {
    large: '300x300',
    small: '150x150',
  };
  constructor(
    @InjectRepository(Model)
    private readonly repository: Repository<Model>,
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
        throw new CustomValidationException({
          email: 'There is exist a user with the same email',
        });
      }
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
