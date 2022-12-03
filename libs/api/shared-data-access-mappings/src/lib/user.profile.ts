import {
  createMap,
  Mapper,
  MappingConfiguration,
  MappingProfile,
  extend,
} from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import {
  AuthUserDto,
  BaseDto,
  UserDto,
  UserInfomationDto,
} from '@nx-post/api/shared-data-access-dtos';
import {
  BaseEntity,
  UserEntity,
} from '@nx-post/api/shared-data-access-entities';

@Injectable()
export class UserProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  get profile(): MappingProfile {
    return (mapper) => {
      createMap(mapper, UserEntity, UserDto);
      createMap(mapper, UserEntity, UserInfomationDto);
      createMap(mapper, UserEntity, AuthUserDto);
    };
  }

  protected override get mappingConfigurations(): MappingConfiguration[] {
    return [extend(BaseEntity, BaseDto)];
  }
}
