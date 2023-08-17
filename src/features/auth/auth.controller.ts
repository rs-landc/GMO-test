import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { OAuthService } from './auth.service';
import * as SignUpDto from './dtos/sign-up.dto';
import { GrantTokenDto } from './dtos/grant-token.dto';
import { RevokeTokenDto } from './dtos/revoke-token.dto';
import { TokenResponseDTO } from './dtos/token-response.dto';
import { ResetPasswordDTO } from './dtos/reset-password.dto';
import { VerifyResetPasswordDTO } from './dtos/verify-reset-password.dto';
import { VerifyConfirmationDTO } from './dtos/verify-conformation.dto';
import { SuccessResponseDTO } from './dtos/success-response.dto';
import { UnlockDTO } from './dtos/unlock.dto';

import { ApiTags } from '@nestjs/swagger';

@Controller()
@ApiTags('Auth')
export class OAuthController {
  constructor(private readonly oauthService: OAuthService) {}

  @Post('api/admins_registrations')
  @HttpCode(HttpStatus.OK)
  async signUpAdmin(
    @Body() body: SignUpDto.AuthRegistrationAdminRequestDto,
  ): Promise<{ id: number }> {
    return this.oauthService.signUpAdmin(body);
  }

  @Post('api/admins_reset_password_requests')
  @HttpCode(HttpStatus.OK)
  async resetAdminPassword(@Body() body: ResetPasswordDTO): Promise<SuccessResponseDTO> {
    return this.oauthService.resetAdminPassword(body.email);
  }

  @Post('api/admins_verify_reset_password_requests')
  @HttpCode(HttpStatus.OK)
  async verifyAdminResetPassword(
    @Body() body: VerifyResetPasswordDTO,
  ): Promise<SuccessResponseDTO> {
    return this.oauthService.verifyAdminResetPassword(body);
  }

  @Post('api/admins_unlock')
  @HttpCode(HttpStatus.OK)
  async unlockAdmin(@Body() body: UnlockDTO): Promise<SuccessResponseDTO> {
    return this.oauthService.unlockAdminByToken(body.unlock_token);
  }

  @Post('api/users_registrations')
  @HttpCode(HttpStatus.OK)
  async signUpUser(
    @Body() body: SignUpDto.AuthRegistrationUserRequestDto,
  ): Promise<{ id: number }> {
    return this.oauthService.signUpUser(body);
  }

  @Post('api/users_reset_password_requests')
  @HttpCode(HttpStatus.OK)
  async resetUserPassword(@Body() body: ResetPasswordDTO): Promise<SuccessResponseDTO> {
    return this.oauthService.resetUserPassword(body.email);
  }

  @Post('api/users_verify_reset_password_requests')
  @HttpCode(HttpStatus.OK)
  async verifyUserResetPassword(@Body() body: VerifyResetPasswordDTO): Promise<SuccessResponseDTO> {
    return this.oauthService.verifyUserResetPassword(body);
  }

  @Post('api/users_unlock')
  @HttpCode(HttpStatus.OK)
  async unlockUser(@Body() body: UnlockDTO): Promise<SuccessResponseDTO> {
    return this.oauthService.unlockUserByToken(body.unlock_token);
  }

  @Post('oauth/token')
  @HttpCode(HttpStatus.OK)
  async grantToken(@Body() body: GrantTokenDto): Promise<TokenResponseDTO> {
    return this.oauthService.login(body);
  }

  @Post('oauth/revoke')
  @HttpCode(HttpStatus.OK)
  async revoke(@Body() body: RevokeTokenDto): Promise<SuccessResponseDTO> {
    return this.oauthService.revokeToken(body.token, body.token_type_hint);
  }
}
