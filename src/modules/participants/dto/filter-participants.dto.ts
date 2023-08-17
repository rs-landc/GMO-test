import { Participant } from '@entities/participants';
import { NumberFieldOptional, ObjectFieldOptional } from 'src/decorators/field.decorator';
import { StorageFile } from '@entities/storage_files';

export class FilterParticipantRequest {
  @NumberFieldOptional({ int: true, minimum: -2147483647, maximum: 2147483646 })
  status?: number;
  @NumberFieldOptional({ int: true })
  user_id?: number;
  @NumberFieldOptional({ int: true })
  party_id?: number;
}
export class FilterParticipantRequestDTO {
  @ObjectFieldOptional(FilterParticipantRequest)
  participants?: FilterParticipantRequest;
  @NumberFieldOptional({ int: true })
  pagination_page?: number;
  @NumberFieldOptional({ int: true })
  pagination_limit?: number;
}
export class UserFilterParticipantResponse {
  id: number;
  created_at: Date;
  updated_at: Date;
  fullname: string;
  birthday: Date;
  email: string;
  password: string;
}
export class PartyFilterParticipantResponse {
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
}
export class Parties2FilterParticipantResponse {
  id: number;
  created_at: Date;
  updated_at: Date;
  participant_id: number;
}
export class FilterParticipantResponse {
  id: number;
  created_at: Date;
  updated_at: Date;
  status: number;
  user_id: number;
  user: UserFilterParticipantResponse;
  party_id: number;
  party: PartyFilterParticipantResponse;
  parties2s: Parties2FilterParticipantResponse[];
}

export class FilterParticipantResponseDTO {
  participants: FilterParticipantResponse[];
  total_pages?: number;
  total_count: number;

  constructor(participants: Participant[], total_count: number, total_pages?: number) {
    this.participants = participants.map((participant) => ({
      ...participant,
      id: participant?.id,
      created_at: participant?.created_at,
      updated_at: participant?.updated_at,
      status: participant?.status,
      user_id: participant?.user_id,
      user: {
        id: participant?.user?.id,
        created_at: participant?.user?.created_at,
        updated_at: participant?.user?.updated_at,
        fullname: participant?.user?.fullname,
        birthday: participant?.user?.birthday,
        email: participant?.user?.email,
        password: participant?.user?.password,
      },
      party_id: participant?.party_id,
      party: {
        id: participant?.party?.id,
        created_at: participant?.party?.created_at,
        updated_at: participant?.party?.updated_at,
        name: participant?.party?.name,
        address: participant?.party?.address,
        time_takes_place: participant?.party?.time_takes_place,
        number_of_registrations: participant?.party?.number_of_registrations,
        registered_quantity: participant?.party?.registered_quantity,
        status_party: participant?.party?.status_party,
        banner: participant?.party?.banner,
        min_age: participant?.party?.min_age,
        admin_id: participant?.party?.admin_id,
      },
      parties2s: participant?.parties2s?.map((parties2) => ({
        ...parties2,
        id: parties2?.id,
        created_at: parties2?.created_at,
        updated_at: parties2?.updated_at,
        participant_id: parties2?.participant_id,
      })),
    }));
    this.total_pages = total_pages;
    this.total_count = total_count;
  }
}
