import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  FilterParties2ResponseDTO,
  FilterParties2RequestDTO,
  ShowParties2ResponseDTO,
  ShowParties2ParamsDTO,
  CreateParties2ResponseDTO,
  CreateParties2RequestDTO,
  UpdateParties2ResponseDTO,
  UpdateParties2ParamsDTO,
  UpdateParties2RequestDTO,
  DeleteParties2ResponseDTO,
  DeleteParties2ParamsDTO,
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
import { Parties2 } from '@entities/parties_2_s';
import { Parties2Repository } from './parties-2-s.repository';

@Injectable()
export class Parties2Service {
  constructor(
    @InjectRepository(Parties2)
    readonly repository: Parties2Repository,
  ) {}

  async filter(queries: FilterParties2RequestDTO) {
    const conditions: QueryCondition[] = [
      {
        column: 'participant_id',
        value: queries?.parties2s?.participant_id,
        operator: QueryOperators.EQUAL,
        whereType: QueryWhereType.WHERE,
      },
      {
        column: 'content',
        value: queries?.parties2s?.content,
        operator: QueryOperators.START_WITH,
        whereType: QueryWhereType.WHERE_OR,
      },
    ];

    const relations: QueryRelation[] = [
      { column: 'participant', alias: 'participant' },
      { column: 'parties3s', alias: 'parties3s' },
    ];

    const pagination: QueryPagination = {
      page: queries?.pagination_page,
      limit: queries?.pagination_limit,
    };

    const orders: QueryOrder[] = [
      { orderBy: 'parties2s.created_at', orderDir: QueryOrderDir.DESC },
    ];

    const [parties_2_s, totalCount, totalPages] = await this.repository.findMany({
      conditions,
      relations,
      pagination,
      orders,
    });

    return new FilterParties2ResponseDTO(parties_2_s, totalCount, totalPages);
  }
  async show(params: ShowParties2ParamsDTO) {
    const conditions: QueryCondition[] = [
      {
        column: 'parties2s.id',
        value: params.id,
        operator: QueryOperators.EQUAL,
        whereType: QueryWhereType.WHERE,
      },
    ];

    const relations: QueryRelation[] = [
      { column: 'participant', alias: 'participant' },
      { column: 'parties3s', alias: 'parties3s' },
    ];

    const entity = await this.repository.getOne({ conditions });
    const show = await this.repository.getRelations(entity, { relations });

    return new ShowParties2ResponseDTO(show);
  }
  async create(request: CreateParties2RequestDTO) {
    const relations: QueryRelation[] = [
      { column: 'participant', alias: 'participant' },
      { column: 'parties3s', alias: 'parties3s' },
    ];

    const data = {
      participant_id: request?.parties2s?.participant_id,
      content: request?.parties2s?.content,
    };

    const entity = await this.repository.createOne({ data });
    const create = await this.repository.getRelations(entity, { relations });

    return new CreateParties2ResponseDTO(create);
  }
  async update(params: UpdateParties2ParamsDTO, request: UpdateParties2RequestDTO) {
    const conditions: QueryCondition[] = [
      {
        column: 'parties2s.id',
        value: params.id,
        operator: QueryOperators.EQUAL,
        whereType: QueryWhereType.WHERE_AND,
      },
    ];

    const relations: QueryRelation[] = [
      { column: 'participant', alias: 'participant' },
      { column: 'parties3s', alias: 'parties3s' },
    ];

    const data = {
      participant_id: request?.parties2s?.participant_id,
      content: request?.parties2s?.content,
    };

    const entity = await this.repository.updateOne({ conditions, data });
    const update = await this.repository.getRelations(entity, { relations });

    return new UpdateParties2ResponseDTO(update);
  }
  async delete(params: DeleteParties2ParamsDTO) {
    const conditions: QueryCondition[] = [
      {
        column: 'parties2s.id',
        value: params.id,
        operator: QueryOperators.EQUAL,
        whereType: QueryWhereType.WHERE,
      },
    ];

    await this.repository.removeOne({ conditions });

    return new DeleteParties2ResponseDTO();
  }
}
