import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  PrimaryColumn,
} from 'typeorm';
import { UserModel } from '../../users/models/user.model';

@Entity('posts')
export class PostModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  content: string;

  @ManyToOne((type) => UserModel, (user) => user.posts)
  @JoinColumn({ name: 'user_id' })
  user?: UserModel;

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;
}
