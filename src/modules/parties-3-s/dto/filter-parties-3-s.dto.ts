import { Parties3 } from '@entities/parties3s';
import {
  NumberFieldOptional,
  StringFieldOptional,
  ObjectFieldOptional,
} from 'src/decorators/field.decorator';

export class FilterParties3Request {
  @NumberFieldOptional({ int: true })
  parties2_id?: number;
  @StringFieldOptional({ maxLength: 65535, minLength: 0 })
  content?: string;
}
export class FilterParties3RequestDTO {
  @NumberFieldOptional({ int: true })
  pagination_page?: number;
  @NumberFieldOptional({ int: true })
  pagination_limit?: number;
  @ObjectFieldOptional(FilterParties3Request)
  parties3s?: FilterParties3Request;
}
export class Parties2FilterParties3Response {
  id: number;
  created_at: Date;
  updated_at: Date;
  participant_id: number;
}
export class FilterParties3Response {
  id: number;
  created_at: Date;
  updated_at: Date;
  parties2: Parties2FilterParties3Response;
  parties2_id: number;
  content: string;
}
export class FilterMessageResponse {}

export class FilterParties3ResponseDTO {
  parties3s: FilterParties3Response[];
  total_pages?: number;
  message?: Object;
  total_count: number;

  constructor(parties3s: Parties3[], total_count: number, total_pages?: number, message?: Object) {
    this.parties3s = parties3s.map((parties3) => ({
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
    }));
    this.total_pages = total_pages;
    this.message = message;
    this.total_count = total_count;
  }
}
