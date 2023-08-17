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
import { PartyService } from './parties.service';
import { ApiTags } from '@nestjs/swagger';
import {
  FilterPartyResponseDTO,
  FilterPartyRequestDTO,
  FilterPartyRequest,
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
import { ApiNestedQuery } from '@decorators/api-nested-query.decorator';
import { ApiUpload } from '@decorators/api-upload.decorator';

@Controller()
@ApiTags('Party')
export class PartyController {
  constructor(private readonly partyService: PartyService) {}

  @MethodGet('/api/parties')
  @ApiNestedQuery('parties', FilterPartyRequest)
  filter(@Query() queries: FilterPartyRequestDTO): Promise<FilterPartyResponseDTO> {
    return this.partyService.filter(queries);
  }

  @MethodGet('/api/parties/:id')
  show(@Param() params: ShowPartyParamsDTO): Promise<ShowPartyResponseDTO> {
    return this.partyService.show(params);
  }

  @MethodPost('/api/parties')
  @ApiUpload()
  create(@Body() request: CreatePartyRequestDTO): Promise<CreatePartyResponseDTO> {
    return this.partyService.create(request);
  }

  @MethodPut('/api/parties/:id')
  @ApiUpload()
  update(
    @Param() params: UpdatePartyParamsDTO,
    @Body() request: UpdatePartyRequestDTO,
  ): Promise<UpdatePartyResponseDTO> {
    return this.partyService.update(params, request);
  }

  @MethodDelete('/api/parties/:id')
  delete(@Param() params: DeletePartyParamsDTO): Promise<DeletePartyResponseDTO> {
    return this.partyService.delete(params);
  }
}
