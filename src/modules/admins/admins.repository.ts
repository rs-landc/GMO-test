import { Injectable } from '@nestjs/common';
import { BaseRepository } from 'src/shared/base.repository';
import { Admin } from '@entities/admins';

@Injectable()
export class AdminRepository extends BaseRepository<Admin> {}
