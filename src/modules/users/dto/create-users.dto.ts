import { User } from '@entities/users';
import {
  StringFieldOptional,
  DateFieldOptional,
  ObjectField,
} from 'src/decorators/field.decorator';

export class CreateUserRequest {
  @StringFieldOptional({ maxLength: 255, minLength: 0 })
  fullname?: string;
  @DateFieldOptional({})
  birthday?: Date;
  @StringFieldOptional({ email: true })
  email?: string;
}
export class CreateUserRequestDTO {
  @ObjectField(CreateUserRequest)
  users: CreateUserRequest;
}
export class ParticipantCreateUserResponse {
  id: number;
  created_at: Date;
  updated_at: Date;
  status: number;
  user_id: number;
  party_id: number;
}
export class CreateUserResponse {
  id: number;
  created_at: Date;
  updated_at: Date;
  fullname: string;
  birthday: Date;
  email: string;
  password: string;
  participants: ParticipantCreateUserResponse[];
}
export class CreateErrorObjectResponse {}

export class CreateUserResponseDTO {
  user: CreateUserResponse;
  error_object: Object;

  constructor(user: User, error_object?: Object) {
    this.user = {
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
    };
    this.error_object = error_object;
  }
}
