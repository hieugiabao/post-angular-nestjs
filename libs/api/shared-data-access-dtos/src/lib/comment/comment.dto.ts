import { UserInfomationDto } from './../user/user-infomation.dto';
import { BaseDto } from './../base.dto';
import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';

export class CommentDto extends BaseDto {
  @AutoMap()
  @ApiProperty()
  text!: string;

  @AutoMap(() => UserInfomationDto)
  @ApiProperty({ type: () => UserInfomationDto })
  author!: UserInfomationDto;

  @AutoMap()
  @ApiProperty()
  postId!: string;
}
