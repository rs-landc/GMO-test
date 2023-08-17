import { Parties3 } from '@entities/parties3s';
import { NumberField } from 'src/decorators/field.decorator';

export class ShowParties3ParamsDTO {
  @NumberField({ int: true })
  id: number;
}
export class Parties2ShowParties3Response {
  id: number;
  created_at: Date;
  updated_at: Date;
  participant_id: number;
}
export class ShowParties3Response {
  id: number;
  created_at: Date;
  updated_at: Date;
  parties2: Parties2ShowParties3Response;
  parties2_id: number;
  content: string;
}
export class ShowMessageResponse {}

export class ShowParties3ResponseDTO {
  parties3: ShowParties3Response;
  message: Object;

  constructor(parties3: Parties3, message?: Object) {
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
    this.message = message;
  }
}
