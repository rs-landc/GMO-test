import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { provideCustomRepository } from 'src/utils/repository';
import { AdminService } from './admins.service';
import { AdminController } from './admins.controller';
import { AdminRepository } from './admins.repository';
import { Admin } from '@entities/admins';

@Module({
  imports: [TypeOrmModule.forFeature([Admin])],
  providers: [provideCustomRepository(Admin, AdminRepository), AdminService],
  controllers: [AdminController],
})
export class AdminModule {}
