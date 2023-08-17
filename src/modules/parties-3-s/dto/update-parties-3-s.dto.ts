import { Parties3 } from '@entities/parties3s';
import {
  NumberField,
  NumberFieldOptional,
  StringFieldOptional,
  ObjectFieldOptional,
} from 'src/decorators/field.decorator';

export class UpdateParties3ParamsDTO {
  @NumberField({ int: true })
  id: number;
}
export class UpdateParties3Request {
  @NumberFieldOptional({ int: true })
  parties2_id?: number;
  @StringFieldOptional({ maxLength: 65535, minLength: 0 })
  content?: string;
}
export class UpdateParties3RequestDTO {
  @ObjectFieldOptional(UpdateParties3Request)
  parties3s?: UpdateParties3Request;
}
export class Parties2UpdateParties3Response {
  id: number;
  created_at: Date;
  updated_at: Date;
  participant_id: number;
}
export class UpdateParties3Response {
  id: number;
  created_at: Date;
  updated_at: Date;
  parties2: Parties2UpdateParties3Response;
  parties2_id: number;
  content: string;
}
export class UpdateErrorObjectResponse {}

export class UpdateParties3ResponseDTO {
  parties3: UpdateParties3Response;
  error_object: Object;

  constructor(parties3: Parties3, error_object?: Object) {
    this.parties3 = {
      ...parties3,
      id: parties3?.id,
      created_at: parties3?.created_at,
      updated_at: parties3?.updated_at,
      parties2: {
        id: parties3?.parties2?.id,
        created_at: parties3?.parties2?.created_at,
        updated_at: parties3?.parties2?.updated_at,
        participant_id: parties3?.parties2?.participant_id,
      },
      parties2_id: parties3?.parties2_id,
      content: parties3?.content,
    };
    this.error_object = error_object;
  }
}
