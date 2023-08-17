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
import { ParticipantService } from './participants.service';
import { ApiTags } from '@nestjs/swagger';
import {
  FilterParticipantResponseDTO,
  FilterParticipantRequestDTO,
  FilterParticipantRequest,
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
import { ApiNestedQuery } from '@decorators/api-nested-query.decorator';

@Controller()
@ApiTags('Participant')
export class ParticipantController {
  constructor(private readonly participantService: ParticipantService) {}

  @MethodGet('/api/participants')
  @ApiNestedQuery('participants', FilterParticipantRequest)
  filter(@Query() queries: FilterParticipantRequestDTO): Promise<FilterParticipantResponseDTO> {
    return this.participantService.filter(queries);
  }

  @MethodGet('/api/participants/:id')
  show(@Param() params: ShowParticipantParamsDTO): Promise<ShowParticipantResponseDTO> {
    return this.participantService.show(params);
  }

  @MethodPost('/api/participants')
  create(@Body() request: CreateParticipantRequestDTO): Promise<CreateParticipantResponseDTO> {
    return this.participantService.create(request);
  }

  @MethodPut('/api/participants/:id')
  update(
    @Param() params: UpdateParticipantParamsDTO,
    @Body() request: UpdateParticipantRequestDTO,
  ): Promise<UpdateParticipantResponseDTO> {
    return this.participantService.update(params, request);
  }

  @MethodDelete('/api/participants/:id')
  delete(@Param() params: DeleteParticipantParamsDTO): Promise<DeleteParticipantResponseDTO> {
    return this.participantService.delete(params);
  }
}
