import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  BeforeInsert,
  BeforeUpdate,
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
  posts?: PostModel[];

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;

  @BeforeInsert()
  async setPassword(password: string) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(password || this.password, salt);
  }

  @BeforeInsert()
  @BeforeUpdate()
  async setToken(token: string) {
    const generated =
      (await bcrypt.hash(
        token || this.token || this.email,
        process.env.HASH_SALT,
      )) +
      (await bcrypt.hash(Math.random().toString(), process.env.HASH_SALT)) +
      (await bcrypt.hash(Date.now().toString(), process.env.HASH_SALT));
    this.token = generated;
  }
}
