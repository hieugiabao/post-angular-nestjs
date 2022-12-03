import { UserInfomationDto } from './../user/user-infomation.dto';
import { CommentDto } from './../comment/comment.dto';
import { BaseDto } from '../base.dto';
import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';

export class PostDto extends BaseDto {
  @AutoMap()
  @ApiProperty()
  text!: string;

  @AutoMap(() => UserInfomationDto)
  @ApiProperty({ type: () => UserInfomationDto })
  author!: UserInfomationDto;

  @AutoMap(() => [CommentDto])
  @ApiProperty({ type: () => CommentDto, isArray: true })
  comments: CommentDto[] = [];

  @AutoMap(() => Number)
  @ApiProperty({ type: Number })
  commentsCount = 0;

  @AutoMap(() => [UserInfomationDto])
  @ApiProperty({ type: () => UserInfomationDto, isArray: true })
  likedBy: UserInfomationDto[] = [];

  @AutoMap(() => Number)
  @ApiProperty({ type: Number })
  likedByCount = 0;
}
