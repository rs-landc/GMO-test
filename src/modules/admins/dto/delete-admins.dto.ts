import { NumberField } from 'src/decorators/field.decorator';

export class DeleteAdminParamsDTO {
  @NumberField({ int: true })
  id: number;
}

export class DeleteAdminResponseDTO {}
