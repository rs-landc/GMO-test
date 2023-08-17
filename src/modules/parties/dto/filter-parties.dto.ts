import { Party } from '@entities/parties';
import {
  StringFieldOptional,
  DateFieldOptional,
  NumberFieldOptional,
  ObjectFieldOptional,
} from 'src/decorators/field.decorator';
import { StorageFile } from '@entities/storage_files';

export class FilterPartyRequest {
  @StringFieldOptional({ maxLength: 255, minLength: 0 })
  name?: string;
  @StringFieldOptional({ maxLength: 255, minLength: 0 })
  address?: string;
  @DateFieldOptional({ inFuture: true })
  time_takes_place?: Date;
  @NumberFieldOptional({ int: true, minimum: -2147483647, maximum: 2147483646 })
  number_of_registrations?: number;
  @NumberFieldOptional({ int: true, minimum: -2147483647, maximum: 2147483646 })
  registered_quantity?: number;
  @NumberFieldOptional({ maxLength: 255, minLength: 0 })
  status_party?: number;
  @NumberFieldOptional({ int: true, minimum: -2147483647, maximum: 2147483646 })
  min_age?: number;
  @NumberFieldOptional({ int: true })
  admin_id?: number;
}
export class FilterPartyRequestDTO {
  @ObjectFieldOptional(FilterPartyRequest)
  parties?: FilterPartyRequest;
  @NumberFieldOptional({ int: true })
  pagination_page?: number;
  @NumberFieldOptional({ int: true })
  pagination_limit?: number;
}
export class AdminFilterPartyResponse {
  id: number;
  created_at: Date;
  updated_at: Date;
  email: string;
  password: string;
}
export class ParticipantFilterPartyResponse {
  id: number;
  created_at: Date;
  updated_at: Date;
  status: number;
  user_id: number;
  party_id: number;
}
export class FilterPartyResponse {
  id: number;
  created_at: Date;
  updated_at: Date;
  name: string;
  address: string;
  time_takes_place: Date;
  number_of_registrations: number;
  registered_quantity: number;
  status_party: string;
  banner: StorageFile;
  min_age: number;
  admin_id: number;
  admin: AdminFilterPartyResponse;
  participants: ParticipantFilterPartyResponse[];
}

export class FilterPartyResponseDTO {
  parties: FilterPartyResponse[];
  total_pages?: number;
  total_count: number;

  constructor(parties: Party[], total_count: number, total_pages?: number) {
    this.parties = parties.map((party) => ({
      ...party,
      id: party?.id,
      created_at: party?.created_at,
      updated_at: party?.updated_at,
      name: party?.name,
      address: party?.address,
      time_takes_place: party?.time_takes_place,
      number_of_registrations: party?.number_of_registrations,
      registered_quantity: party?.registered_quantity,
      status_party: party?.status_party,
      banner: party?.banner,
      min_age: party?.min_age,
      admin_id: party?.admin_id,
      admin: {
        id: party?.admin?.id,
        created_at: party?.admin?.created_at,
        updated_at: party?.admin?.updated_at,
        email: party?.admin?.email,
        password: party?.admin?.password,
      },
      participants: party?.participants?.map((participant) => ({
        ...participant,
        id: participant?.id,
        created_at: participant?.created_at,
        updated_at: participant?.updated_at,
        status: participant?.status,
        user_id: participant?.user_id,
        party_id: participant?.party_id,
      })),
    }));
    this.total_pages = total_pages;
    this.total_count = total_count;
  }
}
