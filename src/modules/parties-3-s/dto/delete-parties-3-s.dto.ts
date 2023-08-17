import { NumberField } from 'src/decorators/field.decorator';

export class DeleteParties3ParamsDTO {
  @NumberField({ int: true })
  id: number;
}
export class DeleteMessageResponse {}

export class DeleteParties3ResponseDTO {}
