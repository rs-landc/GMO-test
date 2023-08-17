import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { provideCustomRepository } from 'src/utils/repository';
import { Parties2Service } from './parties-2-s.service';
import { Parties2Controller } from './parties-2-s.controller';
import { Parties2Repository } from './parties-2-s.repository';
import { Parties2 } from '@entities/parties_2_s';

@Module({
  imports: [TypeOrmModule.forFeature([Parties2])],
  providers: [provideCustomRepository(Parties2, Parties2Repository), Parties2Service],
  controllers: [Parties2Controller],
})
export class Parties2Module {}
