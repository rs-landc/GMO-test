import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import TokenStrategy from './strategies/token.strategy';
import { ConfigService } from '@nestjs/config';
import { Admin } from '@entities/admins';
import { User } from '@entities/users';

import { AccessToken } from '@entities/access_tokens';
import { OAuthService } from './auth.service';
import { OAuthController } from './auth.controller';
import RefreshTokenStrategy from './strategies/refresh-token.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([Admin, User, AccessToken]),
    PassportModule,
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => {
        return {
          secret: configService.get('jwt.accessSecret'),
          signOptions: {
            expiresIn: configService.get('jwt.expiresIn'),
          },
        };
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [OAuthController],
  providers: [TokenStrategy, RefreshTokenStrategy, OAuthService],
})
export class AuthModule {}
