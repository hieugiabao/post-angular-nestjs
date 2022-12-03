import { Global, Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { ApiDataAccessAuthModule } from 'libs/api/data-access-auth/src';

@Global()
@Module({
  imports: [PassportModule.register({ defaultStrategy: 'jwt' })],
  exports: [PassportModule],
})
class PassportGlobalModule {}

@Module({
  imports: [PassportGlobalModule, ApiDataAccessAuthModule],
})
export class ApiFeatureAuthModule {}
