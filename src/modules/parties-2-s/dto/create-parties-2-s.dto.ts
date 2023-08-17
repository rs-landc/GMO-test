import { Parties2 } from '@entities/parties2s';
import { NumberField, StringFieldOptional, ObjectField } from 'src/decorators/field.decorator';

export class CreateParties2Request {
  @NumberField({ int: true })
  participant_id: number;
  @StringFieldOptional({ maxLength: 65535, minLength: 0 })
  content?: string;
}
export class CreateParties2RequestDTO {
  @ObjectField(CreateParties2Request)
  parties2s: CreateParties2Request;
}
export class ParticipantCreateParties2Response {
  id: number;
  created_at: Date;
  updated_at: Date;
  status: number;
  user_id: number;
  party_id: number;
}
export class Parties3CreateParties2Response {
  id: number;
  created_at: Date;
  updated_at: Date;
  parties2_id: number;
}
export class CreateParties2Response {
  id: number;
  created_at: Date;
  updated_at: Date;
  participant: ParticipantCreateParties2Response;
  participant_id: number;
  parties3s: Parties3CreateParties2Response[];
  content: string;
}
export class CreateErrorObjectResponse {}

export class CreateParties2ResponseDTO {
  parties2: CreateParties2Response;
  error_object: Object;

  constructor(parties2: Parties2, error_object?: Object) {
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
    this.error_object = error_object;
  }
}
