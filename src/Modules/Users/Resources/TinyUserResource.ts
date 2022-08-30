import { UserModel as Model } from '../Models/UserModel';

export class TinyUserResource {
  public row?: Model;
  public relationships?: string;
  constructor(row: Model) {
    this.row = row;
  }
  toArray() {
    return {
      name: this.row.name,
      image: this.row.image,
    };
  }
}
