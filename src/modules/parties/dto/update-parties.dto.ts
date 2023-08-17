import { Party } from '@entities/parties';
import {
  NumberField,
  StringFieldOptional,
  DateFieldOptional,
  NumberFieldOptional,
  FileFieldOptional,
  ObjectFieldOptional,
} from 'src/decorators/field.decorator';
import { FileSystemStoredFile } from 'nestjs-form-data';
import { StorageFile } from '@entities/storage_files';

export class UpdatePartyParamsDTO {
  @NumberField({ int: true })
  id: number;
}
export class UpdatePartyRequest {
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
  @FileFieldOptional({ fileTypes: ['image'] })
  banner?: FileSystemStoredFile;
  @NumberFieldOptional({ int: true, minimum: -2147483647, maximum: 2147483646 })
  min_age?: number;
  @NumberFieldOptional({ int: true })
  admin_id?: number;
}
export class UpdatePartyRequestDTO {
  @ObjectFieldOptional(UpdatePartyRequest)
  parties?: UpdatePartyRequest;
}
export class AdminUpdatePartyResponse {
  id: number;
  created_at: Date;
  updated_at: Date;
  email: string;
  password: string;
}
export class ParticipantUpdatePartyResponse {
  id: number;
  created_at: Date;
  updated_at: Date;
  status: number;
  user_id: number;
  party_id: number;
}
export class UpdatePartyResponse {
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
  admin: AdminUpdatePartyResponse;
  participants: ParticipantUpdatePartyResponse[];
}
export class UpdateErrorObjectResponse {}

export class UpdatePartyResponseDTO {
  party: UpdatePartyResponse;
  error_object: Object;

  constructor(party: Party, error_object?: Object) {
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
    this.error_object = error_object;
  }
}
