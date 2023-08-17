import { Participant } from '@entities/participants';
import { NumberField } from 'src/decorators/field.decorator';
import { StorageFile } from '@entities/storage_files';

export class ShowParticipantParamsDTO {
  @NumberField({ int: true })
  id: number;
}
export class UserShowParticipantResponse {
  id: number;
  created_at: Date;
  updated_at: Date;
  fullname: string;
  birthday: Date;
  email: string;
  password: string;
}
export class PartyShowParticipantResponse {
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
export class Parties2ShowParticipantResponse {
  id: number;
  created_at: Date;
  updated_at: Date;
  participant_id: number;
}
export class ShowParticipantResponse {
  id: number;
  created_at: Date;
  updated_at: Date;
  status: number;
  user_id: number;
  user: UserShowParticipantResponse;
  party_id: number;
  party: PartyShowParticipantResponse;
  parties2s: Parties2ShowParticipantResponse[];
}

export class ShowParticipantResponseDTO {
  participant: ShowParticipantResponse;

  constructor(participant: Participant) {
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
  }
}
