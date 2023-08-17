import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { provideCustomRepository } from 'src/utils/repository';
import { UserService } from './users.service';
import { UserController } from './users.controller';
import { UserRepository } from './users.repository';
import { User } from '@entities/users';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [provideCustomRepository(User, UserRepository), UserService],
  controllers: [UserController],
})
export class UserModule {}
