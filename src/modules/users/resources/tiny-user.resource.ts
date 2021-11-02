import { UserModel } from '../models/user.model';

export class TinyUserResource {
  public type = 'users';
  public row?: UserModel;
  public relationships?: string;
  constructor(row: UserModel) {
    this.row = row;
  }
  toArray() {
    return {
      name: this.row.name,
    };
  }
}
