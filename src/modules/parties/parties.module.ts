import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { provideCustomRepository } from 'src/utils/repository';
import { PartyService } from './parties.service';
import { PartyController } from './parties.controller';
import { PartyRepository } from './parties.repository';
import { Party } from '@entities/parties';
import { NestjsFormDataModule } from 'nestjs-form-data';

@Module({
  imports: [TypeOrmModule.forFeature([Party]), NestjsFormDataModule],
  providers: [provideCustomRepository(Party, PartyRepository), PartyService],
  controllers: [PartyController],
})
export class PartyModule {}
