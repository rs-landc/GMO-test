import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  FilterParties3ResponseDTO,
  FilterParties3RequestDTO,
  ShowParties3ResponseDTO,
  ShowParties3ParamsDTO,
  CreateParties3ResponseDTO,
  CreateParties3RequestDTO,
  UpdateParties3ResponseDTO,
  UpdateParties3ParamsDTO,
  UpdateParties3RequestDTO,
  DeleteParties3ResponseDTO,
  DeleteParties3ParamsDTO,
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
import { Parties3 } from '@entities/parties_3_s';
import { Parties3Repository } from './parties-3-s.repository';

@Injectable()
export class Parties3Service {
  constructor(
    @InjectRepository(Parties3)
    readonly repository: Parties3Repository,
  ) {}

  async filter(queries: FilterParties3RequestDTO) {
    const conditions: QueryCondition[] = [
      {
        column: 'parties2_id',
        value: queries?.parties3s?.parties2_id,
        operator: QueryOperators.EQUAL,
        whereType: QueryWhereType.WHERE,
      },
      {
        column: 'content',
        value: queries?.parties3s?.content,
        operator: QueryOperators.START_WITH,
        whereType: QueryWhereType.WHERE_OR,
      },
    ];

    const relations: QueryRelation[] = [{ column: 'parties2', alias: 'parties2' }];

    const pagination: QueryPagination = {
      page: queries?.pagination_page,
      limit: queries?.pagination_limit,
    };

    const orders: QueryOrder[] = [
      { orderBy: 'parties3s.created_at', orderDir: QueryOrderDir.DESC },
    ];

    const [parties_3_s, totalCount, totalPages] = await this.repository.findMany({
      conditions,
      relations,
      pagination,
      orders,
    });

    return new FilterParties3ResponseDTO(parties_3_s, totalCount, totalPages);
  }
  async show(params: ShowParties3ParamsDTO) {
    const conditions: QueryCondition[] = [
      {
        column: 'parties3s.id',
        value: params.id,
        operator: QueryOperators.EQUAL,
        whereType: QueryWhereType.WHERE,
      },
    ];

    const relations: QueryRelation[] = [{ column: 'parties2', alias: 'parties2' }];

    const entity = await this.repository.getOne({ conditions });
    const show = await this.repository.getRelations(entity, { relations });

    return new ShowParties3ResponseDTO(show);
  }
  async create(request: CreateParties3RequestDTO) {
    const relations: QueryRelation[] = [{ column: 'parties2', alias: 'parties2' }];

    const data = {
      parties2_id: request?.parties3s?.parties2_id,
      content: request?.parties3s?.content,
    };

    const entity = await this.repository.createOne({ data });
    const create = await this.repository.getRelations(entity, { relations });

    return new CreateParties3ResponseDTO(create);
  }
  async update(params: UpdateParties3ParamsDTO, request: UpdateParties3RequestDTO) {
    const conditions: QueryCondition[] = [
      {
        column: 'parties3s.id',
        value: params.id,
        operator: QueryOperators.EQUAL,
        whereType: QueryWhereType.WHERE_AND,
      },
    ];

    const relations: QueryRelation[] = [{ column: 'parties2', alias: 'parties2' }];

    const data = {
      parties2_id: request?.parties3s?.parties2_id,
      content: request?.parties3s?.content,
    };

    const entity = await this.repository.updateOne({ conditions, data });
    const update = await this.repository.getRelations(entity, { relations });

    return new UpdateParties3ResponseDTO(update);
  }
  async delete(params: DeleteParties3ParamsDTO) {
    const conditions: QueryCondition[] = [
      {
        column: 'parties3s.id',
        value: params.id,
        operator: QueryOperators.EQUAL,
        whereType: QueryWhereType.WHERE,
      },
    ];

    await this.repository.removeOne({ conditions });

    return new DeleteParties3ResponseDTO();
  }
}
