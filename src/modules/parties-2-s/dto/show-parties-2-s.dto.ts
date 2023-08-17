import { Parties2 } from '@entities/parties2s';
import { NumberField } from 'src/decorators/field.decorator';

export class ShowParties2ParamsDTO {
  @NumberField({ int: true })
  id: number;
}
export class ParticipantShowParties2Response {
  id: number;
  created_at: Date;
  updated_at: Date;
  status: number;
  user_id: number;
  party_id: number;
}
export class Parties3ShowParties2Response {
  id: number;
  created_at: Date;
  updated_at: Date;
  parties2_id: number;
}
export class ShowParties2Response {
  id: number;
  created_at: Date;
  updated_at: Date;
  participant: ParticipantShowParties2Response;
  participant_id: number;
  parties3s: Parties3ShowParties2Response[];
  content: string;
}
export class ShowMessageResponse {}

export class ShowParties2ResponseDTO {
  parties2: ShowParties2Response;
  message: Object;

  constructor(parties2: Parties2, message?: Object) {
    this.parties2 = {
      ...parties2,
      id: parties2?.id,
      created_at: parties2?.created_at,
      updated_at: parties2?.updated_at,
      participant: {
        id: parties2?.participant?.id,
        created_at: parties2?.participant?.created_at,
        updated_at: parties2?.participant?.updated_at,
        status: parties2?.participant?.status,
        user_id: parties2?.participant?.user_id,
        party_id: parties2?.participant?.party_id,
      },
      participant_id: parties2?.participant_id,
      parties3s: parties2?.parties3s?.map((parties3) => ({
        ...parties3,
        id: parties3?.id,
        created_at: parties3?.created_at,
        updated_at: parties3?.updated_at,
        parties2_id: parties3?.parties2_id,
      })),
      content: parties2?.content,
    };
    this.message = message;
  }
}
