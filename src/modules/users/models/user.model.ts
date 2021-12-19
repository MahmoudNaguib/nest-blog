import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
////////////////////////////////////////
import * as bcrypt from 'bcrypt';
import { PostModel } from '../../posts/models/post.model';
import { CommentModel } from '../../comments/models/comment.model';

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

  @Column()
  image?: string;

  @OneToMany((type) => PostModel, (post) => post.user)
  posts?: PostModel[];

  @OneToMany((type) => CommentModel, (comment) => comment.user)
  comments?: CommentModel[];

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;

  @BeforeInsert()
  async setPassword() {
    if (this.password) {
      this.password = await bcrypt.hash(this.password, process.env.HASH_SALT);
    }
  }

  @BeforeInsert()
  @BeforeUpdate()
  async setToken() {
    const newToken = this.token || this.name || this.email || this.password;
    if (newToken) {
      this.token =
        (await bcrypt.hash(newToken, process.env.HASH_SALT)) +
        (await bcrypt.hash(Math.random().toString(), process.env.HASH_SALT)) +
        (await bcrypt.hash(Date.now().toString(), process.env.HASH_SALT));
    }
  }
}
