import { getDate } from '../../../helpers/helpers';
import { SectionModel as Model } from '../models/section.model';

export class SectionResource {
  public type = 'sections';
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
        title: this.row.title,
        created_at: getDate(this.row.created_at),
        updated_at: getDate(this.row.updated_at),
      },
      relationships: {},
    };
  }
}
