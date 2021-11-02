import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
////////////////////////////////////////
import * as bcrypt from 'bcrypt';
import { PostModel } from '../../posts/models/post.model';

@Entity('users')
export class UserModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  token?: string;
  @OneToMany((type) => PostModel, (post) => post.user)
  posts: PostModel[];

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;
}
