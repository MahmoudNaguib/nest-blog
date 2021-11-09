import { SectionModel as Model } from '../models/section.model';

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
