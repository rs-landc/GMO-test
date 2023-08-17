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
import { Parties2Service } from './parties-2-s.service';
import { ApiTags } from '@nestjs/swagger';
import {
  FilterParties2ResponseDTO,
  FilterParties2RequestDTO,
  FilterParties2Request,
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
import { ApiNestedQuery } from '@decorators/api-nested-query.decorator';

@Controller()
@ApiTags('Parties2')
export class Parties2Controller {
  constructor(private readonly parties2Service: Parties2Service) {}

  @MethodGet('/api/parties2s')
  @ApiNestedQuery('parties2s', FilterParties2Request)
  filter(@Query() queries: FilterParties2RequestDTO): Promise<FilterParties2ResponseDTO> {
    return this.parties2Service.filter(queries);
  }

  @MethodGet('/api/parties2s/:id')
  show(@Param() params: ShowParties2ParamsDTO): Promise<ShowParties2ResponseDTO> {
    return this.parties2Service.show(params);
  }

  @MethodPost('/api/parties2s')
  create(@Body() request: CreateParties2RequestDTO): Promise<CreateParties2ResponseDTO> {
    return this.parties2Service.create(request);
  }

  @MethodPut('/api/parties2s/:id')
  update(
    @Param() params: UpdateParties2ParamsDTO,
    @Body() request: UpdateParties2RequestDTO,
  ): Promise<UpdateParties2ResponseDTO> {
    return this.parties2Service.update(params, request);
  }

  @MethodDelete('/api/parties2s/:id')
  delete(@Param() params: DeleteParties2ParamsDTO): Promise<DeleteParties2ResponseDTO> {
    return this.parties2Service.delete(params);
  }
}
