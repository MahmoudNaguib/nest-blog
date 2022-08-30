import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { UserModel } from '../../Users/Models/UserModel';
import { PostModel } from '../../Posts/Models/PostModel';

@Entity('comments')
export class CommentModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Column()
  post_id: number;

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
