import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  FilterAdminResponseDTO,
  FilterAdminRequestDTO,
  ShowAdminResponseDTO,
  ShowAdminParamsDTO,
  CreateAdminResponseDTO,
  CreateAdminRequestDTO,
  UpdateAdminResponseDTO,
  UpdateAdminParamsDTO,
  UpdateAdminRequestDTO,
  DeleteAdminResponseDTO,
  DeleteAdminParamsDTO,
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
import { Admin } from '@entities/admins';
import { AdminRepository } from './admins.repository';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin)
    readonly repository: AdminRepository,
  ) {}

  async filter(queries: FilterAdminRequestDTO) {
    const conditions: QueryCondition[] = [
      {
        column: 'email',
        value: queries?.admins?.email,
        operator: QueryOperators.START_WITH,
        whereType: QueryWhereType.WHERE,
      },
    ];

    const relations: QueryRelation[] = [
      { column: 'parties', alias: 'parties' },
      { column: 'parties.banner', alias: 'parties_banner' },
      { column: 'parties.participants', alias: 'parties_participants' },
      { column: 'parties_participants.parties2s', alias: 'parties_participants_parties2s' },
      {
        column: 'parties_participants_parties2s.parties3s',
        alias: 'parties_participants_parties2s_parties3s',
      },
    ];

    const pagination: QueryPagination = {
      page: queries?.pagination_page,
      limit: queries?.pagination_limit,
    };

    const orders: QueryOrder[] = [{ orderBy: 'admins.created_at', orderDir: QueryOrderDir.DESC }];

    const [admins, totalCount, totalPages] = await this.repository.findMany({
      conditions,
      relations,
      pagination,
      orders,
    });

    return new FilterAdminResponseDTO(admins, totalCount, totalPages);
  }
  async show(params: ShowAdminParamsDTO) {
    const conditions: QueryCondition[] = [
      {
        column: 'admins.id',
        value: params.id,
        operator: QueryOperators.EQUAL,
        whereType: QueryWhereType.WHERE,
      },
    ];

    const relations: QueryRelation[] = [
      { column: 'parties', alias: 'parties' },
      { column: 'parties.banner', alias: 'parties_banner' },
    ];

    const entity = await this.repository.getOne({ conditions });
    const show = await this.repository.getRelations(entity, { relations });

    return new ShowAdminResponseDTO(show);
  }
  async create(request: CreateAdminRequestDTO) {
    const relations: QueryRelation[] = [
      { column: 'parties', alias: 'parties' },
      { column: 'parties.banner', alias: 'parties_banner' },
    ];

    const data = {
      email: request?.admins?.email,
    };

    const entity = await this.repository.createOne({ data });
    const create = await this.repository.getRelations(entity, { relations });

    return new CreateAdminResponseDTO(create);
  }
  async update(params: UpdateAdminParamsDTO, request: UpdateAdminRequestDTO) {
    const conditions: QueryCondition[] = [
      {
        column: 'admins.id',
        value: params.id,
        operator: QueryOperators.EQUAL,
        whereType: QueryWhereType.WHERE_AND,
      },
    ];

    const relations: QueryRelation[] = [
      { column: 'parties', alias: 'parties' },
      { column: 'parties.banner', alias: 'parties_banner' },
    ];

    const data = {
      email: request?.admins?.email,
    };

    const entity = await this.repository.updateOne({ conditions, data });
    const update = await this.repository.getRelations(entity, { relations });

    return new UpdateAdminResponseDTO(update);
  }
  async delete(params: DeleteAdminParamsDTO) {
    const conditions: QueryCondition[] = [
      {
        column: 'admins.id',
        value: params.id,
        operator: QueryOperators.EQUAL,
        whereType: QueryWhereType.WHERE,
      },
    ];

    await this.repository.removeOne({ conditions });

    return new DeleteAdminResponseDTO();
  }
}
