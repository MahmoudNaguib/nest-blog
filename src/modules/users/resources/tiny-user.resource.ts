import { UserModel as Model } from '../models/user.model';

export class TinyUserResource {
  public type = 'users';
  public row?: Model;
  public relationships?: string;
  constructor(row: Model) {
    this.row = row;
  }
  toArray() {
    return {
      name: this.row.name,
    };
  }
}
