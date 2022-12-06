import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import {
  LoginParamsDto,
  RegisterParamsDto,
  TokenResultDto,
} from '@nx-post/api/shared-data-access-dtos';
import { SecurityService } from '@nx-post/api/data-access-security';
import { ApiErrors } from '@nx-post/api/shared-utils-decorators';

@ApiTags('Security')
@ApiErrors()
@Controller('security')
export class SecurityController {
  constructor(private securityService: SecurityService) {}

  @Post('register')
  @ApiCreatedResponse()
  async register(@Body() dto: RegisterParamsDto): Promise<void> {
    return await this.securityService.register(dto);
  }

  @Post('login')
  @ApiOkResponse({ type: TokenResultDto })
  @HttpCode(HttpStatus.OK)
  async login(@Body() dto: LoginParamsDto): Promise<TokenResultDto> {
    return await this.securityService.login(dto);
  }
}
