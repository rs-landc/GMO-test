import { Admin } from '@entities/admins';
import { NumberField } from 'src/decorators/field.decorator';
import { StorageFile } from '@entities/storage_files';

export class ShowAdminParamsDTO {
  @NumberField({ int: true })
  id: number;
}
export class PartyShowAdminResponse {
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
export class ShowAdminResponse {
  id: number;
  created_at: Date;
  updated_at: Date;
  email: string;
  password: string;
  parties: PartyShowAdminResponse[];
}

export class ShowAdminResponseDTO {
  admin: ShowAdminResponse;

  constructor(admin: Admin) {
    this.admin = {
      ...admin,
      id: admin?.id,
      created_at: admin?.created_at,
      updated_at: admin?.updated_at,
      email: admin?.email,
      password: admin?.password,
      parties: admin?.parties?.map((party) => ({
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
      })),
    };
  }
}
