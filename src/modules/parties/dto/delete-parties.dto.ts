import { NumberField } from 'src/decorators/field.decorator';

export class DeletePartyParamsDTO {
  @NumberField({ int: true })
  id: number;
}

export class DeletePartyResponseDTO {}
