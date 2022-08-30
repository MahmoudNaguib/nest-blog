import { SectionModel as Model } from '../Models/SectionModel';

export class TinySectionResource {
  public row?: Model;
  public relationships?: string;
  constructor(row: Model) {
    this.row = row;
  }
  toArray() {
    return {
      title: this.row.title,
    };
  }
}
