import { Party } from '@entities/parties';
import { NumberField } from 'src/decorators/field.decorator';
import { StorageFile } from '@entities/storage_files';

export class ShowPartyParamsDTO {
  @NumberField({ int: true })
  id: number;
}
export class AdminShowPartyResponse {
  id: number;
  created_at: Date;
  updated_at: Date;
  email: string;
  password: string;
}
export class ParticipantShowPartyResponse {
  id: number;
  created_at: Date;
  updated_at: Date;
  status: number;
  user_id: number;
  party_id: number;
}
export class ShowPartyResponse {
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
  admin: AdminShowPartyResponse;
  participants: ParticipantShowPartyResponse[];
}

export class ShowPartyResponseDTO {
  party: ShowPartyResponse;

  constructor(party: Party) {
    this.party = {
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
    };
  }
}
