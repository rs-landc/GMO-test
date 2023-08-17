import { Participant } from '@entities/participants';
import {
  NumberField,
  NumberFieldOptional,
  ObjectFieldOptional,
} from 'src/decorators/field.decorator';
import { StorageFile } from '@entities/storage_files';

export class UpdateParticipantParamsDTO {
  @NumberField({ int: true })
  id: number;
}
export class UpdateParticipantRequest {
  @NumberFieldOptional({ int: true, minimum: -2147483647, maximum: 2147483646 })
  status?: number;
  @NumberFieldOptional({ int: true })
  user_id?: number;
  @NumberFieldOptional({ int: true })
  party_id?: number;
}
export class UpdateParticipantRequestDTO {
  @ObjectFieldOptional(UpdateParticipantRequest)
  participants?: UpdateParticipantRequest;
}
export class UserUpdateParticipantResponse {
  id: number;
  created_at: Date;
  updated_at: Date;
  fullname: string;
  birthday: Date;
  email: string;
  password: string;
}
export class PartyUpdateParticipantResponse {
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
export class Parties2UpdateParticipantResponse {
  id: number;
  created_at: Date;
  updated_at: Date;
  participant_id: number;
}
export class UpdateParticipantResponse {
  id: number;
  created_at: Date;
  updated_at: Date;
  status: number;
  user_id: number;
  user: UserUpdateParticipantResponse;
  party_id: number;
  party: PartyUpdateParticipantResponse;
  parties2s: Parties2UpdateParticipantResponse[];
}
export class UpdateErrorObjectResponse {}

export class UpdateParticipantResponseDTO {
  participant: UpdateParticipantResponse;
  error_object: Object;

  constructor(participant: Participant, error_object?: Object) {
    this.participant = {
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
    };
    this.error_object = error_object;
  }
}
