import { Admin } from '@entities/admins';
import {
  StringFieldOptional,
  ObjectFieldOptional,
  NumberFieldOptional,
} from 'src/decorators/field.decorator';
import { StorageFile } from '@entities/storage_files';

export class FilterAdminRequest {
  @StringFieldOptional({ email: true })
  email?: string;
}
export class FilterAdminRequestDTO {
  @ObjectFieldOptional(FilterAdminRequest)
  admins?: FilterAdminRequest;
  @NumberFieldOptional({ int: true })
  pagination_page?: number;
  @NumberFieldOptional({ int: true })
  pagination_limit?: number;
}
export class PartyFilterAdminResponse {
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
export class FilterAdminResponse {
  id: number;
  created_at: Date;
  updated_at: Date;
  email: string;
  password: string;
  parties: PartyFilterAdminResponse[];
}

export class FilterAdminResponseDTO {
  admins: FilterAdminResponse[];
  total_pages?: number;
  total_count: number;

  constructor(admins: Admin[], total_count: number, total_pages?: number) {
    this.admins = admins.map((admin) => ({
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
    }));
    this.total_pages = total_pages;
    this.total_count = total_count;
  }
}
