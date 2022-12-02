import { UserEntity } from './user.entity';
import { AutoMap } from '@automapper/classes';
import {
  Entity,
  IdentifiedReference,
  ManyToOne,
  OptionalProps,
  Property,
} from '@mikro-orm/core';
import { BaseEntity } from './base.entity';
import { PostEntity } from './post.entity';

@Entity({ collection: 'comments' })
export class CommentEntity extends BaseEntity {
  [OptionalProps]?: 'createdAt' | 'updatedAt';

  @Property()
  @AutoMap()
  text!: string;

  @AutoMap(() => UserEntity)
  @ManyToOne(() => UserEntity, { wrappedReference: true })
  author!: IdentifiedReference<UserEntity, '_id' | 'id'>;

  @AutoMap(() => PostEntity)
  @ManyToOne(() => PostEntity, { wrappedReference: true })
  post!: IdentifiedReference<PostEntity, '_id' | 'id'>;
}
