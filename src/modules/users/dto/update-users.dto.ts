import { User } from '@entities/users';
import {
  NumberField,
  StringFieldOptional,
  DateFieldOptional,
  ObjectFieldOptional,
} from 'src/decorators/field.decorator';

export class UpdateUserParamsDTO {
  @NumberField({ int: true })
  id: number;
}
export class UpdateUserRequest {
  @StringFieldOptional({ maxLength: 255, minLength: 0 })
  fullname?: string;
  @DateFieldOptional({})
  birthday?: Date;
  @StringFieldOptional({ email: true })
  email?: string;
}
export class UpdateUserRequestDTO {
  @ObjectFieldOptional(UpdateUserRequest)
  users?: UpdateUserRequest;
}
export class ParticipantUpdateUserResponse {
  id: number;
  created_at: Date;
  updated_at: Date;
  status: number;
  user_id: number;
  party_id: number;
}
export class UpdateUserResponse {
  id: number;
  created_at: Date;
  updated_at: Date;
  fullname: string;
  birthday: Date;
  email: string;
  password: string;
  participants: ParticipantUpdateUserResponse[];
}
export class UpdateErrorObjectResponse {}

export class UpdateUserResponseDTO {
  user: UpdateUserResponse;
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
