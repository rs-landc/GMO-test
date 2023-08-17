import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { provideCustomRepository } from 'src/utils/repository';
import { Parties3Service } from './parties-3-s.service';
import { Parties3Controller } from './parties-3-s.controller';
import { Parties3Repository } from './parties-3-s.repository';
import { Parties3 } from '@entities/parties_3_s';

@Module({
  imports: [TypeOrmModule.forFeature([Parties3])],
  providers: [provideCustomRepository(Parties3, Parties3Repository), Parties3Service],
  controllers: [Parties3Controller],
})
export class Parties3Module {}
