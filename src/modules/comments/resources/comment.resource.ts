import { getDate } from '../../../helpers/helpers';
import { CommentModel as Model } from '../models/comment.model';
import { TinyUserResource } from '../../users/resources/tiny-user.resource';
import { TinyPostResource } from '../../posts/resources/tiny-post.resource';

export class CommentResource {
  public type = 'comments';
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
        user_id: parseInt(this.row.user.id.toString()),
        post_id: parseInt(this.row.post.id.toString()),
        content: this.row.content,
        created_at: getDate(this.row.created_at),
        updated_at: getDate(this.row.updated_at),
      },
      relationships: {
        user: new TinyUserResource(this.row.user).toArray(),
        post: new TinyPostResource(this.row.post).toArray(),
      },
    };
  }
}
