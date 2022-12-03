import { EntityRepository } from '@mikro-orm/mongodb';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { RegisterParamsDto } from '@nx-post/api/shared-data-access-dtos';
import { UserEntity } from '@nx-post/api/shared-data-access-entities';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: EntityRepository<UserEntity>
  ) {}

  async findByUsername(username: string): Promise<UserEntity> {
    try {
      return await this.userRepository.findOneOrFail({ username });
    } catch (e) {
      throw new InternalServerErrorException(
        e,
        'failed to find user by username'
      );
    }
  }

  async findById(id: string): Promise<UserEntity> {
    try {
      return await this.userRepository.findOneOrFail({ id });
    } catch (error) {
      throw new InternalServerErrorException(error, 'failed - find user by id');
    }
  }

  async create(dto: RegisterParamsDto): Promise<UserEntity> {
    const newUser = await this.userRepository.create(dto);
    await this.userRepository.persistAndFlush(newUser);
    return newUser;
  }
}
