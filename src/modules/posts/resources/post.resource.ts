import { PostModel } from '../models/post.model';
import { TinyUserResource } from '../../users/resources/tiny-user.resource';
import { getDate } from '../../../helpers/helpers';

export class PostResource {
  public type = 'posts';
  public row?: PostModel;
  public relationships?: string;
  constructor(row: PostModel) {
    this.row = row;
  }
  toArray() {
    return {
      type: this.type,
      id: this.row.id,
      attributes: {
        title: this.row.title,
        content: this.row.content,
        created_at: getDate(this.row.created_at),
        updated_at: getDate(this.row.updated_at),
      },
      relationships: {
        user: new TinyUserResource(this.row.user).toArray(),
      },
    };
  }
}
