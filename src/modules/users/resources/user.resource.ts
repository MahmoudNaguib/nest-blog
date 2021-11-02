import { UserModel } from '../models/user.model';
import { getDate } from '../../../helpers/helpers';

export class UserResource {
  public type = 'users';
  public row?: UserModel;
  public relationships?: string;
  constructor(row: UserModel) {
    this.row = row;
  }
  toArray() {
    return {
      type: this.type,
      id: this.row.id,
      attributes: {
        name: this.row.name,
        email: this.row.email,
        created_at: getDate(this.row.created_at),
        updated_at: getDate(this.row.updated_at),
      },
      relationships: {},
    };
  }
}
