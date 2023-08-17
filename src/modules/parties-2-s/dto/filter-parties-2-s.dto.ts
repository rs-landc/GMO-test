import { Parties2 } from '@entities/parties2s';
import {
  NumberFieldOptional,
  StringFieldOptional,
  ObjectFieldOptional,
} from 'src/decorators/field.decorator';

export class FilterParties2Request {
  @NumberFieldOptional({ int: true })
  participant_id?: number;
  @StringFieldOptional({ maxLength: 65535, minLength: 0 })
  content?: string;
}
export class FilterParties2RequestDTO {
  @NumberFieldOptional({ int: true })
  pagination_page?: number;
  @NumberFieldOptional({ int: true })
  pagination_limit?: number;
  @ObjectFieldOptional(FilterParties2Request)
  parties2s?: FilterParties2Request;
}
export class ParticipantFilterParties2Response {
  id: number;
  created_at: Date;
  updated_at: Date;
  status: number;
  user_id: number;
  party_id: number;
}
export class Parties3FilterParties2Response {
  id: number;
  created_at: Date;
  updated_at: Date;
  parties2_id: number;
}
export class FilterParties2Response {
  id: number;
  created_at: Date;
  updated_at: Date;
  participant: ParticipantFilterParties2Response;
  participant_id: number;
  parties3s: Parties3FilterParties2Response[];
  content: string;
}
export class FilterMessageResponse {}

export class FilterParties2ResponseDTO {
  parties2s: FilterParties2Response[];
  total_pages?: number;
  message?: Object;
  total_count: number;

  constructor(parties2s: Parties2[], total_count: number, total_pages?: number, message?: Object) {
    this.parties2s = parties2s.map((parties2) => ({
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
    }));
    this.total_pages = total_pages;
    this.message = message;
    this.total_count = total_count;
  }
}
