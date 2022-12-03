import { ApiProperty } from '@nestjs/swagger';
import { UserInfomationDto } from './../user/user-infomation.dto';

export class TokenResultDto {
  @ApiProperty()
  token!: string;

  @ApiProperty({ type: () => UserInfomationDto })
  user!: UserInfomationDto;
}
