import { NumberField } from 'src/decorators/field.decorator';

export class DeleteParticipantParamsDTO {
  @NumberField({ int: true })
  id: number;
}

export class DeleteParticipantResponseDTO {}
