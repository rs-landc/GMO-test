import {
  Controller,
  Query,
  Get as MethodGet,
  Param,
  Body,
  Post as MethodPost,
  Put as MethodPut,
  Delete as MethodDelete,
} from '@nestjs/common';
import { Parties3Service } from './parties-3-s.service';
import { ApiTags } from '@nestjs/swagger';
import {
  FilterParties3ResponseDTO,
  FilterParties3RequestDTO,
  FilterParties3Request,
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
import { ApiNestedQuery } from '@decorators/api-nested-query.decorator';

@Controller()
@ApiTags('Parties3')
export class Parties3Controller {
  constructor(private readonly parties3Service: Parties3Service) {}

  @MethodGet('/api/parties3s')
  @ApiNestedQuery('parties3s', FilterParties3Request)
  filter(@Query() queries: FilterParties3RequestDTO): Promise<FilterParties3ResponseDTO> {
    return this.parties3Service.filter(queries);
  }

  @MethodGet('/api/parties3s/:id')
  show(@Param() params: ShowParties3ParamsDTO): Promise<ShowParties3ResponseDTO> {
    return this.parties3Service.show(params);
  }

  @MethodPost('/api/parties3s')
  create(@Body() request: CreateParties3RequestDTO): Promise<CreateParties3ResponseDTO> {
    return this.parties3Service.create(request);
  }

  @MethodPut('/api/parties3s/:id')
  update(
    @Param() params: UpdateParties3ParamsDTO,
    @Body() request: UpdateParties3RequestDTO,
  ): Promise<UpdateParties3ResponseDTO> {
    return this.parties3Service.update(params, request);
  }

  @MethodDelete('/api/parties3s/:id')
  delete(@Param() params: DeleteParties3ParamsDTO): Promise<DeleteParties3ResponseDTO> {
    return this.parties3Service.delete(params);
  }
}
