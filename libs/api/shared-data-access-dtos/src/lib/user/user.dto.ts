import { AutoMap } from '@automapper/classes';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { UserRole } from '@nx-post/api/shared-data-access-entities';
import { CommentDto } from '../comment/comment.dto';
import { PostDto } from '../post/post.dto';
import { BaseDto } from './../base.dto';

export class UserDto extends BaseDto {
  @AutoMap()
  @ApiProperty()
  username!: string;

  @AutoMap()
  @ApiProperty()
  email!: string;

  @AutoMap(() => String)
  @ApiProperty({ enum: () => UserRole, enumName: 'UserRole' })
  role!: UserRole;

  @AutoMap()
  @ApiPropertyOptional()
  name?: string;

  @AutoMap()
  @ApiPropertyOptional()
  avatarUrl?: string;

  @AutoMap()
  @ApiPropertyOptional()
  bio?: string;

  @AutoMap()
  @ApiPropertyOptional()
  location?: string;

  @AutoMap(() => [PostDto])
  @ApiProperty({ type: () => PostDto, isArray: true })
  posts: PostDto[] = [];

  @AutoMap(() => [PostDto])
  @ApiProperty({ type: () => PostDto, isArray: true })
  liked: PostDto[] = [];

  @AutoMap(() => [CommentDto])
  @ApiProperty({ type: () => CommentDto, isArray: true })
  comments: CommentDto[] = [];
}
