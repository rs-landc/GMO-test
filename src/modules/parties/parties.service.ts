import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  FilterPartyResponseDTO,
  FilterPartyRequestDTO,
  ShowPartyResponseDTO,
  ShowPartyParamsDTO,
  CreatePartyResponseDTO,
  CreatePartyRequestDTO,
  UpdatePartyResponseDTO,
  UpdatePartyParamsDTO,
  UpdatePartyRequestDTO,
  DeletePartyResponseDTO,
  DeletePartyParamsDTO,
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
import { UploadService } from 'src/shared/storage/upload.service';
import { Party } from '@entities/parties';
import { PartyRepository } from './parties.repository';

@Injectable()
export class PartyService {
  constructor(
    @InjectRepository(Party)
    readonly repository: PartyRepository,
    private readonly uploadService: UploadService,
  ) {}

  async filter(queries: FilterPartyRequestDTO) {
    const conditions: QueryCondition[] = [
      {
        column: 'name',
        value: queries?.parties?.name,
        operator: QueryOperators.START_WITH,
        whereType: QueryWhereType.WHERE,
      },
      {
        column: 'address',
        value: queries?.parties?.address,
        operator: QueryOperators.START_WITH,
        whereType: QueryWhereType.WHERE_OR,
      },
      {
        column: 'time_takes_place',
        value: queries?.parties?.time_takes_place,
        operator: QueryOperators.EQUAL,
        whereType: QueryWhereType.WHERE_OR,
      },
      {
        column: 'number_of_registrations',
        value: queries?.parties?.number_of_registrations,
        operator: QueryOperators.EQUAL,
        whereType: QueryWhereType.WHERE_OR,
      },
      {
        column: 'registered_quantity',
        value: queries?.parties?.registered_quantity,
        operator: QueryOperators.EQUAL,
        whereType: QueryWhereType.WHERE_OR,
      },
      {
        column: 'status_party',
        value: queries?.parties?.status_party,
        operator: QueryOperators.EQUAL,
        whereType: QueryWhereType.WHERE_OR,
      },
      {
        column: 'min_age',
        value: queries?.parties?.min_age,
        operator: QueryOperators.EQUAL,
        whereType: QueryWhereType.WHERE_OR,
      },
      {
        column: 'admin_id',
        value: queries?.parties?.admin_id,
        operator: QueryOperators.EQUAL,
        whereType: QueryWhereType.WHERE_OR,
      },
    ];

    const relations: QueryRelation[] = [
      { column: 'banner', alias: 'banner' },
      { column: 'admin', alias: 'admin' },
      { column: 'participants', alias: 'participants' },
    ];

    const pagination: QueryPagination = {
      page: queries?.pagination_page,
      limit: queries?.pagination_limit,
    };

    const orders: QueryOrder[] = [{ orderBy: 'parties.created_at', orderDir: QueryOrderDir.DESC }];

    const [parties, totalCount, totalPages] = await this.repository.findMany({
      conditions,
      relations,
      pagination,
      orders,
    });

    return new FilterPartyResponseDTO(parties, totalCount, totalPages);
  }
  async show(params: ShowPartyParamsDTO) {
    const conditions: QueryCondition[] = [
      {
        column: 'parties.id',
        value: params.id,
        operator: QueryOperators.EQUAL,
        whereType: QueryWhereType.WHERE,
      },
    ];

    const relations: QueryRelation[] = [
      { column: 'banner', alias: 'banner' },
      { column: 'admin', alias: 'admin' },
      { column: 'participants', alias: 'participants' },
    ];

    const entity = await this.repository.getOne({ conditions });
    const show = await this.repository.getRelations(entity, { relations });

    return new ShowPartyResponseDTO(show);
  }
  async create(request: CreatePartyRequestDTO) {
    const relations: QueryRelation[] = [
      { column: 'banner', alias: 'banner' },
      { column: 'admin', alias: 'admin' },
      { column: 'participants', alias: 'participants' },
    ];

    const data = {
      name: request?.parties?.name,
      address: request?.parties?.address,
      time_takes_place: request?.parties?.time_takes_place,
      number_of_registrations: request?.parties?.number_of_registrations,
      registered_quantity: request?.parties?.registered_quantity,
      status_party: request?.parties?.status_party,
      ...(request?.parties?.banner
        ? { banner: await this.uploadService.uploadFile(request?.parties?.banner) }
        : {}),
      min_age: request?.parties?.min_age,
      admin_id: request?.parties?.admin_id,
    };

    const entity = await this.repository.createOne({ data });
    const create = await this.repository.getRelations(entity, { relations });

    return new CreatePartyResponseDTO(create);
  }
  async update(params: UpdatePartyParamsDTO, request: UpdatePartyRequestDTO) {
    const conditions: QueryCondition[] = [
      {
        column: 'parties.id',
        value: params.id,
        operator: QueryOperators.EQUAL,
        whereType: QueryWhereType.WHERE_AND,
      },
    ];

    const relations: QueryRelation[] = [
      { column: 'banner', alias: 'banner' },
      { column: 'admin', alias: 'admin' },
      { column: 'participants', alias: 'participants' },
    ];

    const data = {
      name: request?.parties?.name,
      address: request?.parties?.address,
      time_takes_place: request?.parties?.time_takes_place,
      number_of_registrations: request?.parties?.number_of_registrations,
      registered_quantity: request?.parties?.registered_quantity,
      status_party: request?.parties?.status_party,
      ...(request?.parties?.banner
        ? { banner: await this.uploadService.uploadFile(request?.parties?.banner) }
        : {}),
      min_age: request?.parties?.min_age,
      admin_id: request?.parties?.admin_id,
    };

    const entity = await this.repository.updateOne({ conditions, data });
    const update = await this.repository.getRelations(entity, { relations });

    return new UpdatePartyResponseDTO(update);
  }
  async delete(params: DeletePartyParamsDTO) {
    const conditions: QueryCondition[] = [
      {
        column: 'parties.id',
        value: params.id,
        operator: QueryOperators.EQUAL,
        whereType: QueryWhereType.WHERE,
      },
    ];

    await this.repository.removeOne({ conditions });

    return new DeletePartyResponseDTO();
  }
}
