import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '@nx-post/api/data-access-user';
import {
  AuthUserDto,
  TokenResultDto,
  UserInfomationDto,
} from '@nx-post/api/shared-data-access-dtos';
import { UserEntity } from '@nx-post/api/shared-data-access-entities';
import { JwtPayload } from './jwt-payload';

@Injectable()
export class AuthService {
  constructor(
    @InjectMapper() private mapper: Mapper,
    private jwtService: JwtService,
    private userService: UserService
  ) {}

  async createToken(user: UserEntity): Promise<TokenResultDto> {
    const tokenResult = new TokenResultDto();
    tokenResult.token = await this.jwtService.signAsync({
      email: user.email,
      username: user.username,
      role: user.role,
    });
    tokenResult.user = this.mapper.map(user, UserEntity, UserInfomationDto);
    return tokenResult;
  }

  async verify(token: string): Promise<JwtPayload> {
    try {
      return await this.jwtService.verifyAsync<JwtPayload>(token);
    } catch (e) {
      throw new InternalServerErrorException(
        { e, token },
        'failed - verifying token'
      );
    }
  }

  async validateUser(payload: JwtPayload): Promise<AuthUserDto> {
    const user = await this.userService.findByUsername(payload.username);
    return this.mapper.map(user, UserEntity, AuthUserDto);
  }
}
