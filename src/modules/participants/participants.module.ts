import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { provideCustomRepository } from 'src/utils/repository';
import { ParticipantService } from './participants.service';
import { ParticipantController } from './participants.controller';
import { ParticipantRepository } from './participants.repository';
import { Participant } from '@entities/participants';

@Module({
  imports: [TypeOrmModule.forFeature([Participant])],
  providers: [provideCustomRepository(Participant, ParticipantRepository), ParticipantService],
  controllers: [ParticipantController],
})
export class ParticipantModule {}
