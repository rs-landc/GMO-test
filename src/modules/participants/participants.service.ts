import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  FilterParticipantResponseDTO,
  FilterParticipantRequestDTO,
  ShowParticipantResponseDTO,
  ShowParticipantParamsDTO,
  CreateParticipantResponseDTO,
  CreateParticipantRequestDTO,
  UpdateParticipantResponseDTO,
  UpdateParticipantParamsDTO,
  UpdateParticipantRequestDTO,
  DeleteParticipantResponseDTO,
  DeleteParticipantParamsDTO,
} from './dto';
import {
  QueryCondition,
  QueryOperators,
  QueryWhereType,
  QueryRelation,
  QueryPagination,
  QueryOrder,
  QueryOrderDir,
} from 'src/shared/base.repository';
import { Participant } from '@entities/participants';
import { ParticipantRepository } from './participants.repository';

@Injectable()
export class ParticipantService {
  constructor(
    @InjectRepository(Participant)
    readonly repository: ParticipantRepository,
  ) {}

  async filter(queries: FilterParticipantRequestDTO) {
    const conditions: QueryCondition[] = [
      {
        column: 'status',
        value: queries?.participants?.status,
        operator: QueryOperators.EQUAL,
        whereType: QueryWhereType.WHERE,
      },
      {
        column: 'user_id',
        value: queries?.participants?.user_id,
        operator: QueryOperators.EQUAL,
        whereType: QueryWhereType.WHERE_OR,
      },
      {
        column: 'party_id',
        value: queries?.participants?.party_id,
        operator: QueryOperators.EQUAL,
        whereType: QueryWhereType.WHERE_OR,
      },
    ];

    const relations: QueryRelation[] = [
      { column: 'user', alias: 'user' },
      { column: 'party', alias: 'party' },
      { column: 'party.banner', alias: 'party_banner' },
      { column: 'parties2s', alias: 'parties2s' },
    ];

    const pagination: QueryPagination = {
      page: queries?.pagination_page,
      limit: queries?.pagination_limit,
    };

    const orders: QueryOrder[] = [
      { orderBy: 'participants.created_at', orderDir: QueryOrderDir.DESC },
    ];

    const [participants, totalCount, totalPages] = await this.repository.findMany({
      conditions,
      relations,
      pagination,
      orders,
    });

    return new FilterParticipantResponseDTO(participants, totalCount, totalPages);
  }
  async show(params: ShowParticipantParamsDTO) {
    const conditions: QueryCondition[] = [
      {
        column: 'participants.id',
        value: params.id,
        operator: QueryOperators.EQUAL,
        whereType: QueryWhereType.WHERE,
      },
    ];

    const relations: QueryRelation[] = [
      { column: 'user', alias: 'user' },
      { column: 'party', alias: 'party' },
      { column: 'party.banner', alias: 'party_banner' },
      { column: 'parties2s', alias: 'parties2s' },
    ];

    const entity = await this.repository.getOne({ conditions });
    const show = await this.repository.getRelations(entity, { relations });

    return new ShowParticipantResponseDTO(show);
  }
  async create(request: CreateParticipantRequestDTO) {
    const relations: QueryRelation[] = [
      { column: 'user', alias: 'user' },
      { column: 'party', alias: 'party' },
      { column: 'party.banner', alias: 'party_banner' },
      { column: 'parties2s', alias: 'parties2s' },
    ];

    const data = {
      status: request?.participants?.status,
      user_id: request?.participants?.user_id,
      party_id: request?.participants?.party_id,
    };

    const entity = await this.repository.createOne({ data });
    const create = await this.repository.getRelations(entity, { relations });

    return new CreateParticipantResponseDTO(create);
  }
  async update(params: UpdateParticipantParamsDTO, request: UpdateParticipantRequestDTO) {
    const conditions: QueryCondition[] = [
      {
        column: 'participants.id',
        value: params.id,
        operator: QueryOperators.EQUAL,
        whereType: QueryWhereType.WHERE_AND,
      },
    ];

    const relations: QueryRelation[] = [
      { column: 'user', alias: 'user' },
      { column: 'party', alias: 'party' },
      { column: 'party.banner', alias: 'party_banner' },
      { column: 'parties2s', alias: 'parties2s' },
    ];

    const data = {
      status: request?.participants?.status,
      user_id: request?.participants?.user_id,
      party_id: request?.participants?.party_id,
    };

    const entity = await this.repository.updateOne({ conditions, data });
    const update = await this.repository.getRelations(entity, { relations });

    return new UpdateParticipantResponseDTO(update);
  }
  async delete(params: DeleteParticipantParamsDTO) {
    const conditions: QueryCondition[] = [
      {
        column: 'participants.id',
        value: params.id,
        operator: QueryOperators.EQUAL,
        whereType: QueryWhereType.WHERE,
      },
    ];

    await this.repository.removeOne({ conditions });

    return new DeleteParticipantResponseDTO();
  }
}
