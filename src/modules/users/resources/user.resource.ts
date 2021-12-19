import { UserModel as Model } from '../models/user.model';
import { getDate } from '../../../helpers/helpers';

export class UserResource {
  public type = 'users';
  public row?: Model;
  public relationships?: string;
  constructor(row: Model) {
    this.row = row;
  }
  toArray() {
    return {
      type: this.type,
      id: parseInt(this.row.id.toString()),
      attributes: {
        name: this.row.name,
        email: this.row.email,
        image: this.row.image,
        created_at: getDate(this.row.created_at),
        updated_at: getDate(this.row.updated_at),
      },
      relationships: {},
    };
  }
}
