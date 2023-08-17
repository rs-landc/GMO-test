import { User } from '@entities/users';
import {
  StringFieldOptional,
  DateFieldOptional,
  ObjectFieldOptional,
  NumberFieldOptional,
} from 'src/decorators/field.decorator';

export class FilterUserRequest {
  @StringFieldOptional({ maxLength: 255, minLength: 0 })
  fullname?: string;
  @DateFieldOptional({})
  birthday?: Date;
  @StringFieldOptional({ email: true })
  email?: string;
}
export class FilterUserRequestDTO {
  @ObjectFieldOptional(FilterUserRequest)
  users?: FilterUserRequest;
  @NumberFieldOptional({ int: true })
  pagination_page?: number;
  @NumberFieldOptional({ int: true })
  pagination_limit?: number;
}
export class ParticipantFilterUserResponse {
  id: number;
  created_at: Date;
  updated_at: Date;
  status: number;
  user_id: number;
  party_id: number;
}
export class FilterUserResponse {
  id: number;
  created_at: Date;
  updated_at: Date;
  fullname: string;
  birthday: Date;
  email: string;
  password: string;
  participants: ParticipantFilterUserResponse[];
}

export class FilterUserResponseDTO {
  users: FilterUserResponse[];
  total_pages?: number;
  total_count: number;

  constructor(users: User[], total_count: number, total_pages?: number) {
    this.users = users.map((user) => ({
      ...user,
      id: user?.id,
      created_at: user?.created_at,
      updated_at: user?.updated_at,
      fullname: user?.fullname,
      birthday: user?.birthday,
      email: user?.email,
      password: user?.password,
      participants: user?.participants?.map((participant) => ({
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
