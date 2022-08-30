import { TinyUserResource } from '../../Users/Resources/TinyUserResource';
import { getDate } from '../../../Helpers/Helpers';
import { PostModel as Model } from '../Models/PostModel';
import { TinySectionResource } from '../../Sections/Resources/TinySectionResource';

export class PostResource {
  public type = 'posts';
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
        section_id: parseInt(this.row.section.id.toString()),
        title: this.row.title,
        content: this.row.content,
        image: this.row.image,
        created_at: getDate(this.row.created_at),
        updated_at: getDate(this.row.updated_at),
      },
      relationships: {
        user: new TinyUserResource(this.row.user).toArray(),
        section: new TinySectionResource(this.row.section).toArray(),
      },
    };
  }
}
