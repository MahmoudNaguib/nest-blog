import { PostModel as Model } from '../Models/PostModel';

export class TinyPostResource {
  public row?: Model;
  public relationships?: string;
  constructor(row: Model) {
    this.row = row;
  }
  toArray() {
    return {
      title: this.row.title,
      image: this.row.image,
    };
  }
}
