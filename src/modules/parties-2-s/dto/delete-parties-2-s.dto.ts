import { NumberField } from 'src/decorators/field.decorator';

export class DeleteParties2ParamsDTO {
  @NumberField({ int: true })
  id: number;
}
export class DeleteMessageResponse {}

export class DeleteParties2ResponseDTO {}
