import { Injectable } from '@nestjs/common';
import { BaseRepository } from 'src/shared/base.repository';
import { Participant } from '@entities/participants';

@Injectable()
export class ParticipantRepository extends BaseRepository<Participant> {}
