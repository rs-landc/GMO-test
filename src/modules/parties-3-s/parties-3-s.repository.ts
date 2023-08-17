import { Injectable } from '@nestjs/common';
import { BaseRepository } from 'src/shared/base.repository';
import { Parties3 } from '@entities/parties_3_s';

@Injectable()
export class Parties3Repository extends BaseRepository<Parties3> {}
