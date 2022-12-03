import { Module } from '@nestjs/common';
import { ApiDataAccessUserModule } from '@nx-post/api/data-access-user';
import { ApiDataAccessAuthModule } from '@nx-post/api/data-access-auth';
import { SecurityService } from './security.service';

@Module({
  imports: [ApiDataAccessAuthModule, ApiDataAccessUserModule],
  providers: [SecurityService],
  exports: [SecurityService],
})
export class ApiDataAccessSecurityModule {}
