import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';

export class BaseDto {
  @AutoMap()
  @ApiProperty()
  id!: string;

  @AutoMap()
  @ApiProperty({ type: String, format: 'date-time' })
  createdAt!: Date;

  @AutoMap()
  @ApiProperty({ type: String, format: 'date-time' })
  updatedAt!: Date;
}
