import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Admin } from '@entities/admins';
import { User } from '@entities/users';
import { AccessToken } from '@entities/access_tokens';

import { JwtDto } from '@features/auth/dtos/jwt.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AUTH_STRATEGY } from 'src/constants';

@Injectable()
export default class TokenStrategy extends PassportStrategy(Strategy, AUTH_STRATEGY.TOKEN) {
  constructor(
    private readonly configService: ConfigService,
    @InjectRepository(Admin) private adminsRepo: Repository<Admin>,
    @InjectRepository(User) private usersRepo: Repository<User>,
    @InjectRepository(AccessToken)
    private accessTokenRepo: Repository<AccessToken>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('jwt.accessSecret'),
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: JwtDto) {
    const token = req.get('Authorization').replace('Bearer', '').trim();
    if (
      !(await this.accessTokenRepo.findOneBy({
        token: token,
      }))
    ) {
      throw new UnauthorizedException();
    }
    switch (payload.resourceOwner) {
      case 'admins':
        return this.validateAdmin(payload.userId);
      case 'users':
        return this.validateUser(payload.userId);
      default:
        throw new BadRequestException(`scope ${payload.scope} is not supported.`);
    }
  }

  async validateAdmin(userId: number) {
    const user = await this.adminsRepo.findOneBy({ id: userId });

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
  async validateUser(userId: number) {
    const user = await this.usersRepo.findOneBy({ id: userId });

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
