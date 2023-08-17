import { Injectable } from '@nestjs/common';
import { BaseRepository } from 'src/shared/base.repository';
import { Party } from '@entities/parties';

@Injectable()
export class PartyRepository extends BaseRepository<Party> {}
