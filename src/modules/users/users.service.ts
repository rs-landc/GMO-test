import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  FilterUserResponseDTO,
  FilterUserRequestDTO,
  ShowUserResponseDTO,
  ShowUserParamsDTO,
  CreateUserResponseDTO,
  CreateUserRequestDTO,
  UpdateUserResponseDTO,
  UpdateUserParamsDTO,
  UpdateUserRequestDTO,
  DeleteUserResponseDTO,
  DeleteUserParamsDTO,
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
import { User } from '@entities/users';
import { UserRepository } from './users.repository';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    readonly repository: UserRepository,
  ) {}

  async filter(queries: FilterUserRequestDTO) {
    const conditions: QueryCondition[] = [
      {
        column: 'fullname',
        value: queries?.users?.fullname,
        operator: QueryOperators.START_WITH,
        whereType: QueryWhereType.WHERE,
      },
      {
        column: 'birthday',
        value: queries?.users?.birthday,
        operator: QueryOperators.EQUAL,
        whereType: QueryWhereType.WHERE_OR,
      },
      {
        column: 'email',
        value: queries?.users?.email,
        operator: QueryOperators.START_WITH,
        whereType: QueryWhereType.WHERE_OR,
      },
    ];

    const relations: QueryRelation[] = [{ column: 'participants', alias: 'participants' }];

    const pagination: QueryPagination = {
      page: queries?.pagination_page,
      limit: queries?.pagination_limit,
    };

    const orders: QueryOrder[] = [{ orderBy: 'users.created_at', orderDir: QueryOrderDir.DESC }];

    const [users, totalCount, totalPages] = await this.repository.findMany({
      conditions,
      relations,
      pagination,
      orders,
    });

    return new FilterUserResponseDTO(users, totalCount, totalPages);
  }
  async show(params: ShowUserParamsDTO) {
    const conditions: QueryCondition[] = [
      {
        column: 'users.id',
        value: params.id,
        operator: QueryOperators.EQUAL,
        whereType: QueryWhereType.WHERE,
      },
    ];

    const relations: QueryRelation[] = [{ column: 'participants', alias: 'participants' }];

    const entity = await this.repository.getOne({ conditions });
    const show = await this.repository.getRelations(entity, { relations });

    return new ShowUserResponseDTO(show);
  }
  async create(request: CreateUserRequestDTO) {
    const relations: QueryRelation[] = [{ column: 'participants', alias: 'participants' }];

    const data = {
      fullname: request?.users?.fullname,
      birthday: request?.users?.birthday,
      email: request?.users?.email,
    };

    const entity = await this.repository.createOne({ data });
    const create = await this.repository.getRelations(entity, { relations });

    return new CreateUserResponseDTO(create);
  }
  async update(params: UpdateUserParamsDTO, request: UpdateUserRequestDTO) {
    const conditions: QueryCondition[] = [
      {
        column: 'users.id',
        value: params.id,
        operator: QueryOperators.EQUAL,
        whereType: QueryWhereType.WHERE_AND,
      },
    ];

    const relations: QueryRelation[] = [{ column: 'participants', alias: 'participants' }];

    const data = {
      fullname: request?.users?.fullname,
      birthday: request?.users?.birthday,
      email: request?.users?.email,
    };

    const entity = await this.repository.updateOne({ conditions, data });
    const update = await this.repository.getRelations(entity, { relations });

    return new UpdateUserResponseDTO(update);
  }
  async delete(params: DeleteUserParamsDTO) {
    const conditions: QueryCondition[] = [
      {
        column: 'users.id',
        value: params.id,
        operator: QueryOperators.EQUAL,
        whereType: QueryWhereType.WHERE,
      },
    ];

    await this.repository.removeOne({ conditions });

    return new DeleteUserResponseDTO();
  }
}
