import { NumberField } from 'src/decorators/field.decorator';

export class DeleteUserParamsDTO {
  @NumberField({ int: true })
  id: number;
}

export class DeleteUserResponseDTO {}
