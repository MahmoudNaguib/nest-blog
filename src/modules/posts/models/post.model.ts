import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { UserModel } from '../../users/models/user.model';
import { SectionModel } from '../../sections/models/section.model';
import { CommentModel } from '../../comments/models/comment.model';

@Entity('posts')
export class PostModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Column()
  section_id: number;

  @Column()
  title: string;

  @Column()
  content: string;

  @ManyToOne((type) => SectionModel, (section) => section.posts)
  @JoinColumn({ name: 'section_id' })
  section?: SectionModel;

  @ManyToOne((type) => UserModel, (user) => user.posts)
  @JoinColumn({ name: 'user_id' })
  user?: UserModel;

  @OneToMany((type) => CommentModel, (comment) => comment.post)
  comments?: CommentModel[];

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;
}
