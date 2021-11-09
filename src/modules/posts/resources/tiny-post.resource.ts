import { TinyUserResource } from '../../users/resources/tiny-user.resource';
import { getDate } from '../../../helpers/helpers';
import { PostModel as Model } from '../models/post.model';
import { TinySectionResource } from '../../sections/resources/tiny-section.resource';

export class TinyPostResource {
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
