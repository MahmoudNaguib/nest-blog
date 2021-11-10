import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { PostModel } from '../../posts/models/post.model';
import { MinLength } from 'class-validator';

@Entity('sections')
export class SectionModel {
  @PrimaryGeneratedColumn()
  id: number;

  @MinLength(5)
  @Column()
  title: string;

  @OneToMany((type) => PostModel, (post) => post.section)
  posts?: PostModel[];

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;
}
