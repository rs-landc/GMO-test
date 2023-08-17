

import { ConfigService } from '@nestjs/config';
import { getRepository } from 'typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from 'src/app.module';
import * as request from 'supertest';
import * as bcrypt from 'bcryptjs';
import { advanceBy } from 'jest-date-mock';

import { adminFactory } from './factories';
import { userFactory } from './factories';
import { setupBeforeAndAfter } from './setupBeforeAndAfter';

setupBeforeAndAfter();

describe('Auth Controller', () => {
  let httpServer: request.SuperTest<request.Test>;
  let app: INestApplication;
  let config: ConfigService;

  let adminToken;
  let admin;
  let userToken;
  let user;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    config = moduleFixture.get<ConfigService>(ConfigService);

    app = moduleFixture.createNestApplication();
    await app.init();

    httpServer = request(app.getHttpServer());
  });

  beforeEach(async () => {
      admin = {
      ...adminFactory(),
      email: 'admin@example.com',
      password: 'Letmein123@',
          }
    const adminParams = {
      email: admin.email,
      password: admin.password,
      grant_type: 'password',
      scope: 'admins',
    };
    const admin_encrypted_password = bcrypt.hashSync(adminParams.password, 10);
    await getRepository('admins').insert({
      ...admin,
      encrypted_password: admin_encrypted_password,
    });

    adminToken = await httpServer
      .post('/oauth/token')
      .send(adminParams)
      .then((res) => res.body);
      user = {
      ...userFactory(),
      email: 'user@example.com',
      password: 'Letmein123@',
          }
    const userParams = {
      email: user.email,
      password: user.password,
      grant_type: 'password',
      scope: 'users',
    };
    const user_encrypted_password = bcrypt.hashSync(userParams.password, 10);
    await getRepository('users').insert({
      ...user,
      encrypted_password: user_encrypted_password,
    });

    userToken = await httpServer
      .post('/oauth/token')
      .send(userParams)
      .then((res) => res.body);
    });

  describe('admin register', () => {
    it('admin register success', async () => {
      await httpServer
        .post('/api/admins_registrations')
        .send({ ...adminFactory(), email: 'admin_registration@example.com' })
        .expect(200);
    });

    it('register failure because duplicate email', async () => {
      const user = adminFactory();
      const params = { ...user, email: 'test@example.com' };
      await getRepository('admins').insert({ ...params });
      await httpServer
        .post('/api/admins_registrations')
        .send(params)
        .expect(400)
        .expect(({ body }) => {
          expect(body.message).toEqual('app.users.already_exists');
        });
    });
  });

  describe('admin login', () => {
    describe('success', () => {
      it('admin login success', async () => {
        const user = {
          ...adminFactory(),
          email: 'admin_login@example.com',
          password: 'Letmein123@',
                  };
        const params = {
          email: user.email,
          password: user.password,
          grant_type: 'password',
          scope: 'admins',
        };
        const encrypted_password = bcrypt.hashSync(params.password, 10);
        await getRepository('admins').insert({
          ...user,
          encrypted_password: encrypted_password,
        });

        await httpServer
          .post('/oauth/token')
          .send(params)
          .expect(200)
          .expect(({ body }) => {
            expect(body.access_token).toBeDefined();
            expect(body.refresh_token).toBeDefined();
          });
      });
    });
    describe('failure', () => {
      it('invalid credentials', async () => {
        await httpServer
          .post('/oauth/token')
          .send({
            email: 'fake@example.com',
            password: 'Letmein123@',
            scope: 'admins',
            grant_type: 'password',
          })
          .expect(403)
          .expect(({ body }) => {
            expect(body.message).toEqual('app.users.wrong_credentials');
          });
      });

            it('admin locked', async () => {
        const user = {
          ...adminFactory(),
          email: 'admin_login@example.com',
          password: 'Letmein123@',
                  };
        const params = {
          email: user.email,
          password: user.password,
          grant_type: 'password',
          scope: 'admins',
        };
        const encrypted_password = bcrypt.hashSync(params.password, 10);
        await getRepository('admins').insert({
          ...user,
          encrypted_password: encrypted_password,
          failed_attempts: 9,
        });

        // 10th attempt
        await httpServer
          .post('/oauth/token')
          .send({ ...params, password: 'wrong_password' })
          .expect(403)
          .expect(({ body }) => {
            expect(body.message).toEqual('app.users.wrong_credentials');
          });

        // 11th attempt
        await httpServer
          .post('/oauth/token')
          .send({ ...params, password: 'wrong_password' })
          .expect(403)
          .expect(({ body }) => {
            expect(body.message).toEqual('app.users.locked');
          });
      });
    });
  });

  describe('admin refresh token', () => {
    describe('success', () => {
      it('refresh token success', async () => {
        const refreshTokenParams = {
          grant_type: 'refresh_token',
          refresh_token: adminToken.refresh_token,
          scope: 'admins',
        };
        await httpServer
          .post('/oauth/token')
          .send(refreshTokenParams)
          .expect(200)
          .expect(({ body }) => {
            expect(body.access_token).toBeDefined();
            expect(body.refresh_token).toBeDefined();
          });
      });
    });
    describe('failure', () => {
      it('refresh token expired', async () => {
        const refreshTokenParams = {
          grant_type: 'refresh_token',
          refresh_token: adminToken.refresh_token,
          scope: 'admins',
        };
        advanceBy(adminToken.refresh_token_expires_in);
        await httpServer
          .post('/oauth/token')
          .send(refreshTokenParams)
          .expect(400)
          .expect(({ body }) => {
            expect(body.message).toEqual('app.refresh_token.invalid');
          });
      });
    });
  });

  describe('admin revoke token', () => {
    describe('success', () => {
      it('revoke access token success', async () => {
        const revokeTokenParams = {
        token: adminToken.access_token,
        };
        await httpServer
          .post('/oauth/revoke')
          .send(revokeTokenParams)
          .expect(200);
      });
      it('revoke refresh token success', async () => {
        const revokeTokenParams = {
          token: adminToken.refresh_token,
          token_type_hint: 'refresh_token',
        };
        await httpServer
          .post('/oauth/revoke')
          .send(revokeTokenParams)
          .expect(200);
      });
    });
  });

  describe('admin request send reset password', () => {
    describe('success', () => {
      it('response success with valid email', async () => {
        const resetPasswordParams = {
        email: admin.email,
        };
        await httpServer
          .post('/api/admins_reset_password_requests')
          .send(resetPasswordParams)
          .expect(200);
      });
      it('response success with invalid email', async () => {
        const resetPasswordParams = {
          email: 'invalid_email@example.com',
        };
        await httpServer
          .post('/api/admins_reset_password_requests')
          .send(resetPasswordParams)
          .expect(200);
      });
    });
  });

  describe('admin verify reset password token', () => {
    describe('success', () => {
      it('verify success', async () => {
        const resetToken = 'SampleToken!@#';
        await getRepository('admins').save({
          id: adminToken.resource_id,
          reset_password_sent_at: new Date(),
          reset_password_token: resetToken,
        });
        const params = {
          reset_token: resetToken,
          password: 'Letmein1234@',
          password_confirmation: 'Letmein1234@',
        };
        await httpServer
          .post('/api/admins_verify_reset_password_requests')
          .send(params)
          .expect(200);
      });
    });
    describe('failure', () => {
      it('wrong token', async () => {
        const resetToken = 'SampleToken!@#';
        await getRepository('admins').save({
          id: adminToken.resource_id,
          reset_password_sent_at: new Date(),
          reset_password_token: resetToken,
        });
        const params = {
          reset_token: 'wrongToken123@',
          password: 'Letmein1234@',
          password_confirmation: 'Letmein1234@',
        };
        await httpServer
          .post('/api/admins_verify_reset_password_requests')
          .send(params)
          .expect(400)
          .expect(({ body }) => {
            expect(body.message).toEqual('app.reset_token.invalid');
          });
      });
      it('expired token', async () => {
        const resetToken = 'SampleToken!@#';
        await getRepository('admins').save({
          id: adminToken.resource_id,
          reset_password_sent_at: new Date(),
          reset_password_token: resetToken,
        });
        const params = {
          reset_token: resetToken,
          password: 'Letmein1234@',
          password_confirmation: 'Letmein1234@',
        };
        advanceBy(
          config.get('authentication.resetPasswordIn') * 3600 * 1000 + 3000,
        );
        await httpServer
          .post('/api/admins_verify_reset_password_requests')
          .send(params)
          .expect(400)
          .expect(({ body }) => {
            expect(body.message).toEqual('app.reset_token.expired');
          });
      });
    });
  });
  describe('user register', () => {
    it('user register success', async () => {
      await httpServer
        .post('/api/users_registrations')
        .send({ ...userFactory(), email: 'user_registration@example.com' })
        .expect(200);
    });

    it('register failure because duplicate email', async () => {
      const user = userFactory();
      const params = { ...user, email: 'test@example.com' };
      await getRepository('users').insert({ ...params });
      await httpServer
        .post('/api/users_registrations')
        .send(params)
        .expect(400)
        .expect(({ body }) => {
          expect(body.message).toEqual('app.users.already_exists');
        });
    });
  });

  describe('user login', () => {
    describe('success', () => {
      it('user login success', async () => {
        const user = {
          ...userFactory(),
          email: 'user_login@example.com',
          password: 'Letmein123@',
                  };
        const params = {
          email: user.email,
          password: user.password,
          grant_type: 'password',
          scope: 'users',
        };
        const encrypted_password = bcrypt.hashSync(params.password, 10);
        await getRepository('users').insert({
          ...user,
          encrypted_password: encrypted_password,
        });

        await httpServer
          .post('/oauth/token')
          .send(params)
          .expect(200)
          .expect(({ body }) => {
            expect(body.access_token).toBeDefined();
            expect(body.refresh_token).toBeDefined();
          });
      });
    });
    describe('failure', () => {
      it('invalid credentials', async () => {
        await httpServer
          .post('/oauth/token')
          .send({
            email: 'fake@example.com',
            password: 'Letmein123@',
            scope: 'users',
            grant_type: 'password',
          })
          .expect(403)
          .expect(({ body }) => {
            expect(body.message).toEqual('app.users.wrong_credentials');
          });
      });

            it('user locked', async () => {
        const user = {
          ...userFactory(),
          email: 'user_login@example.com',
          password: 'Letmein123@',
                  };
        const params = {
          email: user.email,
          password: user.password,
          grant_type: 'password',
          scope: 'users',
        };
        const encrypted_password = bcrypt.hashSync(params.password, 10);
        await getRepository('users').insert({
          ...user,
          encrypted_password: encrypted_password,
          failed_attempts: 9,
        });

        // 10th attempt
        await httpServer
          .post('/oauth/token')
          .send({ ...params, password: 'wrong_password' })
          .expect(403)
          .expect(({ body }) => {
            expect(body.message).toEqual('app.users.wrong_credentials');
          });

        // 11th attempt
        await httpServer
          .post('/oauth/token')
          .send({ ...params, password: 'wrong_password' })
          .expect(403)
          .expect(({ body }) => {
            expect(body.message).toEqual('app.users.locked');
          });
      });
    });
  });

  describe('user refresh token', () => {
    describe('success', () => {
      it('refresh token success', async () => {
        const refreshTokenParams = {
          grant_type: 'refresh_token',
          refresh_token: userToken.refresh_token,
          scope: 'users',
        };
        await httpServer
          .post('/oauth/token')
          .send(refreshTokenParams)
          .expect(200)
          .expect(({ body }) => {
            expect(body.access_token).toBeDefined();
            expect(body.refresh_token).toBeDefined();
          });
      });
    });
    describe('failure', () => {
      it('refresh token expired', async () => {
        const refreshTokenParams = {
          grant_type: 'refresh_token',
          refresh_token: userToken.refresh_token,
          scope: 'users',
        };
        advanceBy(userToken.refresh_token_expires_in);
        await httpServer
          .post('/oauth/token')
          .send(refreshTokenParams)
          .expect(400)
          .expect(({ body }) => {
            expect(body.message).toEqual('app.refresh_token.invalid');
          });
      });
    });
  });

  describe('user revoke token', () => {
    describe('success', () => {
      it('revoke access token success', async () => {
        const revokeTokenParams = {
        token: userToken.access_token,
        };
        await httpServer
          .post('/oauth/revoke')
          .send(revokeTokenParams)
          .expect(200);
      });
      it('revoke refresh token success', async () => {
        const revokeTokenParams = {
          token: userToken.refresh_token,
          token_type_hint: 'refresh_token',
        };
        await httpServer
          .post('/oauth/revoke')
          .send(revokeTokenParams)
          .expect(200);
      });
    });
  });

  describe('user request send reset password', () => {
    describe('success', () => {
      it('response success with valid email', async () => {
        const resetPasswordParams = {
        email: user.email,
        };
        await httpServer
          .post('/api/users_reset_password_requests')
          .send(resetPasswordParams)
          .expect(200);
      });
      it('response success with invalid email', async () => {
        const resetPasswordParams = {
          email: 'invalid_email@example.com',
        };
        await httpServer
          .post('/api/users_reset_password_requests')
          .send(resetPasswordParams)
          .expect(200);
      });
    });
  });

  describe('user verify reset password token', () => {
    describe('success', () => {
      it('verify success', async () => {
        const resetToken = 'SampleToken!@#';
        await getRepository('users').save({
          id: userToken.resource_id,
          reset_password_sent_at: new Date(),
          reset_password_token: resetToken,
        });
        const params = {
          reset_token: resetToken,
          password: 'Letmein1234@',
          password_confirmation: 'Letmein1234@',
        };
        await httpServer
          .post('/api/users_verify_reset_password_requests')
          .send(params)
          .expect(200);
      });
    });
    describe('failure', () => {
      it('wrong token', async () => {
        const resetToken = 'SampleToken!@#';
        await getRepository('users').save({
          id: userToken.resource_id,
          reset_password_sent_at: new Date(),
          reset_password_token: resetToken,
        });
        const params = {
          reset_token: 'wrongToken123@',
          password: 'Letmein1234@',
          password_confirmation: 'Letmein1234@',
        };
        await httpServer
          .post('/api/users_verify_reset_password_requests')
          .send(params)
          .expect(400)
          .expect(({ body }) => {
            expect(body.message).toEqual('app.reset_token.invalid');
          });
      });
      it('expired token', async () => {
        const resetToken = 'SampleToken!@#';
        await getRepository('users').save({
          id: userToken.resource_id,
          reset_password_sent_at: new Date(),
          reset_password_token: resetToken,
        });
        const params = {
          reset_token: resetToken,
          password: 'Letmein1234@',
          password_confirmation: 'Letmein1234@',
        };
        advanceBy(
          config.get('authentication.resetPasswordIn') * 3600 * 1000 + 3000,
        );
        await httpServer
          .post('/api/users_verify_reset_password_requests')
          .send(params)
          .expect(400)
          .expect(({ body }) => {
            expect(body.message).toEqual('app.reset_token.expired');
          });
      });
    });
  });
});
