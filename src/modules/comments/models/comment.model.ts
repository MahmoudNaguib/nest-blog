import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { UserModel } from '../../users/models/user.model';
import { PostModel } from '../../posts/models/post.model';

@Entity('comments')
export class CommentModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @ManyToOne((type) => UserModel, (user) => user.comments)
  @JoinColumn({ name: 'user_id' })
  user?: UserModel;

  @ManyToOne((type) => PostModel, (post) => post.comments)
  @JoinColumn({ name: 'post_id' })
  post?: PostModel;

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;
}
