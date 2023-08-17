import { Injectable } from '@nestjs/common';
import { BaseRepository } from 'src/shared/base.repository';
import { Parties2 } from '@entities/parties_2_s';

@Injectable()
export class Parties2Repository extends BaseRepository<Parties2> {}
